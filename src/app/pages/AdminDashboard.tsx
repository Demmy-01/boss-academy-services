import { useState, useEffect, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts';
import {
  Users,
  Clock,
  CheckCircle,
  TrendingUp,
  Search,
  Filter,
  FileText,
  Download,
  MessageSquare,
  Mail,
  Trash2,
  Lock,
  ChevronRight,
  LogOut,
  FolderOpen,
  Eye,
  Settings,
  Plus,
  Phone,
  X,
  RefreshCw,
  AlertCircle,
  FileSpreadsheet,
} from 'lucide-react';
import {
  getApplications,
  updateApplication,
  deleteApplication,
  clearAllApplications,
  Application,
  ApplicationFile,
} from '../utils/db';
import { toast, Toaster } from 'sonner';

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending Review', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  { value: 'in-review', label: 'In Review', color: '#3b82f6', bg: 'rgba(59,130,246,0.1)' },
  { value: 'contacted', label: 'Contacted', color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)' },
  { value: 'approved', label: 'Approved', color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
  { value: 'rejected', label: 'Rejected', color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
];

export default function AdminDashboard() {
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'applications' | 'settings'>('overview');

  // DB Data state
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Search & Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [serviceFilter, setServiceFilter] = useState<string>('all');

  // Detail panel inspector state
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  // Load saved passcode or default
  const [storedPasscode, setStoredPasscode] = useState(() => {
    return localStorage.getItem('boss_admin_passcode') || 'admin';
  });

  // Verify auth on mount
  useEffect(() => {
    const isAuth = sessionStorage.getItem('boss_admin_authenticated') === 'true';
    if (isAuth) {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch applications from DB
  const loadApplications = async () => {
    setIsLoading(true);
    try {
      const data = await getApplications();
      setApplications(data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load applications from database.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadApplications();
    }
  }, [isAuthenticated]);

  // Handle Login submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === storedPasscode) {
      setIsAuthenticated(true);
      sessionStorage.setItem('boss_admin_authenticated', 'true');
      toast.success('Successfully logged into dashboard.');
    } else {
      toast.error('Incorrect passcode. Please try again.');
      setPasscode('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('boss_admin_authenticated');
    toast.info('Logged out from dashboard.');
  };

  // Open or download uploaded file
  const handleDownloadFile = (file: ApplicationFile) => {
    try {
      if (file.url) {
        // Supabase-stored file: open the public URL in a new tab
        window.open(file.url, '_blank', 'noopener,noreferrer');
        toast.success(`Opening ${file.name}`);
      } else if (file.data) {
        // IndexedDB local Blob: trigger download
        const url = URL.createObjectURL(file.data);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast.success(`Downloading ${file.name}`);
      } else {
        toast.error('File data unavailable.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to access file.');
    }
  };

  // Update Status
  const handleStatusChange = async (newStatus: Application['status']) => {
    if (!selectedApp) return;
    setIsUpdatingStatus(true);
    try {
      const updated: Application = {
        ...selectedApp,
        status: newStatus,
        adminNotes: adminNotes,
      };
      await updateApplication(updated);
      setSelectedApp(updated);
      await loadApplications();
      toast.success(`Application status updated to "${newStatus}"`);
    } catch (err) {
      console.error(err);
      toast.error('Failed to update status.');
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  // Update Admin Notes
  const handleSaveNotes = async () => {
    if (!selectedApp) return;
    try {
      const updated: Application = {
        ...selectedApp,
        adminNotes: adminNotes,
      };
      await updateApplication(updated);
      setSelectedApp(updated);
      await loadApplications();
      toast.success('Internal notes saved successfully.');
    } catch (err) {
      console.error(err);
      toast.error('Failed to save notes.');
    }
  };

  // Delete Application
  const handleDeleteApp = async (id: string) => {
    if (!confirm('Are you sure you want to delete this application? This cannot be undone.')) return;
    try {
      await deleteApplication(id);
      setSelectedApp(null);
      await loadApplications();
      toast.success('Application deleted successfully.');
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete application.');
    }
  };

  // Clear Database
  const handleClearDatabase = async () => {
    if (!confirm('CAUTION: This will delete ALL applications in the database. Are you absolutely sure?')) return;
    try {
      await clearAllApplications();
      await loadApplications();
      toast.success('Database cleared successfully.');
    } catch (err) {
      console.error(err);
      toast.error('Failed to clear database.');
    }
  };

  // Update Passcode
  const [newPasscode, setNewPasscode] = useState('');
  const handleChangePasscode = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPasscode.trim().length < 4) {
      toast.error('Passcode must be at least 4 characters long.');
      return;
    }
    localStorage.setItem('boss_admin_passcode', newPasscode);
    setStoredPasscode(newPasscode);
    setNewPasscode('');
    toast.success('Admin passcode updated successfully.');
  };

  // List unique services for filters
  const uniqueServices = useMemo(() => {
    const services = new Set<string>();
    applications.forEach(app => services.add(app.serviceTitle));
    return Array.from(services);
  }, [applications]);

  // Filters application list
  const filteredApps = useMemo(() => {
    return applications.filter(app => {
      const matchesSearch =
        app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.phone.includes(searchTerm);

      const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
      const matchesService = serviceFilter === 'all' || app.serviceTitle === serviceFilter;

      return matchesSearch && matchesStatus && matchesService;
    });
  }, [applications, searchTerm, statusFilter, serviceFilter]);

  // Set notes textarea value when app selection changes
  useEffect(() => {
    if (selectedApp) {
      setAdminNotes(selectedApp.adminNotes || '');
    }
  }, [selectedApp]);

  // Statistics Calculation
  const stats = useMemo(() => {
    const total = applications.length;
    const pending = applications.filter(a => a.status === 'pending').length;
    const contacted = applications.filter(a => a.status === 'contacted' || a.status === 'in-review').length;
    const approved = applications.filter(a => a.status === 'approved').length;
    const rejected = applications.filter(a => a.status === 'rejected').length;

    const rate = total > 0 ? Math.round(((approved + contacted) / total) * 100) : 0;

    return { total, pending, contacted, approved, rejected, rate };
  }, [applications]);

  // Chart data formatting: applications by service type
  const chartDataByService = useMemo(() => {
    const counts: Record<string, number> = {};
    applications.forEach(app => {
      counts[app.serviceTitle] = (counts[app.serviceTitle] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [applications]);

  // Chart data formatting: applications over the last 7 days
  const chartDataByDate = useMemo(() => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const counts: Record<string, number> = {};

    // Initialize past 7 days
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
      const label = `${days[d.getDay()]} ${d.getDate()}/${d.getMonth() + 1}`;
      counts[label] = 0;
    }

    applications.forEach(app => {
      const d = new Date(app.createdAt);
      const label = `${days[d.getDay()]} ${d.getDate()}/${d.getMonth() + 1}`;
      if (counts[label] !== undefined) {
        counts[label]++;
      }
    });

    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, [applications]);

  const COLORS = ['#e8400c', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4', '#ec4899'];

  /* ──────────────────────────────────────────────────────────────────
     Renders
     ────────────────────────────────────────────────────────────────── */

  // 1. LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0D1117] px-4 font-sans relative overflow-hidden">
        {/* Glow textures */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#e8400c]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

        <div className="max-w-md w-full relative z-10">
          {/* Logo banner */}
          <div className="text-center mb-8">
            <h1
              className="text-white text-3xl font-extrabold tracking-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Boss Academy
            </h1>
            <p className="text-gray-400 text-xs uppercase tracking-widest mt-1">Management Console</p>
          </div>

          {/* Form Card */}
          <div
            className="bg-[#161B22]/90 backdrop-blur-xl border border-gray-800 p-8 rounded-xl shadow-2xl"
            style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}
          >
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[#e8400c]/10 flex items-center justify-center border border-[#e8400c]/25">
                <Lock className="w-5 h-5 text-[#e8400c]" />
              </div>
            </div>

            <h2 className="text-white text-center text-xl font-bold mb-2">Security Authorization</h2>
            <p className="text-center text-gray-400 text-sm mb-6 leading-relaxed">
              Please enter the administrator passcode to access the client dashboard.
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={passcode}
                  onChange={e => setPasscode(e.target.value)}
                  placeholder="Enter Passcode (default is admin)"
                  className="w-full bg-[#0D1117] border border-gray-800 focus:border-[#e8400c] text-white text-center tracking-widest px-4 py-3 rounded-lg outline-none transition-all shadow-inner"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#e8400c] hover:bg-[#d03a0a] text-white font-bold py-3 rounded-lg transition-all shadow-lg hover:shadow-[#e8400c]/25 hover:translate-y-[-1px] cursor-pointer"
              >
                Enter Admin Portal
              </button>
            </form>
          </div>

          <div className="text-center mt-6 text-gray-500 text-xs">
            &copy; 2026 Boss Academy &bull; Authorized personnel only.
          </div>
        </div>
        <Toaster position="top-right" theme="dark" />
      </div>
    );
  }

  // 2. MAIN ADMIN BOARD
  return (
    <div className="min-h-screen bg-[#0D1117] text-[#FAF8F4] flex flex-col font-sans">
      <Toaster position="top-right" theme="dark" />

      {/* Top Navigation Bar */}
      <header className="bg-[#161B22] border-b border-gray-800 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#e8400c] flex items-center justify-center rounded-lg font-black text-white text-lg">
            B
          </div>
          <div>
            <h1
              className="text-white text-lg font-bold tracking-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Boss Academy
            </h1>
            <p className="text-gray-400 text-[10px] uppercase tracking-wider font-semibold">Admin Panel</p>
          </div>
        </div>

        {/* User state and actions */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-gray-800/40 rounded-full border border-gray-700/50">
            <div className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse" />
            <span className="text-xs text-gray-300 font-medium">Session Active</span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#ef4444] bg-gray-800/40 hover:bg-red-500/10 border border-gray-700/50 hover:border-red-500/25 px-3.5 py-1.5 rounded-lg transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </header>

      {/* Inner Workspace Container */}
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Left Navigation Sidebar */}
        <aside className="w-full lg:w-64 bg-[#161B22] border-b lg:border-b-0 lg:border-r border-gray-800 p-4 space-y-1 flex flex-row lg:flex-col justify-start overflow-x-auto lg:overflow-x-visible gap-2 lg:gap-1 flex-shrink-0">
          <button
            onClick={() => {
              setActiveTab('overview');
              setSelectedApp(null);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all cursor-pointer whitespace-nowrap lg:whitespace-normal ${
              activeTab === 'overview'
                ? 'bg-[#e8400c] text-white shadow-lg shadow-[#e8400c]/10'
                : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
            }`}
          >
            <TrendingUp className="w-4 h-4" /> Overview & Charts
          </button>
          <button
            onClick={() => {
              setActiveTab('applications');
              setSelectedApp(null);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all cursor-pointer whitespace-nowrap lg:whitespace-normal ${
              activeTab === 'applications'
                ? 'bg-[#e8400c] text-white shadow-lg shadow-[#e8400c]/10'
                : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
            }`}
          >
            <FolderOpen className="w-4 h-4" /> Client Applications
            {stats.pending > 0 && (
              <span className="ml-auto bg-amber-500 text-black text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                {stats.pending}
              </span>
            )}
          </button>
          <button
            onClick={() => {
              setActiveTab('settings');
              setSelectedApp(null);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all cursor-pointer whitespace-nowrap lg:whitespace-normal ${
              activeTab === 'settings'
                ? 'bg-[#e8400c] text-white shadow-lg shadow-[#e8400c]/10'
                : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4" /> Console Settings
          </button>
        </aside>

        {/* Content Canvas */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {isLoading ? (
            <div className="h-96 flex flex-col items-center justify-center text-gray-400 gap-3">
              <div className="w-8 h-8 border-4 border-gray-700 border-t-[#e8400c] rounded-full animate-spin" />
              <p className="text-sm font-medium">Accessing secure database...</p>
            </div>
          ) : (
            <>
              {/* ═══ TAB 1: OVERVIEW ═══ */}
              {activeTab === 'overview' && (
                <div className="space-y-8 animate-fadeUp">
                  {/* Title */}
                  <div>
                    <h2 className="text-2xl font-bold text-white">Console Overview</h2>
                    <p className="text-gray-400 text-sm">Key performance indicators and client statistics.</p>
                  </div>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* KPI 1 */}
                    <div className="bg-[#161B22] border border-gray-800 p-5 rounded-xl flex items-center gap-4">
                      <div className="p-3.5 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                        <Users className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <span className="block text-gray-400 text-xs font-semibold uppercase tracking-wider">
                          Applications
                        </span>
                        <span className="text-white text-2xl font-black">{stats.total}</span>
                      </div>
                    </div>

                    {/* KPI 2 */}
                    <div className="bg-[#161B22] border border-gray-800 p-5 rounded-xl flex items-center gap-4">
                      <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                        <Clock className="w-6 h-6 text-amber-400 animate-pulse" />
                      </div>
                      <div>
                        <span className="block text-gray-400 text-xs font-semibold uppercase tracking-wider">
                          Pending Review
                        </span>
                        <span className="text-white text-2xl font-black">{stats.pending}</span>
                      </div>
                    </div>

                    {/* KPI 3 */}
                    <div className="bg-[#161B22] border border-gray-800 p-5 rounded-xl flex items-center gap-4">
                      <div className="p-3.5 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                        <MessageSquare className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <span className="block text-gray-400 text-xs font-semibold uppercase tracking-wider">
                          In Progress
                        </span>
                        <span className="text-white text-2xl font-black">{stats.contacted}</span>
                      </div>
                    </div>

                    {/* KPI 4 */}
                    <div className="bg-[#161B22] border border-gray-800 p-5 rounded-xl flex items-center gap-4">
                      <div className="p-3.5 bg-[#e8400c]/10 border border-[#e8400c]/20 rounded-lg">
                        <CheckCircle className="w-6 h-6 text-[#e8400c]" />
                      </div>
                      <div>
                        <span className="block text-gray-400 text-xs font-semibold uppercase tracking-wider">
                          Success Rate
                        </span>
                        <span className="text-white text-2xl font-black">{stats.rate}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Charts Row */}
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {/* Chart 1: Volume Trend */}
                    <div className="bg-[#161B22] border border-gray-800 p-6 rounded-xl">
                      <h3 className="text-white font-bold text-md mb-6 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-[#e8400c]" /> 7-Day Application Volume
                      </h3>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={chartDataByDate} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                            <defs>
                              <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#e8400c" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#e8400c" stopOpacity={0.0} />
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#223047" vertical={false} />
                            <XAxis dataKey="name" stroke="#8592a3" fontSize={11} tickLine={false} />
                            <YAxis stroke="#8592a3" fontSize={11} tickLine={false} allowDecimals={false} />
                            <Tooltip
                              contentStyle={{ background: '#161B22', borderColor: '#334155', color: '#fff' }}
                            />
                            <Area
                              type="monotone"
                              dataKey="count"
                              stroke="#e8400c"
                              strokeWidth={3}
                              fillOpacity={1}
                              fill="url(#colorCount)"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Chart 2: Service Distribution */}
                    <div className="bg-[#161B22] border border-gray-800 p-6 rounded-xl">
                      <h3 className="text-white font-bold text-md mb-6 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-blue-400" /> Share by Service Type
                      </h3>
                      <div className="h-64 flex flex-col md:flex-row items-center justify-between gap-4">
                        {chartDataByService.length === 0 ? (
                          <div className="text-gray-500 text-sm w-full text-center">No applications to chart yet.</div>
                        ) : (
                          <>
                            <div className="w-full md:w-1/2 h-full">
                              <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                  <Pie
                                    data={chartDataByService}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={55}
                                    outerRadius={75}
                                    paddingAngle={3}
                                    dataKey="value"
                                  >
                                    {chartDataByService.map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                  </Pie>
                                  <Tooltip
                                    contentStyle={{
                                      background: '#161B22',
                                      borderColor: '#334155',
                                      color: '#fff',
                                    }}
                                  />
                                </PieChart>
                              </ResponsiveContainer>
                            </div>
                            {/* Legend */}
                            <div className="w-full md:w-1/2 space-y-2 max-h-56 overflow-y-auto pr-2">
                              {chartDataByService.map((entry, i) => (
                                <div key={entry.name} className="flex items-center justify-between text-xs">
                                  <div className="flex items-center gap-2">
                                    <div
                                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                                      style={{ backgroundColor: COLORS[i % COLORS.length] }}
                                    />
                                    <span className="text-gray-300 font-medium truncate max-w-[140px]">
                                      {entry.name}
                                    </span>
                                  </div>
                                  <span className="text-gray-400 font-bold">{entry.value}</span>
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ═══ TAB 2: APPLICATIONS TAB ═══ */}
              {activeTab === 'applications' && (
                <div className="space-y-6 animate-fadeUp">
                  {/* Title */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-white">Client Applications</h2>
                      <p className="text-gray-400 text-sm">Review, contact, and download documents uploaded by clients.</p>
                    </div>

                    {/* Quick refresh */}
                    <button
                      onClick={loadApplications}
                      className="flex items-center gap-1 text-xs font-semibold text-[#e8400c] bg-[#e8400c]/10 border border-[#e8400c]/20 px-3.5 py-2 rounded-lg hover:bg-[#e8400c]/20 transition-all cursor-pointer ml-auto sm:ml-0"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Refresh Database
                    </button>
                  </div>

                  {/* Filter and Search Bar */}
                  <div className="bg-[#161B22] border border-gray-800 p-4 rounded-xl flex flex-col md:flex-row items-center gap-3">
                    {/* Search */}
                    <div className="relative w-full md:flex-1">
                      <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search name, email, or phone..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full bg-[#0D1117] border border-gray-800 focus:border-[#e8400c] text-white text-sm pl-10 pr-4 py-2.5 rounded-lg outline-none transition-all placeholder:text-gray-600"
                      />
                    </div>

                    {/* Dropdown 1: Status */}
                    <div className="w-full md:w-48 flex items-center gap-2 bg-[#0D1117] border border-gray-800 px-3 py-2 rounded-lg">
                      <Filter className="w-3.5 h-3.5 text-gray-500" />
                      <select
                        value={statusFilter}
                        onChange={e => setStatusFilter(e.target.value)}
                        className="w-full bg-transparent text-sm text-gray-300 outline-none cursor-pointer"
                      >
                        <option value="all" className="bg-[#161B22]">All Statuses</option>
                        {STATUS_OPTIONS.map(opt => (
                          <option key={opt.value} value={opt.value} className="bg-[#161B22]">
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Dropdown 2: Service Title */}
                    <div className="w-full md:w-56 flex items-center gap-2 bg-[#0D1117] border border-gray-800 px-3 py-2 rounded-lg">
                      <Filter className="w-3.5 h-3.5 text-gray-500" />
                      <select
                        value={serviceFilter}
                        onChange={e => setServiceFilter(e.target.value)}
                        className="w-full bg-transparent text-sm text-gray-300 outline-none cursor-pointer"
                      >
                        <option value="all" className="bg-[#161B22]">All Services</option>
                        {uniqueServices.map(srv => (
                          <option key={srv} value={srv} className="bg-[#161B22]">
                            {srv}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Main Split Layout: Table vs Details Sidebar */}
                  <div className="flex flex-col xl:flex-row gap-6 items-start">
                    {/* List/Table container */}
                    <div className="flex-1 w-full bg-[#161B22] border border-gray-800 rounded-xl overflow-hidden shadow-xl">
                      {filteredApps.length === 0 ? (
                        <div className="py-20 flex flex-col items-center justify-center text-gray-500 gap-2">
                          <FolderOpen className="w-10 h-10 text-gray-600" />
                          <p className="text-sm font-semibold">No matching applications found</p>
                          <p className="text-xs">Adjust your search filters or check again.</p>
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="border-b border-gray-800 bg-[#161B22] text-xs font-bold text-gray-400 uppercase tracking-wider">
                                <th className="px-6 py-4">Client</th>
                                <th className="px-6 py-4">Service</th>
                                <th className="px-6 py-4 hidden sm:table-cell">Budget / Country</th>
                                <th className="px-6 py-4 hidden md:table-cell">Submitted</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800/60">
                              {filteredApps.map(app => {
                                const opt = STATUS_OPTIONS.find(o => o.value === app.status);
                                const isSelected = selectedApp?.id === app.id;

                                return (
                                  <tr
                                    key={app.id}
                                    onClick={() => setSelectedApp(app)}
                                    className={`hover:bg-gray-800/25 transition-colors cursor-pointer text-sm ${
                                      isSelected ? 'bg-[#e8400c]/5 border-l-2 border-l-[#e8400c]' : ''
                                    }`}
                                  >
                                    <td className="px-6 py-4.5">
                                      <span className="block text-white font-bold">{app.name}</span>
                                      <span className="block text-gray-500 text-xs mt-0.5">{app.email}</span>
                                    </td>
                                    <td className="px-6 py-4.5 font-medium text-gray-300">
                                      {app.serviceTitle}
                                    </td>
                                    <td className="px-6 py-4.5 hidden sm:table-cell text-gray-400">
                                      {app.budget && (
                                        <span className="inline-block px-2 py-0.5 bg-gray-800 text-gray-300 text-xs rounded-md mr-1.5 font-semibold">
                                          {app.budget}
                                        </span>
                                      )}
                                      {app.country ? (
                                        <span className="text-xs">{app.country}</span>
                                      ) : (
                                        <span className="text-gray-600 text-xs">—</span>
                                      )}
                                    </td>
                                    <td className="px-6 py-4.5 hidden md:table-cell text-gray-400 text-xs">
                                      {new Date(app.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4.5">
                                      <span
                                        className="inline-flex px-2.5 py-1 text-xs font-bold rounded-full border"
                                        style={{
                                          color: opt?.color,
                                          borderColor: `${opt?.color}22`,
                                          backgroundColor: opt?.bg,
                                        }}
                                      >
                                        {opt?.label}
                                      </span>
                                    </td>
                                    <td className="px-6 py-4.5 text-right" onClick={e => e.stopPropagation()}>
                                      <div className="flex items-center justify-end gap-1">
                                        <button
                                          onClick={() => setSelectedApp(app)}
                                          className="p-2 rounded-lg bg-gray-800/40 hover:bg-gray-800 text-gray-300 transition-colors border border-gray-700/30 cursor-pointer"
                                          title="View Details"
                                        >
                                          <Eye className="w-4 h-4" />
                                        </button>
                                        <button
                                          onClick={() => handleDeleteApp(app.id)}
                                          className="p-2 rounded-lg bg-gray-800/40 hover:bg-red-500/10 hover:text-red-400 text-gray-400 transition-colors border border-gray-700/30 cursor-pointer"
                                          title="Delete"
                                        >
                                          <Trash2 className="w-4 h-4" />
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>

                    {/* Detailed Inspector Drawer/Sidebar */}
                    {selectedApp && (
                      <div className="w-full xl:w-96 bg-[#161B22] border border-gray-800 rounded-xl p-6 shadow-xl space-y-6 animate-fadeUp flex-shrink-0">
                        {/* Drawer Header */}
                        <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                          <div>
                            <span className="text-[10px] bg-[#e8400c]/10 text-[#e8400c] border border-[#e8400c]/25 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                              Profile Inspector
                            </span>
                            <h3 className="text-white font-black text-lg mt-1.5">{selectedApp.name}</h3>
                          </div>
                          <button
                            onClick={() => setSelectedApp(null)}
                            className="p-1 rounded-md text-gray-500 hover:text-white hover:bg-gray-800 transition-all cursor-pointer"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-3">
                          <h4 className="text-gray-400 text-xs uppercase tracking-wider font-bold">Contact Info</h4>
                          <div className="bg-[#0D1117] p-3 rounded-lg border border-gray-800 space-y-2.5">
                            <div className="flex items-center gap-2.5 text-sm">
                              <Mail className="w-4 h-4 text-gray-500 flex-shrink-0" />
                              <a
                                href={`mailto:${selectedApp.email}`}
                                className="text-gray-200 hover:underline truncate"
                              >
                                {selectedApp.email}
                              </a>
                            </div>
                            <div className="flex items-center gap-2.5 text-sm">
                              <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
                              <span className="text-gray-200">{selectedApp.phone}</span>
                            </div>
                            <div className="flex items-center gap-2.5 text-xs text-gray-400 pt-1">
                              <Clock className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
                              <span>Applied: {new Date(selectedApp.createdAt).toLocaleString()}</span>
                            </div>
                          </div>
                        </div>

                        {/* Service & Details */}
                        <div className="space-y-3">
                          <h4 className="text-gray-400 text-xs uppercase tracking-wider font-bold">Application Details</h4>
                          <div className="bg-[#0D1117] p-3.5 rounded-lg border border-gray-800 space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-500">Service:</span>
                              <span className="text-white font-medium">{selectedApp.serviceTitle}</span>
                            </div>
                            {selectedApp.budget && (
                              <div className="flex justify-between">
                                <span className="text-gray-500">Budget:</span>
                                <span className="text-white font-medium">{selectedApp.budget}</span>
                              </div>
                            )}
                            {selectedApp.country && (
                              <div className="flex justify-between">
                                <span className="text-gray-500">Target Country:</span>
                                <span className="text-white font-medium">{selectedApp.country}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Uploaded Documents */}
                        <div className="space-y-3">
                          <h4 className="text-gray-400 text-xs uppercase tracking-wider font-bold">
                            Uploaded Files ({selectedApp.files.length})
                          </h4>
                          {selectedApp.files.length === 0 ? (
                            <div className="text-gray-500 text-xs italic">No documents uploaded.</div>
                          ) : (
                          <div className="space-y-2">
                              {selectedApp.files.map((file, i) => (
                                <div
                                  key={i}
                                  className="flex items-center justify-between p-2.5 bg-[#0D1117] hover:bg-gray-800/30 rounded-lg border border-gray-800 text-xs group transition-colors"
                                >
                                  <div className="flex items-center gap-2.5 min-w-0">
                                    <FileText className="w-4 h-4 text-[#e8400c] flex-shrink-0" />
                                    <div className="truncate">
                                      <p className="text-gray-200 font-semibold truncate group-hover:text-white transition-colors">
                                        {file.name}
                                      </p>
                                      <p className="text-gray-500 text-[10px]">
                                        {file.size >= 1024 * 1024
                                          ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
                                          : `${(file.size / 1024).toFixed(1)} KB`}
                                        {file.url && (
                                          <span className="ml-1.5 text-blue-400 font-semibold">• Supabase</span>
                                        )}
                                      </p>
                                    </div>
                                  </div>

                                  <button
                                    onClick={() => handleDownloadFile(file)}
                                    className="p-1.5 rounded-md bg-gray-800 text-gray-400 hover:text-white hover:bg-[#e8400c] transition-all cursor-pointer"
                                    title={file.url ? 'Open File' : 'Download File'}
                                  >
                                    {file.url ? <Eye className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Status Controller */}
                        <div className="space-y-3">
                          <h4 className="text-gray-400 text-xs uppercase tracking-wider font-bold">Manage Status</h4>
                          <div className="relative">
                            <select
                              value={selectedApp.status}
                              onChange={e => handleStatusChange(e.target.value as Application['status'])}
                              disabled={isUpdatingStatus}
                              className="w-full bg-[#0D1117] border border-gray-800 text-white text-sm p-3 rounded-lg outline-none cursor-pointer focus:border-[#e8400c] transition-all disabled:opacity-50"
                            >
                              {STATUS_OPTIONS.map(opt => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Internal notes */}
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <h4 className="text-gray-400 text-xs uppercase tracking-wider font-bold">Internal Notes</h4>
                            <button
                              onClick={handleSaveNotes}
                              className="text-[10px] font-bold text-[#e8400c] hover:underline cursor-pointer"
                            >
                              Save Notes
                            </button>
                          </div>
                          <textarea
                            value={adminNotes}
                            onChange={e => setAdminNotes(e.target.value)}
                            placeholder="Write internal staff comments/notes here... (e.g. details of phone interview, visa appointment schedules)"
                            className="w-full h-24 bg-[#0D1117] border border-gray-800 focus:border-[#e8400c] text-white text-xs p-3 rounded-lg outline-none transition-all resize-none placeholder:text-gray-700 leading-relaxed"
                          />
                        </div>

                        {/* Actions */}
                        <div className="grid grid-cols-2 gap-2 pt-2">
                          <a
                            href={`https://wa.me/${selectedApp.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1fb855] text-white text-xs font-bold py-2.5 rounded-lg transition-all text-center cursor-pointer"
                          >
                            <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                          </a>
                          <a
                            href={`mailto:${selectedApp.email}?subject=Application for ${selectedApp.serviceTitle}`}
                            className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white text-xs font-bold py-2.5 rounded-lg transition-all text-center cursor-pointer border border-gray-700"
                          >
                            <Mail className="w-3.5 h-3.5" /> Send Email
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ═══ TAB 3: SETTINGS TAB ═══ */}
              {activeTab === 'settings' && (
                <div className="space-y-8 max-w-2xl animate-fadeUp">
                  {/* Title */}
                  <div>
                    <h2 className="text-2xl font-bold text-white">Console Settings</h2>
                    <p className="text-gray-400 text-sm">Configure security and developer database settings.</p>
                  </div>

                  {/* Section 1: Security passcode */}
                  <div className="bg-[#161B22] border border-gray-800 p-6 rounded-xl space-y-4 shadow-md">
                    <h3 className="text-white font-bold text-md flex items-center gap-2">
                      <Lock className="w-4.5 h-4.5 text-[#e8400c]" /> Security Credentials
                    </h3>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      Change the passcode required to access this admin panel. The new passcode will be persisted in local storage.
                    </p>

                    <form onSubmit={handleChangePasscode} className="flex flex-col sm:flex-row gap-3 pt-2">
                      <input
                        type="password"
                        placeholder="Enter New Passcode"
                        value={newPasscode}
                        onChange={e => setNewPasscode(e.target.value)}
                        className="flex-1 bg-[#0D1117] border border-gray-800 focus:border-[#e8400c] text-white text-sm px-4 py-2.5 rounded-lg outline-none transition-all"
                        required
                      />
                      <button
                        type="submit"
                        className="bg-[#e8400c] hover:bg-[#d03a0a] text-white font-bold text-sm px-6 py-2.5 rounded-lg transition-all shadow-md cursor-pointer"
                      >
                        Update Passcode
                      </button>
                    </form>
                  </div>

                  {/* Section 2: Database Management */}
                  <div className="bg-[#161B22] border border-gray-800 p-6 rounded-xl space-y-4 shadow-md">
                    <h3 className="text-white font-bold text-md flex items-center gap-2">
                      <AlertCircle className="w-4.5 h-4.5 text-amber-500" /> Database Administration
                    </h3>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      Developer controls to reset or wipe the local application records from browser database (IndexedDB).
                    </p>

                    <div className="flex flex-wrap gap-3 pt-2">
                      <button
                        onClick={handleClearDatabase}
                        className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/25 border border-red-500/35 hover:border-red-500/50 text-red-400 font-bold text-xs px-5 py-3 rounded-lg transition-all cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" /> Clear All Applications
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
