import { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useLocation } from 'react-router';
import { ScrollingBanner } from './components/ScrollingBanner';
import {
  GraduationCap,
  Globe,
  Shield,
  DollarSign,
  Bus,
  MapPin,
  Palmtree,
  Users,
  BookOpen,
  Languages,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from 'lucide-react';

const servicesList = [
  // Education & Visa
  { slug: 'study-europe', label: 'Study in Europe', icon: GraduationCap, desc: 'European university placements' },
  { slug: 'study-uk', label: 'Study in UK', icon: Globe, desc: 'UK university admissions' },
  { slug: 'study-canada', label: 'Study in Canada', icon: GraduationCap, desc: 'Canadian university placements' },
  { slug: 'citizen-brazil', label: 'Citizen by Birth Brazil', icon: Shield, desc: 'Brazilian citizenship services' },
  { slug: 'proof-of-funds', label: 'Proof of Funds', icon: DollarSign, desc: 'Financial documentation' },
  { slug: 'school-excursions', label: 'Excursions & Tourism', icon: Bus, desc: 'Educational school tours' },
  // Travel
  { slug: 'visit-europe', label: 'Visit Europe', icon: MapPin, desc: 'European travel packages' },
  { slug: 'visit-uk', label: 'Visit UK', icon: Globe, desc: 'UK travel packages' },
  { slug: 'visit-canada', label: 'Visit Canada', icon: MapPin, desc: 'Canada travel packages' },
  { slug: 'visit-china', label: 'Visit China', icon: Globe, desc: 'China travel packages' },
  { slug: 'visit-australia', label: 'Visit Australia', icon: Globe, desc: 'Australia travel packages' },
  { slug: 'visit-kenya', label: 'Visit Kenya', icon: Palmtree, desc: 'Kenya safari packages' },
  { slug: 'visit-zanzibar', label: 'Visit Zanzibar', icon: Palmtree, desc: 'Zanzibar island getaways' },
  { slug: 'group-trip-kigali', label: 'Group Trip Kigali', icon: Users, desc: 'Rwanda group adventures' },
  // Language & Test Prep
  { slug: 'ielts', label: 'IELTS Preparation', icon: BookOpen, desc: 'IELTS band score coaching' },
  { slug: 'celpip-tutorial', label: 'CELPIP Tutorial', icon: BookOpen, desc: 'CELPIP exam coaching' },
  { slug: 'french-language', label: 'French Language', icon: Languages, desc: 'French courses (A1–C2)' },
  { slug: 'chinese-language', label: 'Chinese (Mandarin)', icon: Languages, desc: 'Mandarin courses (HSK 1–6)' },
  { slug: 'pre-tutorial', label: 'Pre Tutorial', icon: BookOpen, desc: 'Pre-departure academic prep' },
  // Insurance
  { slug: 'travel-insurance', label: 'Travel Insurance', icon: Shield, desc: 'Comprehensive travel cover' },
];

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function Root() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsServicesOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsServicesOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setIsServicesOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />

      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
              <div className="w-9 h-9 lg:w-10 lg:h-10 bg-[#2d4a9e] rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <GraduationCap className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <div>
                <div className="text-base lg:text-lg font-bold text-foreground leading-none">Boss Academy</div>
                <div className="text-[10px] lg:text-xs text-muted-foreground hidden sm:block">Travel & Learning Agency</div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              <Link
                to="/"
                className={`font-medium transition-colors text-sm ${
                  location.pathname === '/' ? 'text-[#2d4a9e]' : 'text-foreground/75 hover:text-[#2d4a9e]'
                }`}
              >
                Home
              </Link>

              {/* OUR SERVICES Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="flex items-center gap-1.5 text-foreground/75 hover:text-[#2d4a9e] font-medium transition-colors text-sm"
                >
                  <span className="text-xs font-bold tracking-widest uppercase">Our Services</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {isServicesOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[700px] bg-white rounded-2xl shadow-2xl border border-border/60 p-5 z-50">
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3 px-1">
                      All 20 Services
                    </div>
                    <div className="grid grid-cols-2 gap-1 max-h-[360px] overflow-y-auto pr-1 scrollbar-thin">
                      {servicesList.map((service) => (
                        <Link
                          key={service.slug}
                          to={`/services/${service.slug}`}
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-secondary transition-colors group"
                          onClick={() => setIsServicesOpen(false)}
                        >
                          <div className="w-8 h-8 bg-[#2d4a9e]/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#2d4a9e]/20 transition-colors">
                            <service.icon className="w-4 h-4 text-[#2d4a9e]" />
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold text-foreground text-sm leading-tight">{service.label}</div>
                            <div className="text-xs text-muted-foreground mt-0.5 truncate">{service.desc}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Need guidance? Get a free consultation.</span>
                      <Link
                        to="/"
                        onClick={() => setIsServicesOpen(false)}
                        className="text-xs text-[#2d4a9e] font-semibold flex items-center gap-1 hover:gap-1.5 transition-all"
                      >
                        View All <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <a
                href="#about"
                className="text-foreground/75 hover:text-[#2d4a9e] font-medium transition-colors text-sm"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-foreground/75 hover:text-[#2d4a9e] font-medium transition-colors text-sm"
              >
                Contact
              </a>
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:+1234567890"
                className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden xl:block">+123 456 7890</span>
              </a>
              <button className="bg-[#2d4a9e] text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#2d4a9e]/90 transition-all shadow-md hover:shadow-lg">
                Book Consultation
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileOpen && (
          <div className="lg:hidden border-t border-border bg-white max-h-[80vh] overflow-y-auto">
            <div className="max-w-7xl mx-auto px-4 py-3 space-y-0.5">
              <Link
                to="/"
                className="block px-4 py-3 rounded-lg hover:bg-secondary font-medium text-foreground transition-colors text-sm"
              >
                Home
              </Link>

              <div>
                <button
                  onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-secondary font-medium text-foreground transition-colors text-sm"
                >
                  <span className="font-bold tracking-wide uppercase text-xs">Our Services</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${isMobileServicesOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {isMobileServicesOpen && (
                  <div className="ml-3 mt-1 space-y-0.5 pb-1">
                    {servicesList.map((service) => (
                      <Link
                        key={service.slug}
                        to={`/services/${service.slug}`}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-secondary transition-colors"
                      >
                        <service.icon className="w-4 h-4 text-[#2d4a9e] flex-shrink-0" />
                        <span className="text-sm text-foreground font-medium">{service.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <a
                href="#about"
                className="block px-4 py-3 rounded-lg hover:bg-secondary font-medium text-foreground transition-colors text-sm"
              >
                About
              </a>
              <a
                href="#contact"
                className="block px-4 py-3 rounded-lg hover:bg-secondary font-medium text-foreground transition-colors text-sm"
              >
                Contact
              </a>

              <div className="pt-3 pb-2 px-1">
                <button className="w-full bg-[#2d4a9e] text-white px-5 py-3 rounded-lg font-semibold hover:bg-[#2d4a9e]/90 transition-all text-sm">
                  Book Free Consultation
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Scrolling University Banner */}
      <ScrollingBanner />

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#0f172a] text-white" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Company */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 bg-[#2d4a9e] rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-base font-bold">Boss Academy</div>
                  <div className="text-xs text-white/50">Travel & Learning Agency</div>
                </div>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-5">
                Transforming lives through education and travel. Your trusted partner for study abroad, citizenship, travel, and professional development.
              </p>
              <div className="flex gap-2">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#2d4a9e] transition-colors"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Study & Visa Services */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-widest mb-4 text-white/50">Study & Visa</h4>
              <ul className="space-y-2.5">
                {servicesList.slice(0, 6).map((s) => (
                  <li key={s.slug}>
                    <Link
                      to={`/services/${s.slug}`}
                      className="text-white/60 hover:text-white text-sm transition-colors hover:translate-x-0.5 inline-block"
                    >
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Travel Services */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-widest mb-4 text-white/50">Travel & Trips</h4>
              <ul className="space-y-2.5">
                {servicesList.slice(6, 12).map((s) => (
                  <li key={s.slug}>
                    <Link
                      to={`/services/${s.slug}`}
                      className="text-white/60 hover:text-white text-sm transition-colors hover:translate-x-0.5 inline-block"
                    >
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-widest mb-4 text-white/50">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#2d4a9e]" />
                  <span className="text-white/60 text-sm">+123 456 7890</span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#2d4a9e]" />
                  <span className="text-white/60 text-sm">info@bossacademy.com</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#2d4a9e]" />
                  <span className="text-white/60 text-sm">123 Academy Street, Education City</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-xs">© 2026 Boss Academy. All rights reserved.</p>
            <div className="flex gap-6 text-xs text-white/40">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
