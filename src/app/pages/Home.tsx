import { Link } from 'react-router';
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
  ArrowRight,
  Star,
  CheckCircle2,
  Quote,
  Award,
  Clock,
} from 'lucide-react';

const services = [
  {
    slug: 'study-europe',
    title: 'Study in Europe',
    desc: 'Access top European universities with expert guidance and end-to-end support from application to arrival.',
    icon: GraduationCap,
    color: '#2d4a9e',
    badge: 'Most Popular',
  },
  {
    slug: 'study-uk',
    title: 'Study in UK',
    desc: 'Gain admission to prestigious UK institutions including Oxford, Cambridge, and Imperial College.',
    icon: Globe,
    color: '#1e40af',
    badge: null,
  },
  {
    slug: 'study-canada',
    title: 'Study in Canada',
    desc: 'World-class universities, post-graduation work permits, and a clear pathway to Canadian permanent residency.',
    icon: GraduationCap,
    color: '#dc2626',
    badge: 'New',
  },
  {
    slug: 'citizen-brazil',
    title: 'Citizen by Birth Brazil',
    desc: 'Claim your Brazilian citizenship by birth and unlock South American opportunities.',
    icon: Shield,
    color: '#15803d',
    badge: null,
  },
  {
    slug: 'proof-of-funds',
    title: 'Proof of Funds',
    desc: 'Embassy-compliant financial documentation prepared in 3–5 days with a 99.5% approval rate.',
    icon: DollarSign,
    color: '#0e7490',
    badge: null,
  },
  {
    slug: 'school-excursions',
    title: 'Excursions & Tourism for Schools',
    desc: 'Curated educational tours combining cultural immersion, history, and academic enrichment.',
    icon: Bus,
    color: '#e11d48',
    badge: null,
  },
  {
    slug: 'visit-europe',
    title: 'Visit Europe',
    desc: 'Explore Europe with expertly curated packages and full Schengen visa assistance included.',
    icon: MapPin,
    color: '#7c3aed',
    badge: null,
  },
  {
    slug: 'visit-uk',
    title: 'Visit UK',
    desc: 'Discover London, Edinburgh, and beyond with full UK Standard Visitor Visa support.',
    icon: Globe,
    color: '#be123c',
    badge: 'New',
  },
  {
    slug: 'visit-canada',
    title: 'Visit Canada',
    desc: 'From Niagara Falls to Banff National Park — experience Canada with complete visa support.',
    icon: MapPin,
    color: '#b91c1c',
    badge: 'New',
  },
  {
    slug: 'visit-china',
    title: 'Visit China',
    desc: 'Walk the Great Wall, explore the Forbidden City, and discover 5,000 years of extraordinary civilization.',
    icon: Globe,
    color: '#9f1239',
    badge: 'New',
  },
  {
    slug: 'visit-australia',
    title: 'Visit Australia',
    desc: 'Sydney Opera House, Great Barrier Reef, Uluru — experience the Land Down Under in full.',
    icon: Globe,
    color: '#0e7490',
    badge: 'New',
  },
  {
    slug: 'visit-kenya',
    title: 'Visit Kenya',
    desc: 'Witness the Great Migration, explore Nairobi, and relax on pristine Indian Ocean beaches.',
    icon: Palmtree,
    color: '#15803d',
    badge: 'New',
  },
  {
    slug: 'visit-zanzibar',
    title: 'Visit Zanzibar',
    desc: 'Experience the pristine beaches and rich Swahili culture of Zanzibar with all-inclusive packages.',
    icon: Palmtree,
    color: '#0284c7',
    badge: 'New',
  },
  {
    slug: 'group-trip-kigali',
    title: 'Group Trip Kigali',
    desc: "Join a curated group trip to Rwanda's vibrant capital, including gorilla trekking.",
    icon: Users,
    color: '#b45309',
    badge: null,
  },
  {
    slug: 'ielts',
    title: 'IELTS Preparation',
    desc: 'Expert IELTS coaching for Academic and General Training — achieve the band score your goals require.',
    icon: BookOpen,
    color: '#1d4ed8',
    badge: 'New',
  },
  {
    slug: 'celpip-tutorial',
    title: 'CELPIP Tutorial',
    desc: 'Specialist CELPIP coaching for Canadian immigration — reach CLB 7–10 with targeted preparation.',
    icon: BookOpen,
    color: '#2563eb',
    badge: 'New',
  },
  {
    slug: 'pre-tutorial',
    title: 'Pre Tutorial',
    desc: 'Comprehensive academic preparation before departure so you arrive confident and ready to excel.',
    icon: BookOpen,
    color: '#7c3aed',
    badge: null,
  },
  {
    slug: 'french-language',
    title: 'French Language',
    desc: 'Master French from A1 to C2 with certified native-speaking instructors and DELF/DALF prep.',
    icon: Languages,
    color: '#be185d',
    badge: null,
  },
  {
    slug: 'chinese-language',
    title: 'Chinese (Mandarin)',
    desc: 'Learn Mandarin from HSK 1 to HSK 6 with certified native speakers — business and academic tracks.',
    icon: Languages,
    color: '#dc2626',
    badge: 'New',
  },
  {
    slug: 'travel-insurance',
    title: 'Travel Insurance',
    desc: 'Comprehensive travel coverage — medical emergencies, trip cancellation, visa rejection, and more.',
    icon: Shield,
    color: '#059669',
    badge: 'New',
  },
];

