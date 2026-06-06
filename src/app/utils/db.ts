import { supabase } from './supabase';

export interface ApplicationFile {
  name: string;
  type: string;
  size: number;
  data: Blob;
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

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
  });
}

function createMockBlob(content: string, type: string = 'text/plain'): Blob {
  return new Blob([content], { type });
}

async function seedMockData(db: IDBDatabase): Promise<void> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const countRequest = store.count();

    countRequest.onsuccess = () => {
      if (countRequest.result > 0) {
        resolve();
        return;
      }

      const now = new Date();
      const mockApplications: Application[] = [
        // Using other services to seed IndexedDB. study-europe goes to Supabase.
        {
          id: 'app-2',
          name: 'Kwame Asante',
          email: 'kwame.asante@example.com',
          phone: '+233241234567',
          serviceSlug: 'study-uk',
          serviceTitle: 'Study in UK',
          budget: '10k-20k',
          country: 'United Kingdom',
          status: 'contacted',
          createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          adminNotes: 'Applying for MSc Finance at London School of Economics. WhatsApp discussion completed. Preparing UCAS statement.',
          files: [
            { name: 'kwame_bsc_transcript.pdf', type: 'application/pdf', size: 1024 * 512, data: createMockBlob('Mock BSC Transcript Kwame', 'application/pdf') },
            { name: 'ielts_academic_7.5.pdf', type: 'application/pdf', size: 1024 * 320, data: createMockBlob('Mock IELTS Result: 7.5 bands', 'application/pdf') }
          ]
        },
        {
          id: 'app-3',
          name: 'Maria Oliveira',
          email: 'maria.oliveira@example.com',
          phone: '+5511999998888',
          serviceSlug: 'citizen-brazil',
          serviceTitle: 'Citizen by Birth Brazil',
          budget: null,
          country: null,
          status: 'pending',
          createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          adminNotes: 'Claiming citizenship through paternal grandmother. Needs assistance obtaining certificate copies from Brazil.',
          files: [
            { name: 'birth_cert_maria.jpg', type: 'image/jpeg', size: 1024 * 920, data: createMockBlob('Mock JPG birth certificate image data', 'image/jpeg') },
            { name: 'father_identity.pdf', type: 'application/pdf', size: 1024 * 400, data: createMockBlob('Mock PDF parent identity document', 'application/pdf') }
          ]
        }
      ];

      let completed = 0;
      let errored = false;

      mockApplications.forEach((app) => {
        const addRequest = store.add(app);
        addRequest.onsuccess = () => {
          completed++;
          if (completed === mockApplications.length && !errored) resolve();
        };
        addRequest.onerror = () => {
          errored = true;
          reject(addRequest.error);
        };
      });
    };
    countRequest.onerror = () => reject(countRequest.error);
  });
}

export async function getApplications(): Promise<Application[]> {
  const db = await openDB();
  await seedMockData(db);

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
    supabaseApps = supabaseData.map((row: any) => ({
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
      files: [], // Files not implemented for Supabase yet
      adminNotes: row.admin_notes || undefined,
    }));
  } else if (error) {
    console.error('Error fetching from Supabase:', error);
  }

  // 3. Merge and Sort
  const allApps = [...localApps, ...supabaseApps];
  allApps.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  
  return allApps;
}

export async function addApplication(application: Omit<Application, 'id' | 'createdAt' | 'status'>): Promise<Application> {
  // Route to Supabase if it's the 'study-europe' service
  if (application.serviceSlug === 'study-europe') {
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
      })
      .select()
      .single();

    if (error) {
      console.error('Failed to save to Supabase:', error);
      throw error;
    }

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
      files: []
    };
  }

  // Local fallback for other services
  const db = await openDB();
  const newApp: Application = {
    ...application,
    id: `app-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
    status: 'pending'
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
  // Update in Supabase if it's a Supabase UUID (or by service slug)
  if (app.serviceSlug === 'study-europe') {
    const { error } = await supabase
      .from('applications')
      .update({
        name: app.name,
        email: app.email,
        phone: app.phone,
        service_slug: app.serviceSlug,
        service_title: app.serviceTitle,
        budget: app.budget,
        country: app.country,
        status: app.status,
        admin_notes: app.adminNotes,
      })
      .eq('id', app.id);
      
    if (error) throw error;
    return;
  }

  // Update locally
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put(app);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function deleteApplication(id: string, serviceSlug?: string): Promise<void> {
  // It's best to detect Supabase by checking if ID does NOT start with 'app-'
  const isSupabase = !id.startsWith('app-');
  
  if (isSupabase || serviceSlug === 'study-europe') {
    const { error } = await supabase.from('applications').delete().eq('id', id);
    if (error) throw error;
    return;
  }

  // Delete locally
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
  // For safety, we only clear local IndexedDB applications. 
  // We don't wipe out the actual Supabase database when using the dashboard.
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.clear();

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}
