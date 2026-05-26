import { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useLocation } from 'react-router';
import { ScrollingBanner } from './components/ScrollingBanner';
import logoImg from '../images/logo.png';
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
  Mail,
  Phone,
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
    // 'instant' bypasses any scroll-behavior:smooth CSS so the jump is immediate
    try {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    } catch {
      // Fallback for older browsers
      window.scrollTo(0, 0);
    }
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0; // For Safari
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
            <Link to="/" className="flex items-center flex-shrink-0">
              <img
                src={logoImg}
                alt="Boss Academy"
                className="h-10 lg:h-12 w-auto object-contain"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              <Link
                to="/"
                className={`font-medium transition-colors text-sm ${location.pathname === '/' ? 'text-[#e8400c]' : 'text-foreground/75 hover:text-[#e8400c]'
                  }`}
              >
                Home
              </Link>

              {/* OUR SERVICES Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="flex items-center gap-1.5 text-foreground/75 hover:text-[#e8400c] font-medium transition-colors text-sm"
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
                          <div className="w-8 h-8 bg-[#e8400c]/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#e8400c]/20 transition-colors">
                            <service.icon className="w-4 h-4 text-[#e8400c]" />
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
                        className="text-xs text-[#e8400c] font-semibold flex items-center gap-1 hover:gap-1.5 transition-all"
                      >
                        View All <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <a
                href="#about"
                className="text-foreground/75 hover:text-[#e8400c] font-medium transition-colors text-sm"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-foreground/75 hover:text-[#e8400c] font-medium transition-colors text-sm"
              >
                Contact
              </a>
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="https://wa.me/2347059461257"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[#25d366] hover:text-[#1ebe5d] transition-colors text-sm font-semibold"
              >
                {/* WhatsApp SVG icon */}
                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.118 1.524 5.845L.057 23.617a.75.75 0 0 0 .922.899l5.919-1.71A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.666-.497-5.2-1.367l-.374-.214-3.872 1.118 1.062-3.772-.233-.386A10 10 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
                <span className="hidden xl:block">+234 705 946 1257</span>
              </a>
              <button className="bg-[#e8400c] text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#e8400c]/90 transition-all shadow-md hover:shadow-lg">
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
                  <div className="ml-3 mt-1 pb-1">
                    {/* Education & Visa */}
                    <div className="px-4 pt-2 pb-1">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Education & Visa</span>
                    </div>
                    {servicesList.slice(0, 6).map((service) => (
                      <Link
                        key={service.slug}
                        to={`/services/${service.slug}`}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary transition-colors active:bg-secondary/80"
                        onClick={() => setIsMobileOpen(false)}
                      >
                        <service.icon className="w-4 h-4 text-[#e8400c] flex-shrink-0" />
                        <span className="text-sm text-foreground font-medium">{service.label}</span>
                      </Link>
                    ))}
                    {/* Travel */}
                    <div className="px-4 pt-3 pb-1">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Travel & Trips</span>
                    </div>
                    {servicesList.slice(6, 14).map((service) => (
                      <Link
                        key={service.slug}
                        to={`/services/${service.slug}`}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary transition-colors active:bg-secondary/80"
                        onClick={() => setIsMobileOpen(false)}
                      >
                        <service.icon className="w-4 h-4 text-[#e8400c] flex-shrink-0" />
                        <span className="text-sm text-foreground font-medium">{service.label}</span>
                      </Link>
                    ))}
                    {/* Language & Test Prep */}
                    <div className="px-4 pt-3 pb-1">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Language & Exam Prep</span>
                    </div>
                    {servicesList.slice(14).map((service) => (
                      <Link
                        key={service.slug}
                        to={`/services/${service.slug}`}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary transition-colors active:bg-secondary/80"
                        onClick={() => setIsMobileOpen(false)}
                      >
                        <service.icon className="w-4 h-4 text-[#e8400c] flex-shrink-0" />
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

              <div className="pt-3 pb-4 px-1 space-y-2">
                <a
                  href="https://wa.me/2347059461257"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#25d366] text-white px-5 py-3 rounded-lg font-semibold hover:bg-[#1ebe5d] transition-all text-sm"
                  onClick={() => setIsMobileOpen(false)}
                >
                  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.118 1.524 5.845L.057 23.617a.75.75 0 0 0 .922.899l5.919-1.71A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.666-.497-5.2-1.367l-.374-.214-3.872 1.118 1.062-3.772-.233-.386A10 10 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                  </svg>
                  Chat on WhatsApp
                </a>
                <button className="w-full bg-[#e8400c] text-white px-5 py-3 rounded-lg font-semibold hover:bg-[#e8400c]/90 transition-all text-sm">
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
              <div className="flex items-center mb-5">
                <img
                  src={logoImg}
                  alt="Boss Academy"
                  className="h-10 w-auto object-contain brightness-0 invert"
                />
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-5">
                Transforming lives through education and travel. Your trusted partner for study abroad, citizenship, travel, and professional development.
              </p>
              <div className="flex gap-2">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#e8400c] transition-colors"
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
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#e8400c]" />
                  <span className="text-white/60 text-sm">+123 456 7890</span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#e8400c]" />
                  <span className="text-white/60 text-sm">info@bossacademy.com</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#e8400c]" />
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

      {/* Floating WhatsApp Chat Button */}
      <a
        href="https://wa.me/2347059461257"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 bg-[#25d366] text-white rounded-full shadow-2xl hover:shadow-[0_8px_30px_rgba(37,211,102,0.5)] hover:scale-105 transition-all duration-300 group"
        style={{ padding: '14px' }}
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25d366] animate-ping opacity-25" />
        {/* WhatsApp SVG */}
        <svg className="w-7 h-7 relative z-10 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.118 1.524 5.845L.057 23.617a.75.75 0 0 0 .922.899l5.919-1.71A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.666-.497-5.2-1.367l-.374-.214-3.872 1.118 1.062-3.772-.233-.386A10 10 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
        </svg>
        {/* Tooltip label — shows on hover desktop */}
        <span className="hidden sm:block max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap text-sm font-semibold pr-1">
          Chat with us
        </span>
      </a>
    </div>
  );
}