const testimonials = [
  {
    name: 'Amina Hassan',
    role: 'Studying at University of Manchester',
    service: 'Study in UK',
    content:
      "Boss Academy made my dream of studying in the UK a reality. From application to arrival, they handled everything professionally. I couldn't have done it without them.",
    rating: 5,
    initials: 'AH',
  },
  {
    name: 'John Mwangi',
    role: 'Kigali Trip Participant',
    service: 'Group Trip Kigali',
    content:
      'The group trip to Kigali was incredible! Well organized, safe, and full of unforgettable experiences. The gorilla trekking alone was worth every penny.',
    rating: 5,
    initials: 'JM',
  },
  {
    name: 'Sarah Ahmed',
    role: 'French Language Graduate',
    service: 'French Language',
    content:
      'I passed my DELF B2 exam thanks to their excellent French program. The teachers are patient, highly qualified, and truly invested in your success.',
    rating: 5,
    initials: 'SA',
  },
];

export default function Home() {
  return (
    <div className="w-full bg-background">
      {/* Hero */}
      <section className="relative text-white py-24 lg:py-36 px-4 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #2d4a9e 40%, #3b5bdb 100%)' }}
        />
        <div className="absolute inset-0">
          <div className="absolute top-16 left-8 w-80 h-80 bg-white/8 rounded-full blur-3xl" />
          <div className="absolute bottom-16 right-8 w-96 h-96 bg-white/8 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-white/4 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full mb-8 border border-white/20">
            <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
            <span className="text-sm font-medium">Trusted by 5,000+ students worldwide</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-[1.1] max-w-5xl mx-auto">
            Your Gateway to{' '}
            <span className="text-yellow-300">Global Education</span> &{' '}
            <span className="text-yellow-300">Adventure</span>
          </h1>
          <p className="text-lg lg:text-xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed">
            Boss Academy connects you with world-class education opportunities and unforgettable travel experiences across Europe, Africa, and beyond. Ten specialized services — one trusted partner.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button className="bg-white text-[#2d4a9e] px-8 py-4 rounded-xl font-bold text-base hover:bg-gray-50 transition-all shadow-2xl hover:shadow-3xl flex items-center justify-center gap-2 group">
              Explore Our Services
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border-2 border-white/40 text-white px-8 py-4 rounded-xl font-semibold text-base hover:bg-white/10 transition-all backdrop-blur-sm">
              Book Free Consultation
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {[
              { value: '5,000+', label: 'Happy Clients' },
              { value: '10+', label: 'Years Experience' },
              { value: '98%', label: 'Success Rate' },
              { value: '24/7', label: 'Support' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold mb-1">{stat.value}</div>
                <div className="text-white/60 text-xs uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-[#2d4a9e]/10 text-[#2d4a9e] px-4 py-2 rounded-full mb-4">
              <Award className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">What We Offer</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">Our 20 Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From education consulting to curated travel experiences and language coaching — each service is backed by a decade of expertise.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {services.map((service) => (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                className="group bg-white rounded-2xl p-6 border border-border hover:border-[#2d4a9e]/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
              >
                {service.badge && (
                  <span
                    className="absolute top-4 right-4 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide"
                    style={{ backgroundColor: service.badge === 'New' ? service.color : '#2d4a9e' }}
                  >
                    {service.badge}
                  </span>
                )}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${service.color}18` }}
                >
                  <service.icon className="w-5 h-5" style={{ color: service.color }} />
                </div>
                <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-[#2d4a9e] transition-colors leading-snug">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{service.desc}</p>
                <span className="inline-flex items-center gap-1.5 text-[#2d4a9e] text-sm font-semibold group-hover:gap-2.5 transition-all">
                  Learn More <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-4 bg-secondary" id="about">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#2d4a9e]/10 text-[#2d4a9e] px-4 py-2 rounded-full mb-6">
                <Shield className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-widest">Why Boss Academy</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                Your Trusted Partner for Global Opportunities
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                With over a decade of experience, we have helped thousands of students and travelers achieve their international dreams with personalized, end-to-end support.
              </p>
              <div className="space-y-4">
                {[
                  {
                    icon: CheckCircle2,
                    title: 'End-to-End Support',
                    desc: "From your first consultation to arrival — we're with you every step of the way.",
                  },
                  {
                    icon: Award,
                    title: 'Proven Track Record',
                    desc: '98% success rate across all services with over 5,000 satisfied clients worldwide.',
                  },
                  {
                    icon: Globe,
                    title: 'Global Network',
                    desc: 'Partnerships with 50+ universities and trusted travel operators worldwide.',
                  },
                  {
                    icon: Clock,
                    title: '24/7 Availability',
                    desc: 'Our team is always available to answer your questions and address concerns.',
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 bg-white rounded-xl p-5 shadow-sm border border-border hover:shadow-md transition-shadow"
                  >
                    <div className="w-10 h-10 bg-[#2d4a9e]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-[#2d4a9e]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1 text-sm">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&h=400&fit=crop"
                alt="Students graduating"
                className="rounded-2xl shadow-xl w-full h-56 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=500&h=400&fit=crop"
                alt="UK campus"
                className="rounded-2xl shadow-xl w-full h-56 object-cover mt-8"
              />
              <img
                src="https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=500&h=400&fit=crop"
                alt="Zanzibar beach"
                className="rounded-2xl shadow-xl w-full h-56 object-cover -mt-8"
              />
              <img
                src="https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=500&h=400&fit=crop"
                alt="Kigali Rwanda"
                className="rounded-2xl shadow-xl w-full h-56 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-[#2d4a9e]/10 text-[#2d4a9e] px-4 py-2 rounded-full mb-4">
              <Star className="w-4 h-4 fill-[#2d4a9e]" />
              <span className="text-xs font-bold uppercase tracking-widest">Student Stories</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">What Our Clients Say</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real stories from students and travelers who achieved their dreams with Boss Academy.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-7">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 shadow-lg border border-border hover:shadow-xl transition-shadow"
              >
                <Quote className="w-8 h-8 text-[#2d4a9e]/20 mb-4" />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-foreground mb-6 leading-relaxed text-sm">"{t.content}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-10 h-10 bg-[#2d4a9e]/10 rounded-full flex items-center justify-center text-[#2d4a9e] font-bold text-sm flex-shrink-0">
                    {t.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-foreground text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground truncate">{t.role}</div>
                  </div>
                  <div className="ml-auto flex-shrink-0">
                    <span className="text-[10px] bg-[#2d4a9e]/10 text-[#2d4a9e] px-2 py-0.5 rounded-full font-semibold whitespace-nowrap">
                      {t.service}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #2d4a9e 50%, #3b5bdb 100%)' }}
        />
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10 text-white">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of students and travelers who have transformed their lives with Boss Academy. Book a free consultation today — no obligation, just expert guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-white text-[#2d4a9e] px-8 py-4 rounded-xl font-bold text-base hover:bg-gray-50 transition-all shadow-xl flex items-center justify-center gap-2 group">
              Book Free Consultation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border-2 border-white/40 text-white px-8 py-4 rounded-xl font-semibold text-base hover:bg-white/10 transition-all">
              Browse All Services
            </button>
          </div>
          <div className="grid sm:grid-cols-3 gap-8 pt-8 border-t border-white/20">
            {[
              { value: '10+', label: 'Years Experience' },
              { value: '5,000+', label: 'Happy Clients' },
              { value: '24/7', label: 'Support Available' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold mb-1">{s.value}</div>
                <div className="text-white/60 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
