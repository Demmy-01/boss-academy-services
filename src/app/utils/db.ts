import { supabase } from './supabase';

export interface ApplicationFile {
  name: string;
  type: string;
  size: number;
  // For IndexedDB local files
  data?: Blob;
  // For Supabase-stored files
  url?: string;
}

export interface Application {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceSlug: string;
  serviceTitle: string;
  budget: string | null;
  country: string | null;
  status: 'pending' | 'in-review' | 'contacted' | 'approved' | 'rejected';
  createdAt: string;
  files: ApplicationFile[];
  adminNotes?: string;
}

const DB_NAME = 'BossAcademyDB';
const DB_VERSION = 1;
const STORE_NAME = 'applications';
const SUPABASE_BUCKET = 'application-files';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
  });
}


export async function getApplications(): Promise<Application[]> {
  const db = await openDB();

  // 1. Get local IndexedDB applications
  const localApps: Application[] = await new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result as Application[]);
    request.onerror = () => reject(request.error);
  });

  // 2. Get Supabase applications
  const { data: supabaseData, error } = await supabase
    .from('applications')
    .select('*');

  let supabaseApps: Application[] = [];
  if (!error && supabaseData) {
    supabaseApps = supabaseData.map((row: any) => {
      // Map files_data JSON array to ApplicationFile[]
      const filesData: ApplicationFile[] = Array.isArray(row.files_data)
        ? row.files_data.map((f: any) => ({
            name: f.name,
            type: f.type || 'application/octet-stream',
            size: f.size || 0,
            url: f.url,
          }))
        : [];

      return {
        id: row.id,
        name: row.name,
        email: row.email,
        phone: row.phone,
        serviceSlug: row.service_slug,
        serviceTitle: row.service_title,
        budget: row.budget,
        country: row.country,
        status: row.status as Application['status'],
        createdAt: row.created_at,
        files: filesData,
        adminNotes: row.admin_notes || undefined,
      };
    });
  } else if (error) {
    console.error('Error fetching from Supabase:', error);
  }

  // 3. Merge and Sort by createdAt descending
  const allApps = [...localApps, ...supabaseApps];
  allApps.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return allApps;
}

export async function addApplication(
  application: Omit<Application, 'id' | 'createdAt' | 'status'>
): Promise<Application> {
  // Route to Supabase for the 'study-europe' service
  if (application.serviceSlug === 'study-europe') {
    // 1. Upload each file to Supabase Storage and collect their metadata
    const uploadedFiles: { name: string; type: string; size: number; url: string }[] = [];

    for (const file of application.files) {
      if (!file.data) continue; // Skip if no Blob data

      // Build a unique path: study-europe/<timestamp>-<filename>
      const filePath = `study-europe/${Date.now()}-${file.name.replace(/\s+/g, '_')}`;

      const { error: uploadError } = await supabase.storage
        .from(SUPABASE_BUCKET)
        .upload(filePath, file.data, {
          contentType: file.type,
          upsert: false,
        });

      if (uploadError) {
        console.error(`Failed to upload ${file.name}:`, uploadError);
        throw uploadError;
      }

      // Get the public URL
      const { data: urlData } = supabase.storage
        .from(SUPABASE_BUCKET)
        .getPublicUrl(filePath);

      uploadedFiles.push({
        name: file.name,
        type: file.type,
        size: file.size,
        url: urlData.publicUrl,
      });
    }

    // 2. Insert application row with file metadata as JSONB
    const { data, error } = await supabase
      .from('applications')
      .insert({
        name: application.name,
        email: application.email,
        phone: application.phone,
        service_slug: application.serviceSlug,
        service_title: application.serviceTitle,
        budget: application.budget,
        country: application.country,
        files_data: uploadedFiles,
      })
      .select()
      .single();

    if (error) {
      console.error('Failed to save to Supabase:', error);
      throw error;
    }

    const filesData: ApplicationFile[] = uploadedFiles.map(f => ({
      name: f.name,
      type: f.type,
      size: f.size,
      url: f.url,
    }));

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      serviceSlug: data.service_slug,
      serviceTitle: data.service_title,
      budget: data.budget,
      country: data.country,
      status: data.status,
      createdAt: data.created_at,
      adminNotes: data.admin_notes || undefined,
      files: filesData,
    };
  }

  // Local IndexedDB fallback for all other services
  const db = await openDB();
  const newApp: Application = {
    ...application,
    id: `app-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
    status: 'pending',
  };

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.add(newApp);

    request.onsuccess = () => resolve(newApp);
    request.onerror = () => reject(request.error);
  });
}

export async function updateApplication(app: Application): Promise<void> {
  // Detect Supabase rows (UUIDs don't start with 'app-')
  const isSupabase = !app.id.startsWith('app-');

  if (isSupabase) {
    const { error } = await supabase
      .from('applications')
      .update({
        status: app.status,
        admin_notes: app.adminNotes,
      })
      .eq('id', app.id);

    if (error) throw error;
    return;
  }

  // Update locally for IndexedDB rows
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put(app);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function deleteApplication(id: string): Promise<void> {
  const isSupabase = !id.startsWith('app-');

  if (isSupabase) {
    const { error } = await supabase.from('applications').delete().eq('id', id);
    if (error) throw error;
    return;
  }

  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(id);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function clearAllApplications(): Promise<void> {
  // Only clears local IndexedDB. Supabase data is preserved.
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.clear();

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}
