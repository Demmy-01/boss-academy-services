import { useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router';
import { ScrollingBanner } from './components/ScrollingBanner';
import logoImg from '../images/logo.png';
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from 'lucide-react';

const serviceLinks = [
  // Education & Visa
  { slug: 'study-europe', label: 'Study in Europe' },
  { slug: 'study-uk', label: 'Study in UK' },
  { slug: 'study-canada', label: 'Study in Canada' },
  { slug: 'citizen-brazil', label: 'Citizen by Birth Brazil' },
  { slug: 'proof-of-funds', label: 'Proof of Funds' },
  { slug: 'school-excursions', label: 'Excursions & Tourism' },
  // Travel
  { slug: 'visit-europe', label: 'Visit Europe' },
  { slug: 'visit-uk', label: 'Visit UK' },
  { slug: 'visit-canada', label: 'Visit Canada' },
  { slug: 'visit-china', label: 'Visit China' },
  { slug: 'visit-australia', label: 'Visit Australia' },
  { slug: 'visit-kenya', label: 'Visit Kenya' },
  { slug: 'visit-zanzibar', label: 'Visit Zanzibar' },
  { slug: 'group-trip-kigali', label: 'Group Trip Kigali' },
  // Language & Test Prep
  { slug: 'ielts', label: 'IELTS Preparation' },
  { slug: 'celpip-tutorial', label: 'CELPIP Tutorial' },
  { slug: 'french-language', label: 'French Language' },
  { slug: 'chinese-language', label: 'Chinese (Mandarin)' },
  { slug: 'pre-tutorial', label: 'Pre Tutorial' },
  // Insurance
  { slug: 'travel-insurance', label: 'Travel Insurance' },
];

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    } catch {
      window.scrollTo(0, 0);
    }
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);
  return null;
}

const WHATSAPP_URL = 'https://wa.me/2347059461257';

export default function Root() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />

      {/* â”€â”€ Navbar â”€â”€ */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo */}
            <Link to="/study-europe" className="flex items-center flex-shrink-0">
              <img
                src={logoImg}
                alt="Boss Academy"
                className="h-10 lg:h-12 w-auto object-contain"
              />
            </Link>

            {/* Right-side CTAs */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* WhatsApp */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="flex items-center gap-2 text-[#25d366] hover:text-[#1ebe5d] font-semibold text-sm transition-colors"
              >
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.118 1.524 5.845L.057 23.617a.75.75 0 0 0 .922.899l5.919-1.71A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.666-.497-5.2-1.367l-.374-.214-3.872 1.118 1.062-3.772-.233-.386A10 10 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
                <span className="hidden sm:block">WhatsApp</span>
              </a>

              {/* Book Consultation */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#e8400c] text-white px-4 sm:px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#c0280a] transition-all shadow-md hover:shadow-lg whitespace-nowrap"
              >
                Book Free Consultation
              </a>
            </div>

          </div>
        </div>


      </header>
      <ScrollingBanner />

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* â”€â”€ Footer â”€â”€ */}
      <footer
        className="text-white"
        style={{ background: 'linear-gradient(135deg, #7f1d1d 0%, #9a1515 30%, #c0280a 65%, #e8400c 100%)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-5">
                <img
                  src={logoImg}
                  alt="Boss Academy"
                  className="h-10 w-auto object-contain brightness-0 invert"
                />
              </div>
              <p className="text-white/75 text-sm leading-relaxed mb-5">
                Transforming lives through education and travel. Your trusted partner for study abroad, citizenship, travel, and professional development.
              </p>
              <div className="flex gap-2">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-8 h-8 bg-white/15 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Study & Visa */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-widest mb-4 text-white/60">Study & Visa</h4>
              <ul className="space-y-2.5">
                {serviceLinks.slice(0, 6).map((s) => (
                  <li key={s.slug}>
                    <Link
                      to={`/${s.slug}`}
                      className="text-white/70 hover:text-white text-sm transition-colors hover:translate-x-0.5 inline-block"
                    >
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Travel */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-widest mb-4 text-white/60">Travel & Trips</h4>
              <ul className="space-y-2.5">
                {serviceLinks.slice(6, 14).map((s) => (
                  <li key={s.slug}>
                    <Link
                      to={`/${s.slug}`}
                      className="text-white/70 hover:text-white text-sm transition-colors hover:translate-x-0.5 inline-block"
                    >
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-widest mb-4 text-white/60">Contact Us</h4>
              <ul className="space-y-4 mb-6">
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-white/60" />
                  <a href="tel:+2347059461257" className="text-white/70 hover:text-white text-sm transition-colors">+234 705 946 1257</a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-white/60" />
                  <a href="mailto:info@bossacademy.com" className="text-white/70 hover:text-white text-sm transition-colors">info@bossacademy.com</a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-white/60" />
                  <span className="text-white/70 text-sm">123 Academy Street, Education City</span>
                </li>
              </ul>
              {/* Language & Insurance links */}
              <h4 className="font-bold text-xs uppercase tracking-widest mb-3 text-white/60">Language & Exams</h4>
              <ul className="space-y-2">
                {serviceLinks.slice(14).map((s) => (
                  <li key={s.slug}>
                    <Link
                      to={`/${s.slug}`}
                      className="text-white/70 hover:text-white text-sm transition-colors hover:translate-x-0.5 inline-block"
                    >
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-xs">Â© 2026 Boss Academy. All rights reserved.</p>
            <div className="flex gap-6 text-xs text-white/50">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 bg-[#25d366] text-white rounded-full shadow-2xl hover:shadow-[0_8px_30px_rgba(37,211,102,0.5)] hover:scale-105 transition-all duration-300 group"
        style={{ padding: '14px' }}
      >
        <span className="absolute inset-0 rounded-full bg-[#25d366] animate-ping opacity-25" />
        <svg className="w-7 h-7 relative z-10 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.118 1.524 5.845L.057 23.617a.75.75 0 0 0 .922.899l5.919-1.71A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.666-.497-5.2-1.367l-.374-.214-3.872 1.118 1.062-3.772-.233-.386A10 10 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
        </svg>
        <span className="hidden sm:block max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap text-sm font-semibold pr-1">
          Chat with us
        </span>
      </a>
    </div>
  );
}
