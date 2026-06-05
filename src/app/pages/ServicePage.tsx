import { useState, useRef, useEffect } from 'react';
import StudyEuropeApplicationModal from '../components/StudyEuropeApplicationModal';
import { useParams, Link } from 'react-router';
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
  CheckCircle2,
  Award,
  Clock,
  Star,
  Quote,
  Phone,
  Mail,
  FileText,
  ChevronRight,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  desc: string;
}

interface ProcessStep {
  step: string;
  title: string;
  desc: string;
}

interface FaqItem {
  q: string;
  a: string;
}

interface Testimonial {
  name: string;
  role: string;
  content: string;
  initials: string;
}

interface ServiceData {
  title: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  gradientFrom: string;
  gradientTo: string;
  heroImage: string;
  stats: { value: string; label: string }[];
  features: Feature[];
  process: ProcessStep[];
  benefits: string[];
  faq: FaqItem[];
  testimonial: Testimonial;
  cta: { title: string; subtitle: string; button: string };
}

const allServices: Record<string, ServiceData> = {
  'study-europe': {
    title: 'Study in Europe',
    tagline: "Unlock Your Future in Europe's Top Universities",
    description:
      'Get expert guidance on university applications, visa processing, and settlement. Our experienced counselors have helped 500+ students gain admission to prestigious European universities across Germany, France, the Netherlands, Spain, and more.',
    icon: GraduationCap,
    gradientFrom: '#9a1515',
    gradientTo: '#f97316',
    heroImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=900&h=650&fit=crop',
    stats: [
      { value: '500+', label: 'Students Placed' },
      { value: '50+', label: 'Partner Universities' },
      { value: '98%', label: 'Success Rate' },
    ],
    features: [
      {
        icon: BookOpen,
        title: 'University Selection',
        desc: 'We identify the best universities matching your academic profile, budget, and career goals across Europe.',
      },
      {
        icon: FileText,
        title: 'Application Assistance',
        desc: 'Full support for personal statements, recommendation letters, and submission management across all deadlines.',
      },
      {
        icon: Globe,
        title: 'Visa Processing',
        desc: 'Expert guidance through student visa applications for all European countries, including Schengen and national visas.',
      },
      {
        icon: Users,
        title: 'Pre-Departure & Settlement',
        desc: 'Comprehensive pre-departure briefings and post-arrival support to settle comfortably in your European home.',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Submit Required Documents',
        desc: 'Start by uploading your required documents academic transcripts, passport, language certificates, and any other supporting materials. This helps us assess your profile immediately.',
      },
      {
        step: '02',
        title: 'Book a Consultation',
        desc: 'Once your documents are submitted, book a session with our expert counselors. We review your profile, discuss your goals and budget, and recommend the best-fit European universities for you.',
      },
      {
        step: '03',
        title: 'University Application',
        desc: 'We prepare and submit your applications to your chosen universities, handling all documentation, deadlines, and follow-ups on your behalf until you receive an offer letter.',
      },
      {
        step: '04',
        title: 'Visa Processing & Departure',
        desc: 'We guide you through the student visa process, prepare all required documents, coach you for any interviews, and provide a full pre-departure briefing so you arrive ready.',
      },
    ],
    benefits: [
      'Access to 1,000+ European universities',
      'Tuition fees from â‚¬0 in Germany and beyond',
      'Rich multicultural academic environment',
      'Opportunities to work part-time while studying',
      'Pathway to European residency and work rights',
      'World-ranked degrees recognized globally',
    ],
    faq: [
      {
        q: 'What are the language requirements for studying in Europe?',
        a: "Requirements vary by country and program. Many universities offer English-taught programs. Some countries may require local language proof for certain programs. We assess your profile and guide you accordingly.",
      },
      {
        q: 'How long does the application process take?',
        a: 'The process typically takes 3â€“6 months from initial consultation to visa approval. We recommend starting at least 8 months before your intended start date.',
      },
      {
        q: 'Are there scholarships available for international students?',
        a: 'Yes! Many European governments and universities offer scholarships for international students. We help you identify and apply for relevant scholarships as part of our service.',
      },
      {
        q: 'What are the living costs in Europe?',
        a: "Living costs vary by country. Germany and the Netherlands offer lower costs, while Switzerland is more expensive. We provide detailed cost breakdowns for your chosen destination.",
      },
    ],
    testimonial: {
      name: 'Amina Hassan',
      role: 'Studying at TU Berlin, Germany',
      content:
        "Boss Academy turned what seemed impossible into reality. They guided me through every step â€” from choosing the right university to getting my visa approved. I am now studying Engineering in Berlin and loving every moment.",
      initials: 'AH',
    },
    cta: {
      title: 'Start Your European Education Journey',
      subtitle: 'Book a free consultation with our expert counselors today',
      button: 'Book Free Consultation',
    },
  },

  'study-uk': {
    title: 'Study in UK',
    tagline: 'World-Class Education at Prestigious British Institutions',
    description:
      'Access the best universities in the United Kingdom including Oxford, Cambridge, Imperial College, UCL, and many more. We handle everything from UCAS applications to Tier 4 visa processing and pre-departure support.',
    icon: Globe,
    gradientFrom: '#9a1515',
    gradientTo: '#f97316',
    heroImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=900&h=650&fit=crop',
    stats: [
      { value: '300+', label: 'Students Placed' },
      { value: '30+', label: 'UK Universities' },
      { value: '97%', label: 'Visa Success Rate' },
    ],
    features: [
      {
        icon: Award,
        title: 'UCAS Application',
        desc: 'Professional assistance with your UCAS application, personal statement, and choice of universities tailored to your profile.',
      },
      {
        icon: Shield,
        title: 'UK Student Visa (CAS)',
        desc: 'Complete Tier 4 Student Visa guidance, CAS number assistance, and biometric appointment scheduling.',
      },
      {
        icon: BookOpen,
        title: 'IELTS Preparation Guidance',
        desc: 'Referral to accredited English language preparation centers and score requirement guidance for your chosen university.',
      },
      {
        icon: Users,
        title: 'Accommodation Support',
        desc: 'Help with university halls applications and private accommodation search in your chosen UK city.',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Profile Assessment',
        desc: 'We evaluate your qualifications and aspirations to identify the best UK universities for your application.',
      },
      {
        step: '02',
        title: 'UCAS Application',
        desc: 'We craft your personal statement and manage your UCAS application, ensuring all deadlines are met.',
      },
      {
        step: '03',
        title: 'Visa Application',
        desc: 'After receiving your offer letter and CAS number, we guide you through the complete Tier 4 visa application.',
      },
      {
        step: '04',
        title: 'Pre-Departure Briefing',
        desc: 'Comprehensive briefing covering life in the UK, NHS registration, banking, transport, and alumni introductions.',
      },
    ],
    benefits: [
      "Shorter degree programs (3 years for bachelor's)",
      'Access to world top-10 ranked universities',
      'Post-Study Work Visa valid for 2 years',
      'Vibrant multicultural campus environment',
      'Strong global alumni networks',
      'Clear pathway to permanent residency',
    ],
    faq: [
      {
        q: 'What IELTS score do I need for UK universities?',
        a: 'Most UK universities require an overall IELTS score of 6.0â€“7.0. Top universities like Oxford and Cambridge may require higher. We provide institution-specific requirements.',
      },
      {
        q: 'Can I work while studying in the UK?',
        a: 'Yes, most student visa holders can work up to 20 hours per week during term time and full-time during vacation periods.',
      },
      {
        q: 'How much does it cost to study in the UK?',
        a: 'Tuition fees for international students typically range from Â£10,000 to Â£38,000 per year. Living costs add approximately Â£12,000â€“Â£15,000 per year.',
      },
      {
        q: 'What is the Post-Study Work visa?',
        a: 'The Graduate Route allows you to stay and work in the UK for 2 years after completing your degree (3 years for PhD graduates).',
      },
    ],
    testimonial: {
      name: 'Kwame Asante',
      role: 'Studying MSc Finance at LSE',
      content:
        "The team at Boss Academy knew every detail of the UCAS process and made my LSE application seamless. Their IELTS guidance was spot on and my visa was approved first time. Highly recommend their UK service.",
      initials: 'KA',
    },
    cta: {
      title: 'Ready to Study at a UK University?',
      subtitle: 'Let our experts guide you through the entire process',
      button: 'Start UK Application',
    },
  },

  'citizen-brazil': {
    title: 'Citizen by Birth Brazil',
    tagline: 'Claim Your Brazilian Citizenship & Unlock New Opportunities',
    description:
      "Were you born in Brazil or to Brazilian parents? Our specialized team helps you navigate the Brazilian citizenship process, from eligibility verification to passport issuance. Gain access to South America's largest economy and benefit from Brazil's international agreements.",
    icon: Shield,
    gradientFrom: '#14532d',
    gradientTo: '#16a34a',
    heroImage: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=900&h=650&fit=crop',
    stats: [
      { value: '200+', label: 'Citizenships Secured' },
      { value: '12+', label: 'Countries Served' },
      { value: '100%', label: 'Legal Compliance' },
    ],
    features: [
      {
        icon: CheckCircle2,
        title: 'Eligibility Assessment',
        desc: 'Free assessment to determine if you qualify for Brazilian citizenship by birth, ancestry, or registration.',
      },
      {
        icon: FileText,
        title: 'Document Collection',
        desc: 'Expert guidance on gathering all required documents including birth certificates, translations, and notarizations.',
      },
      {
        icon: Globe,
        title: 'Consulate Application',
        desc: 'Complete assistance with the Brazilian consulate application process and follow-up until approval.',
      },
      {
        icon: Award,
        title: 'Passport Assistance',
        desc: 'Full support with obtaining your Brazilian passport and guidance on maintaining dual citizenship status.',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Free Eligibility Check',
        desc: 'Submit your details for a free eligibility assessment. We determine if you qualify and outline specific requirements.',
      },
      {
        step: '02',
        title: 'Document Gathering',
        desc: 'We provide a comprehensive checklist and assist with collecting, translating, and notarizing all required documents.',
      },
      {
        step: '03',
        title: 'Consulate Submission',
        desc: 'We prepare your complete application package and guide you through the consulate appointment and submission.',
      },
      {
        step: '04',
        title: 'Citizenship & Passport',
        desc: 'Upon approval, we help you complete citizenship registration and apply for your Brazilian passport.',
      },
    ],
    benefits: [
      'Access to Mercosur South American trade bloc benefits',
      'Right to live and work in Brazil without restriction',
      'Access to quality public education and healthcare',
      'Dual citizenship allowed for many nationalities',
      'Brazilian passport grants visa-free access to 170+ countries',
      'Full political rights and participation in Brazil',
    ],
    faq: [
      {
        q: 'Who qualifies for Brazilian citizenship by birth?',
        a: 'Those born in Brazil (regardless of parents nationality) and those born abroad to at least one Brazilian parent generally qualify. Specific registration requirements apply to each case.',
      },
      {
        q: 'Does Brazil allow dual citizenship?',
        a: 'Yes, Brazil generally allows its citizens to hold dual nationality, though it depends on your other country\'s laws. We advise on the specifics of your situation.',
      },
      {
        q: 'How long does the process take?',
        a: 'The process typically takes 6â€“18 months depending on the consulate, document completeness, and your specific case. We keep you updated throughout.',
      },
      {
        q: 'What documents do I need?',
        a: 'Core documents typically include birth certificates (yours and your parents), proof of Brazilian parentage or birth in Brazil, valid identity documents, and photos. The exact list depends on your situation.',
      },
    ],
    testimonial: {
      name: 'Maria Oliveira',
      role: 'Now a Brazilian citizen, living in SÃ£o Paulo',
      content:
        "I was born in Brazil but left as a child. Boss Academy helped me reclaim my citizenship â€” something I thought would be nearly impossible. The process was smooth, professional, and faster than I expected.",
      initials: 'MO',
    },
    cta: {
      title: 'Claim Your Brazilian Citizenship Today',
      subtitle: 'Get a free eligibility assessment from our specialists',
      button: 'Check My Eligibility',
    },
  },

  'proof-of-funds': {
    title: 'Proof of Funds',
    tagline: 'Embassy-Compliant Financial Documentation, Fast',
    description:
      'Meeting visa financial requirements is crucial to a successful application. Our specialized team helps you prepare, organize, and present your proof of funds in the exact format required by embassies and universities worldwide.',
    icon: DollarSign,
    gradientFrom: '#164e63',
    gradientTo: '#0284c7',
    heroImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&h=650&fit=crop',
    stats: [
      { value: '99.5%', label: 'Approval Rate' },
      { value: '3â€“5 Days', label: 'Turnaround' },
      { value: '1,000+', label: 'Clients Served' },
    ],
    features: [
      {
        icon: FileText,
        title: 'Bank Statement Prep',
        desc: 'We guide you on organizing and presenting bank statements to meet specific embassy requirements.',
      },
      {
        icon: Award,
        title: 'Sponsorship Letters',
        desc: 'Professional drafting of sponsorship letters from employers, parents, or other sponsors in accepted formats.',
      },
      {
        icon: Shield,
        title: 'Loan Documentation',
        desc: 'Assistance with education loan documentation including bank confirmation letters and approved loan statements.',
      },
      {
        icon: CheckCircle2,
        title: 'Certified Translation',
        desc: 'Certified translation of financial documents from local languages to English or the required embassy language.',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Requirements Analysis',
        desc: 'We analyze the specific proof of funds requirements for your destination country and visa type.',
      },
      {
        step: '02',
        title: 'Document Preparation',
        desc: 'We help you organize your financial documents, draft sponsorship letters, and prepare everything in the required format.',
      },
      {
        step: '03',
        title: 'Review & Verification',
        desc: 'Our team thoroughly reviews all documents for completeness, accuracy, and embassy compliance standards.',
      },
      {
        step: '04',
        title: 'Submission Ready',
        desc: 'We deliver your complete, organized proof of funds package ready for submission with your visa application.',
      },
    ],
    benefits: [
      'Country-specific format compliance guaranteed',
      'Fast turnaround in 3â€“5 business days',
      'Certified translation services available',
      'Expert review before you submit',
      'Support for previously rejected applications',
      'Ongoing guidance through the entire visa process',
    ],
    faq: [
      {
        q: 'How much money do I need to show for a UK student visa?',
        a: 'You need to show Â£1,023 per month (up to 9 months) for courses in London, or Â£820 per month outside London, plus your first year\'s tuition fees if not already paid.',
      },
      {
        q: 'Can a parent sponsor me?',
        a: 'Yes, parents and official sponsors can provide financial support. We help draft professional sponsorship letters and organize the required supporting documents.',
      },
      {
        q: 'What if my bank statement does not show enough funds?',
        a: 'We assess your complete financial picture, including savings, investments, sponsorship, and education loans. We help you present your strongest possible financial case within legal bounds.',
      },
      {
        q: 'How long does the money need to be in my account?',
        a: 'Most embassies require funds to have been in the account for 28 consecutive days before the application date. We advise on the specific requirements for your destination.',
      },
    ],
    testimonial: {
      name: 'Emmanuel Osei',
      role: 'Visa approved for Netherlands',
      content:
        "My visa was rejected twice before I found Boss Academy. They restructured my proof of funds, drafted a proper sponsorship letter, and my third application was approved within weeks. Incredible service.",
      initials: 'EO',
    },
    cta: {
      title: 'Get Your Proof of Funds Ready',
      subtitle: 'Fast, accurate, embassy-compliant documentation',
      button: 'Get Started Now',
    },
  },

  'school-excursions': {
    title: 'Excursions & Tourism for Schools',
    tagline: 'Transform Learning into Unforgettable Adventure',
    description:
      'We design and manage educational tours for schools that combine cultural immersion, historical exploration, and academic enrichment. Safe, organized, and curriculum-aligned trips that students and teachers love.',
    icon: Bus,
    gradientFrom: '#9f1239',
    gradientTo: '#f43f5e',
    heroImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&h=650&fit=crop',
    stats: [
      { value: '150+', label: 'Schools Served' },
      { value: '10,000+', label: 'Students Traveled' },
      { value: '4.9â˜…', label: 'School Rating' },
    ],
    features: [
      {
        icon: Globe,
        title: 'European Capital Tours',
        desc: 'Immersive guided tours of Paris, London, Rome, Amsterdam, and other European capitals with educational focus.',
      },
      {
        icon: Award,
        title: 'Historical Expeditions',
        desc: 'Curriculum-linked visits to historical sites, museums, and cultural landmarks across Europe and Africa.',
      },
      {
        icon: BookOpen,
        title: 'STEM-Focused Tours',
        desc: 'Technology hubs, science museums, space centers, and engineering marvels for STEM curriculum enrichment.',
      },
      {
        icon: Shield,
        title: 'Safety & Insurance',
        desc: '24/7 supervision, comprehensive travel insurance, and fully risk-assessed itineraries for complete peace of mind.',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Needs Assessment',
        desc: 'We consult with school administration to understand curriculum goals, budget, age group, and destinations.',
      },
      {
        step: '02',
        title: 'Custom Itinerary',
        desc: 'Our team designs a curriculum-aligned itinerary with educational activities, museum visits, and cultural experiences.',
      },
      {
        step: '03',
        title: 'Logistics & Booking',
        desc: 'We handle all logistics including transport, accommodation, meals, activities, insurance, and risk assessments.',
      },
      {
        step: '04',
        title: 'Tour Execution',
        desc: 'Expert guides accompany the group throughout, ensuring a safe, educational, and memorable experience for all.',
      },
    ],
    benefits: [
      'Curriculum-aligned educational content',
      'Group discounts for school bookings',
      'Experienced multilingual tour guides',
      'Comprehensive travel insurance included',
      'Flexible payment plans available for schools',
      'Post-trip educational materials provided',
    ],
    faq: [
      {
        q: 'What is the minimum group size?',
        a: 'We typically require a minimum of 15 students for group pricing. Smaller groups can be accommodated at adjusted rates. Contact us to discuss your specific needs.',
      },
      {
        q: 'What is the teacher-to-student ratio?',
        a: 'We recommend 1 teacher per 10 students, aligned with most school policies. Our expert guides supplement school staff throughout the tour.',
      },
      {
        q: 'Is travel insurance included?',
        a: 'Yes, comprehensive travel insurance is included in all school packages, covering medical emergencies, trip cancellation, and personal liability.',
      },
      {
        q: 'Can you accommodate students with special needs?',
        a: "Absolutely. We conduct needs assessments and work with schools to ensure all students can fully participate, making necessary accessibility accommodations.",
      },
    ],
    testimonial: {
      name: 'Mrs. Adaeze Nwosu',
      role: 'Head of Trips, Victory International School',
      content:
        "We have used Boss Academy for three consecutive school excursions to Europe. Their organization is flawless, the students are safe, and the educational value is outstanding. They are our permanent partner for school trips.",
      initials: 'AN',
    },
    cta: {
      title: "Plan Your School's Next Adventure",
      subtitle: 'Get a custom itinerary and quote for your school group',
      button: 'Request School Quote',
    },
  },

  'visit-europe': {
    title: 'Visit Europe',
    tagline: 'Experience the Magic of Europe with Expert Guidance',
    description:
      'From the romantic streets of Paris to the historic landmarks of Rome, explore Europe with our expertly curated travel packages. Complete Schengen visa assistance, customized itineraries, and 24/7 support included.',
    icon: MapPin,
    gradientFrom: '#4c1d95',
    gradientTo: '#8b5cf6',
    heroImage: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=900&h=650&fit=crop',
    stats: [
      { value: '1,000+', label: 'Travelers Served' },
      { value: '26+', label: 'Countries Covered' },
      { value: '4.8â˜…', label: 'Traveler Rating' },
    ],
    features: [
      {
        icon: Shield,
        title: 'Schengen Visa Assistance',
        desc: 'Complete support for Schengen visa applications including document preparation, appointment booking, and interview coaching.',
      },
      {
        icon: MapPin,
        title: 'Custom Itineraries',
        desc: 'Personalized travel plans tailored to your interests, budget, and duration â€” from city breaks to month-long tours.',
      },
      {
        icon: Award,
        title: 'Hotel & Flights',
        desc: 'Access to the best deals on flights and accommodations across Europe, from budget options to luxury hotels.',
      },
      {
        icon: Users,
        title: 'Local Expert Guides',
        desc: 'Knowledgeable local guides in multiple languages to enhance your experience at every destination.',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Destination Planning',
        desc: 'Tell us your dream European destinations. We design a comprehensive itinerary maximizing your time and budget.',
      },
      {
        step: '02',
        title: 'Visa Application',
        desc: 'We prepare and submit your Schengen visa application with all required documents, maximizing approval chances.',
      },
      {
        step: '03',
        title: 'Booking Confirmation',
        desc: 'All flights, hotels, transfers, and activities are booked and confirmed in advance for a worry-free trip.',
      },
      {
        step: '04',
        title: 'Travel & Explore',
        desc: 'Depart with full travel documentation, emergency contacts, and our 24/7 support throughout your adventure.',
      },
    ],
    benefits: [
      'One Schengen visa covers 26 European countries',
      'Expert visa application support included',
      'Best-price guarantee on all packages',
      'Fully customizable itineraries',
      '24/7 emergency support while you travel',
      'Group and family discounts available',
    ],
    faq: [
      {
        q: 'Do I need a separate visa for each European country?',
        a: 'A Schengen visa allows you to visit 26 European countries with a single visa. Some countries like the UK require a separate visa. We handle all appropriate visas for your itinerary.',
      },
      {
        q: 'How far in advance should I apply for a Schengen visa?',
        a: 'We recommend applying at least 6â€“8 weeks before your travel date. Some embassies have high demand, so earlier is better. We handle the process to ensure timely submission.',
      },
      {
        q: 'What bank balance is required for a Schengen visa?',
        a: 'Requirements vary by country and duration. Generally, you need to show approximately â‚¬50â€“100 per day per person. We provide exact requirements based on your destination and profile.',
      },
      {
        q: 'Can I travel independently or do I need a guided tour?',
        a: 'We offer both! Choose a fully guided group tour, a partially guided package with independent time, or a self-guided package where we arrange everything but you travel at your own pace.',
      },
    ],
    testimonial: {
      name: 'Fatima Al-Rashid',
      role: 'Traveled 8 European countries in 3 weeks',
      content:
        "Boss Academy handled everything â€” from my Schengen visa to hotel bookings in 5 different cities. I just showed up at the airport. The itinerary was perfect and the guides were excellent. Will definitely use them again.",
      initials: 'FA',
    },
    cta: {
      title: 'Start Your European Adventure',
      subtitle: 'Get your custom itinerary and visa assistance today',
      button: 'Plan My Europe Trip',
    },
  },

  'visit-zanzibar': {
    title: 'Visit Zanzibar',
    tagline: 'Discover the Pristine Beauty of the Spice Island',
    description:
      'Experience the exotic charm of Zanzibar with our all-inclusive packages. Pristine white sand beaches, turquoise waters, rich Swahili culture, and spectacular spice farms await you on this Indian Ocean paradise.',
    icon: Palmtree,
    gradientFrom: '#0c4a6e',
    gradientTo: '#0ea5e9',
    heroImage: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=900&h=650&fit=crop',
    stats: [
      { value: '500+', label: 'Happy Travelers' },
      { value: '4.9â˜…', label: 'Guest Rating' },
      { value: '$899', label: 'Starting From' },
    ],
    features: [
      {
        icon: Palmtree,
        title: 'Luxury Beach Resorts',
        desc: "Hand-picked 4 and 5-star beach resorts on Zanzibar's pristine North and East coasts with ocean views.",
      },
      {
        icon: MapPin,
        title: 'Stone Town Tours',
        desc: "Guided tours of Zanzibar's UNESCO World Heritage Site Stone Town, exploring its rich history and architecture.",
      },
      {
        icon: Users,
        title: 'Water Sports & Diving',
        desc: 'World-class scuba diving, snorkeling, kite surfing, and dhow sailing in the crystal-clear Indian Ocean.',
      },
      {
        icon: Globe,
        title: 'Cultural Experiences',
        desc: 'Spice farm tours, traditional Swahili cooking classes, local market visits, and sunset dhow cruises.',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Package Selection',
        desc: 'Choose from honeymoon, adventure, family, or cultural packages â€” or let us build a custom Zanzibar itinerary.',
      },
      {
        step: '02',
        title: 'Travel Documentation',
        desc: 'We handle your Tanzania e-visa application and provide a complete packing list and pre-travel health advice.',
      },
      {
        step: '03',
        title: 'Flights & Transfers',
        desc: 'We book your international flights, domestic connections to Zanzibar, and all ground transfers.',
      },
      {
        step: '04',
        title: 'Arrive & Enjoy',
        desc: "You're welcomed by our local team, transferred to your resort, and supported throughout your Zanzibar stay.",
      },
    ],
    benefits: [
      'All-inclusive packages available',
      'Tanzania e-visa assistance included',
      'Expert local guides on every excursion',
      'Best-price beach resort bookings',
      'Customizable for honeymoons and anniversaries',
      'In-destination support team available 24/7',
    ],
    faq: [
      {
        q: 'When is the best time to visit Zanzibar?',
        a: 'The best time is June to October (dry season) and December to February. We recommend avoiding March to May for beach holidays due to heavy rains.',
      },
      {
        q: 'Do I need a visa to visit Zanzibar?',
        a: 'Tanzania (including Zanzibar) offers an e-visa for most nationalities, obtainable online before travel. We handle the e-visa application as part of our service.',
      },
      {
        q: 'Are there any health requirements?',
        a: 'Yellow fever vaccination is required if traveling from or through a yellow fever zone. Malaria prophylaxis is recommended. We provide a complete health guidance checklist.',
      },
      {
        q: 'What currency is used in Zanzibar?',
        a: 'The Tanzanian Shilling (TZS) is official, but US dollars are widely accepted. We advise on currency and payment methods before your trip.',
      },
    ],
    testimonial: {
      name: 'Chidinma Okafor',
      role: 'Honeymooner, Zanzibar',
      content:
        "Our Zanzibar honeymoon was nothing short of magical. Boss Academy organized everything perfectly â€” the resort was stunning, the spice farm tour was fascinating, and the sunset dhow cruise was unforgettable.",
      initials: 'CO',
    },
    cta: {
      title: 'Ready for Your Zanzibar Paradise?',
      subtitle: 'Book now and get our early-bird discount on all packages',
      button: 'View Zanzibar Packages',
    },
  },

  'group-trip-kigali': {
    title: 'Group Trip Kigali',
    tagline: "Experience Rwanda's Remarkable Transformation Together",
    description:
      "Join our curated group trips to Kigali, Rwanda's vibrant capital. Experience gorilla trekking, immerse yourself in the country's inspiring story of resilience, explore lush national parks, and connect with extraordinary fellow travelers.",
    icon: Users,
    gradientFrom: '#78350f',
    gradientTo: '#d97706',
    heroImage: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=900&h=650&fit=crop',
    stats: [
      { value: '50+', label: 'Trips Completed' },
      { value: '15â€“20', label: 'Group Size' },
      { value: '$1,499', label: 'Per Person (7 Days)' },
    ],
    features: [
      {
        icon: Globe,
        title: 'Gorilla Trekking',
        desc: 'Once-in-a-lifetime gorilla trekking in Volcanoes National Park with professional guides and permits included.',
      },
      {
        icon: MapPin,
        title: 'City & Cultural Tours',
        desc: "Explore Kigali's clean streets, vibrant markets, the Genocide Memorial, and Rwanda's inspiring development story.",
      },
      {
        icon: Users,
        title: 'Group Community',
        desc: 'Connect with like-minded travelers from across Africa and the diaspora for networking, friendships, and shared experiences.',
      },
      {
        icon: Award,
        title: 'Expert Trip Leader',
        desc: 'Every trip is led by an experienced guide with deep knowledge of Rwanda and Africa, ensuring a safe and enriching experience.',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Join the Waitlist',
        desc: 'Express your interest for our next Kigali group trip. We have multiple departures throughout the year.',
      },
      {
        step: '02',
        title: 'Booking & Deposit',
        desc: 'Secure your spot with a deposit. We provide a full itinerary, packing list, and pre-trip webinar for all participants.',
      },
      {
        step: '03',
        title: 'Pre-Trip Briefing',
        desc: 'Join our online pre-trip briefing to meet your fellow travelers, your trip leader, and prepare for the adventure.',
      },
      {
        step: '04',
        title: 'Depart Together',
        desc: "We coordinate a group departure or meet you in Kigali, where your unforgettable Rwanda adventure begins.",
      },
    ],
    benefits: [
      'All-inclusive package (flights, hotel, meals, tours)',
      'Gorilla trekking permit included ($1,500 value)',
      'Small group for a personalized experience',
      'Comprehensive travel insurance covered',
      'Professional trip leader throughout the journey',
      'Connect with a vibrant community of travelers',
    ],
    faq: [
      {
        q: 'Is the gorilla permit included in the price?',
        a: 'Yes! The gorilla trekking permit ($1,500 value) is included in our Kigali package. This is one of the most sought-after wildlife experiences in Africa and slots are strictly limited.',
      },
      {
        q: 'What fitness level is required for gorilla trekking?',
        a: 'Gorilla trekking involves hiking in mountainous terrain for 2â€“8 hours depending on the gorilla location. A reasonable fitness level is required. We provide detailed preparation advice.',
      },
      {
        q: 'Is Rwanda safe for tourists?',
        a: "Rwanda is consistently ranked as one of the safest countries in Africa. Kigali is particularly known for its safety, cleanliness, and order. Our trips have an excellent safety record.",
      },
      {
        q: 'Can solo travelers join the group trip?',
        a: 'Absolutely! Most of our participants are solo travelers. Group trips are perfect for solo adventurers looking for a safe, social travel experience. Room-sharing options are available.',
      },
    ],
    testimonial: {
      name: 'David Mensah',
      role: 'Joined the March Kigali Group Trip',
      content:
        "The Kigali group trip was the best decision I made all year. The gorilla trekking was surreal â€” nothing prepares you for being that close to a mountain gorilla. And the people I met are now lifelong friends.",
      initials: 'DM',
    },
    cta: {
      title: 'Join the Next Group Trip to Kigali',
      subtitle: 'Limited spots available â€” secure your place today',
      button: 'Reserve My Spot',
    },
  },

  'pre-tutorial': {
    title: 'Pre Tutorial',
    tagline: 'Arrive Confident â€” Master the Fundamentals Before You Go',
    description:
      "Get ahead with our comprehensive pre-departure academic tutorials. Whether you're heading to university in Europe, the UK, or elsewhere, our expert instructors prepare you for your chosen field of study so you hit the ground running.",
    icon: BookOpen,
    gradientFrom: '#4c1d95',
    gradientTo: '#8b5cf6',
    heroImage: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=900&h=650&fit=crop',
    stats: [
      { value: '560+', label: 'Students Trained' },
      { value: '95%', label: 'Course Completion' },
      { value: '4 Programs', label: 'Subjects Available' },
    ],
    features: [
      {
        icon: BookOpen,
        title: 'Subject-Specific Prep',
        desc: 'Targeted preparation for Engineering, Business, Medical Sciences, Computer Science, and more.',
      },
      {
        icon: Award,
        title: 'Expert Instructors',
        desc: 'Learn from experienced lecturers and industry professionals who understand international university curricula.',
      },
      {
        icon: Globe,
        title: 'Flexible Learning',
        desc: 'Online and in-person classes with recorded sessions. Study at your own pace with live Q&A support.',
      },
      {
        icon: CheckCircle2,
        title: 'Completion Certificate',
        desc: 'Receive an accredited completion certificate to boost your application and demonstrate academic readiness.',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Level Assessment',
        desc: 'Take our free online assessment to determine your current knowledge level and identify areas needing attention.',
      },
      {
        step: '02',
        title: 'Program Enrollment',
        desc: 'Enroll in your chosen subject program. We assign you to the appropriate cohort based on your assessment.',
      },
      {
        step: '03',
        title: 'Weekly Sessions',
        desc: 'Attend weekly live sessions (online or in-person), complete assignments, and join peer study groups.',
      },
      {
        step: '04',
        title: 'Complete & Certify',
        desc: 'Complete your program, pass the final assessment, and receive your certificate and academic readiness report.',
      },
    ],
    benefits: [
      'Significantly reduces academic shock upon arrival',
      'Builds confidence before departure',
      'Familiarity with international teaching styles',
      'Networking with future classmates',
      'Certificate recognized by partner universities',
      'Ongoing post-arrival academic support available',
    ],
    faq: [
      {
        q: 'How long are the pre-tutorial programs?',
        a: 'Programs range from 6 to 10 weeks depending on the subject. Part-time options are available for those with work commitments.',
      },
      {
        q: 'Are the programs available online?',
        a: 'Yes, all programs are available fully online with live sessions, recorded lectures, and interactive assignments. In-person sessions are available in select locations.',
      },
      {
        q: 'Which subjects are covered?',
        a: 'We currently offer Engineering Foundation, Business Studies Prep, Medical Sciences Introduction, and Computer Science Basics. We are expanding our subjects regularly.',
      },
      {
        q: 'Is the certificate recognized by universities?',
        a: 'The certificate is recognized by our partner universities and is a valuable addition to your student profile. It demonstrates academic readiness and seriousness.',
      },
    ],
    testimonial: {
      name: 'Uchenna Igwe',
      role: 'Now studying Computer Science at Maastricht University',
      content:
        "The Pre Tutorial program gave me a massive head start. By the time my semester began, I already understood the fundamentals and could focus on the advanced material. My professors noticed the difference immediately.",
      initials: 'UI',
    },
    cta: {
      title: 'Prepare for Academic Success Abroad',
      subtitle: 'Start your pre-tutorial program and arrive ready to excel',
      button: 'Enroll Now',
    },
  },

  'french-language': {
    title: 'French Language',
    tagline: 'Master French with Certified Native-Speaking Instructors',
    description:
      "Whether you're planning to study in France, Canada, or French-speaking African nations, or simply love the language, our comprehensive French courses take you from complete beginner (A1) to advanced speaker (C2) with certified native teachers.",
    icon: Languages,
    gradientFrom: '#831843',
    gradientTo: '#ec4899',
    heroImage: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=900&h=650&fit=crop',
    stats: [
      { value: '850+', label: 'Students Trained' },
      { value: '95%', label: 'DELF/DALF Pass Rate' },
      { value: 'A1â€“C2', label: 'All Levels' },
    ],
    features: [
      {
        icon: BookOpen,
        title: 'All Levels Welcome',
        desc: 'From complete beginners (A1) to advanced speakers (C2). Personalized learning paths based on your goals.',
      },
      {
        icon: Award,
        title: 'DELF/DALF Preparation',
        desc: 'Official DELF and DALF certification exam preparation, recognized by universities and employers worldwide.',
      },
      {
        icon: Users,
        title: 'Native Speakers Only',
        desc: 'All instructors are certified native French speakers with formal teaching qualifications and international experience.',
      },
      {
        icon: Globe,
        title: 'Cultural Immersion',
        desc: 'Beyond language, we incorporate French culture, etiquette, cinema, and cuisine for authentic fluency.',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Free Level Test',
        desc: 'Take our free online placement test to determine your current French level and get personalized course recommendations.',
      },
      {
        step: '02',
        title: 'Course Enrollment',
        desc: 'Enroll in your appropriate level. Choose from intensive, semi-intensive, or weekend classes to fit your schedule.',
      },
      {
        step: '03',
        title: 'Weekly Classes',
        desc: 'Attend weekly classes (2â€“4 hours depending on intensity), complete homework, and practice with conversation partners.',
      },
      {
        step: '04',
        title: 'Certification',
        desc: 'Sit for the official DELF or DALF exam and receive your internationally recognized French language certificate.',
      },
    ],
    benefits: [
      'Certified native French instructors only',
      'Small class sizes (maximum 12 students)',
      'DELF/DALF exam preparation included',
      'Online and in-person options available',
      'Flexible schedules including weekends',
      'Access to French conversation clubs',
    ],
    faq: [
      {
        q: 'How long does it take to reach B2 level from scratch?',
        a: 'Reaching B2 typically requires 500â€“600 hours of study. With our intensive programs, you can achieve B2 in 12â€“18 months. Individual progress varies based on dedication.',
      },
      {
        q: 'What is the DELF/DALF exam?',
        a: 'DELF (A1â€“B2) and DALF (C1â€“C2) are official French language certifications awarded by the French Ministry of Education, recognized worldwide by universities and employers.',
      },
      {
        q: 'Are online classes as effective as in-person?',
        a: 'Our online classes use interactive tools, virtual breakout rooms, and digital materials to replicate the classroom experience. Many students find them equally effective.',
      },
      {
        q: 'Do you offer one-on-one tutoring?',
        a: 'Yes, private one-on-one tutoring is available for students needing personalized attention, exam preparation, or a flexible schedule. Contact us for private lesson rates.',
      },
    ],
    testimonial: {
      name: 'Sarah Ahmed',
      role: 'DELF B2 Certificate Holder',
      content:
        "I went from complete beginner to passing DELF B2 in just 14 months. The native French teachers at Boss Academy are patient, encouraging, and incredibly skilled. Now I am applying to universities in France confidently.",
      initials: 'SA',
    },
    cta: {
      title: 'Start Speaking French Today',
      subtitle: 'Take our free placement test and find your perfect course',
      button: 'Take Free Level Test',
    },
  },

  'study-canada': {
    title: 'Study in Canada',
    tagline: "World-Class Education in the Heart of North America",
    description:
      'Canada ranks among the top destinations for international students â€” world-class universities, a post-graduation work permit of up to 3 years, and a clear pathway to permanent residency. Our team guides you from university selection through to visa approval and arrival.',
    icon: GraduationCap,
    gradientFrom: '#7c1d1d',
    gradientTo: '#dc2626',
    heroImage: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=900&h=650&fit=crop',
    stats: [
      { value: '200+', label: 'Students Placed' },
      { value: '40+', label: 'Partner Universities' },
      { value: '96%', label: 'Visa Success Rate' },
    ],
    features: [
      {
        icon: BookOpen,
        title: 'University Selection',
        desc: 'We match you with the best Canadian universities based on your program, budget, grades, and long-term goals.',
      },
      {
        icon: FileText,
        title: 'Application Support',
        desc: 'Full assistance with statements of purpose, reference letters, and submission management across all deadlines.',
      },
      {
        icon: Globe,
        title: 'Study Permit (SDS)',
        desc: 'Expert guidance through Canadian student permit applications â€” including the fast-track Student Direct Stream.',
      },
      {
        icon: Users,
        title: 'Post-Graduation Planning',
        desc: 'Guidance on the Post-Graduation Work Permit (PGWP) and Express Entry pathways to Canadian permanent residency.',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Profile Assessment',
        desc: 'We evaluate your academic profile, language scores, and goals to identify the best Canadian universities and programs.',
      },
      {
        step: '02',
        title: 'Application Submission',
        desc: 'We craft your application documents and submit to multiple institutions, managing all deadlines and follow-ups.',
      },
      {
        step: '03',
        title: 'Study Permit',
        desc: 'After receiving your acceptance letter, we prepare and submit your complete Canadian study permit application.',
      },
      {
        step: '04',
        title: 'Pre-Departure & Arrival',
        desc: 'Comprehensive briefing on Canadian life, banking, and healthcare â€” plus connections to our on-ground network.',
      },
    ],
    benefits: [
      'Post-Graduation Work Permit valid for up to 3 years',
      'Clear pathway to Canadian Permanent Residency via Express Entry',
      'Multicultural, safe, and welcoming environment',
      'Co-op programs for work experience during studies',
      'World top-100 universities at competitive fees',
      'Quality of life consistently ranked among the world\'s best',
    ],
    faq: [
      {
        q: 'What are the language requirements for Canadian universities?',
        a: 'Most Canadian universities accept IELTS (6.5+) or TOEFL (90+). Some also accept CELPIP. Requirements vary by program. We provide institution-specific guidance and connect you with our IELTS and CELPIP coaching.',
      },
      {
        q: 'What is the Student Direct Stream (SDS)?',
        a: 'SDS is a faster visa processing stream for students from select countries (including Nigeria and Ghana) who have an acceptance letter and IELTS 6.0+. Processing is typically within 20 days.',
      },
      {
        q: 'Can I work while studying in Canada?',
        a: 'Yes, most study permit holders can work up to 20 hours per week during academic sessions and full-time during scheduled breaks without a separate work permit.',
      },
      {
        q: 'How much do Canadian universities cost?',
        a: 'Undergraduate tuition for international students ranges from CAD $15,000 to $35,000 per year. Living costs average CAD $12,000â€“$18,000 per year depending on city.',
      },
    ],
    testimonial: {
      name: 'Tunde Adebayo',
      role: 'Studying Computer Science at University of Toronto',
      content:
        'Boss Academy made my Canadian dream happen. From choosing the right university to getting my study permit approved through SDS in 18 days â€” every step was seamless. I am now thriving in Toronto.',
      initials: 'TA',
    },
    cta: {
      title: 'Start Your Canadian Education Journey',
      subtitle: 'Book a free consultation with our Canadian admissions experts today',
      button: 'Book Free Consultation',
    },
  },

  'visit-uk': {
    title: 'Visit UK',
    tagline: 'Experience the Magic of Great Britain',
    description:
      'From the iconic streets of London to the dramatic Scottish Highlands and fairy-tale Welsh castles, discover the United Kingdom with our expertly crafted travel packages. Complete UK Standard Visitor Visa assistance, tailored itineraries, and 24/7 support included.',
    icon: MapPin,
    gradientFrom: '#9a1515',
    gradientTo: '#e8400c',
    heroImage: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=900&h=650&fit=crop',
    stats: [
      { value: '600+', label: 'Travelers Served' },
      { value: '4.8â˜…', label: 'Traveler Rating' },
      { value: '95%', label: 'Visa Success Rate' },
    ],
    features: [
      {
        icon: Shield,
        title: 'UK Visitor Visa',
        desc: 'Complete Standard Visitor Visa application support â€” document preparation, appointment booking, and guidance throughout.',
      },
      {
        icon: MapPin,
        title: 'Custom UK Itineraries',
        desc: 'Personalized routes from London city breaks to multi-city tours covering England, Scotland, Wales, and Northern Ireland.',
      },
      {
        icon: Award,
        title: 'Accommodation & Transfers',
        desc: 'Hand-picked hotels, B&Bs, and serviced apartments with airport transfers and ground transport all arranged.',
      },
      {
        icon: Users,
        title: 'Guided Cultural Tours',
        desc: 'Professional local guides who bring British history, culture, and landmarks to life at every destination.',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Trip Planning',
        desc: 'Share your UK wishlist and we design a comprehensive itinerary covering your must-see destinations within your budget.',
      },
      {
        step: '02',
        title: 'Visa Application',
        desc: 'We prepare your complete UK Standard Visitor Visa application package and guide you through the full process.',
      },
      {
        step: '03',
        title: 'Booking & Confirmation',
        desc: 'All flights, accommodations, transfers, and activities are booked and confirmed well before your travel date.',
      },
      {
        step: '04',
        title: 'Travel & Explore',
        desc: 'Depart with complete documentation and our 24/7 in-trip support throughout your British adventure.',
      },
    ],
    benefits: [
      'One visa covers England, Scotland, Wales & Northern Ireland',
      'Expert visa application with 95% success rate',
      'Flexible itineraries from 3 to 21 days',
      'Group and family discounts available',
      '24/7 emergency in-trip support',
      'Best-price guarantee on all packages',
    ],
    faq: [
      {
        q: 'How long does a UK visitor visa take?',
        a: 'Standard processing typically takes 3 weeks. Priority service reduces this to 5 business days. We advise on the best option for your timeline and ensure a complete, strong application.',
      },
      {
        q: 'What are the UK visa financial requirements?',
        a: 'You must demonstrate sufficient funds for your stay through consistent bank statements. We provide specific guidance based on your trip duration and profile.',
      },
      {
        q: 'Can I visit Ireland with a UK visa?',
        a: 'A UK Standard Visitor Visa does not automatically grant entry to the Republic of Ireland. We advise on your specific travel plans and any additional requirements.',
      },
      {
        q: 'What is the best time to visit the UK?',
        a: 'May to September offers the best weather. For fewer crowds and lower prices, Aprilâ€“June or Septemberâ€“October are ideal. December is magical for festive markets.',
      },
    ],
    testimonial: {
      name: 'Blessing Okonkwo',
      role: 'Visited London, Edinburgh & Manchester',
      content:
        'Boss Academy organized everything perfectly. My UK visa was approved in 12 days and the itinerary was incredible â€” Tower of London, Edinburgh Castle, and the Lake District. Every detail was handled professionally.',
      initials: 'BO',
    },
    cta: {
      title: 'Discover the Best of Great Britain',
      subtitle: 'Get your custom UK itinerary and visa support today',
      button: 'Plan My UK Trip',
    },
  },

  'visit-canada': {
    title: 'Visit Canada',
    tagline: 'Explore the Wild Beauty of the Great White North',
    description:
      'From the thundering Niagara Falls and cosmopolitan Toronto to the jaw-dropping Rocky Mountains and French-flavored Quebec City â€” Canada delivers extraordinary experiences for every type of traveler. Complete visa assistance and bespoke packages included.',
    icon: MapPin,
    gradientFrom: '#991b1b',
    gradientTo: '#f87171',
    heroImage: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=900&h=650&fit=crop',
    stats: [
      { value: '400+', label: 'Travelers Served' },
      { value: '4.7â˜…', label: 'Traveler Rating' },
      { value: '93%', label: 'Visa Success Rate' },
    ],
    features: [
      {
        icon: Shield,
        title: 'Canada Visitor Visa (TRV)',
        desc: 'Full support for Temporary Resident Visa applications â€” all documentation, forms, and guidance in one place.',
      },
      {
        icon: MapPin,
        title: 'Custom Itineraries',
        desc: 'Tailored routes across Canada\'s vast provinces â€” Pacific Coast BC to Atlantic Maritimes and everything between.',
      },
      {
        icon: Award,
        title: 'Flights & Hotels',
        desc: 'Best-value bookings on flights and accommodations across major Canadian cities and scenic destinations.',
      },
      {
        icon: Users,
        title: 'Local Expert Guides',
        desc: 'Connect with expert local guides for authentic experiences â€” from whale watching to Northern Lights tours.',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Destination Planning',
        desc: 'We help you identify your must-see Canadian destinations and design an efficient, memorable route.',
      },
      {
        step: '02',
        title: 'Visa Application',
        desc: 'We prepare your complete Canadian Temporary Resident Visa or eTA application with full document support.',
      },
      {
        step: '03',
        title: 'Booking & Logistics',
        desc: 'All travel elements â€” flights, transfers, hotels, and experiences â€” are researched, booked, and confirmed.',
      },
      {
        step: '04',
        title: 'Travel & Explore',
        desc: 'Travel with complete documentation and our 24/7 support throughout your Canadian adventure.',
      },
    ],
    benefits: [
      'One of the world\'s most beautiful and diverse destinations',
      'Canadian visitor visa valid for up to 10 years',
      'Safe, clean, and welcoming country for all travelers',
      'Stunning national parks and outdoor adventures',
      'Multicultural cities with vibrant food and arts scenes',
      'Family and group discounts on all packages',
    ],
    faq: [
      {
        q: 'Do I need a visa to visit Canada?',
        a: 'Most nationalities require a Temporary Resident Visa (TRV) or Electronic Travel Authorization (eTA). We determine which applies to your passport and handle the complete application.',
      },
      {
        q: 'How long can I stay in Canada as a tourist?',
        a: 'A standard tourist visit allows stays of up to 6 months. The border officer determines exact duration on entry. We advise on how to present your visit confidently.',
      },
      {
        q: 'When is the best time to visit Canada?',
        a: 'Summer (Juneâ€“August) is best for cities and national parks. Winter (Decemberâ€“February) is ideal for skiing and Northern Lights. Autumn (Septemberâ€“October) delivers stunning fall foliage.',
      },
      {
        q: 'What are the top places to visit in Canada?',
        a: 'Top destinations include Niagara Falls, Banff National Park, Vancouver, Toronto, Quebec City, Montreal, and Whistler. We build custom itineraries based on your interests.',
      },
    ],
    testimonial: {
      name: 'Ngozi Eze',
      role: 'Visited Niagara Falls, Toronto & Vancouver',
      content:
        'Canada exceeded every expectation. Boss Academy sorted my visa quickly, built a brilliant itinerary, and the guides were fantastic. Banff National Park was breathtaking â€” I am already planning my return.',
      initials: 'NE',
    },
    cta: {
      title: 'Explore the Magic of Canada',
      subtitle: 'Get your Canada travel package and visa support today',
      button: 'Plan My Canada Trip',
    },
  },

  'visit-china': {
    title: 'Visit China',
    tagline: 'Journey Through 5,000 Years of Extraordinary Civilization',
    description:
      'Walk the Great Wall at sunrise, marvel at the Terracotta Warriors, drift through the Li River, and feel the pulse of ultramodern Shanghai. China is a destination like no other â€” ancient wonders and futuristic skylines in a single journey. Complete visa assistance and expert bilingual guides included.',
    icon: Globe,
    gradientFrom: '#7c0000',
    gradientTo: '#dc2626',
    heroImage: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=900&h=650&fit=crop',
    stats: [
      { value: '300+', label: 'Travelers Served' },
      { value: '4.7â˜…', label: 'Traveler Rating' },
      { value: '94%', label: 'Visa Success Rate' },
    ],
    features: [
      {
        icon: Shield,
        title: 'China Tourist Visa (L)',
        desc: 'Complete L-visa application support â€” invitation letters, full itinerary documentation, and consulate submissions.',
      },
      {
        icon: MapPin,
        title: 'Expert-Designed Itineraries',
        desc: 'Custom routes covering Beijing, Shanghai, Xi\'an, Guilin, and Chengdu â€” tailored to your interests and pace.',
      },
      {
        icon: Award,
        title: 'Bilingual Guided Tours',
        desc: 'Qualified English-Mandarin guides who bring rich historical context and insider access at every iconic landmark.',
      },
      {
        icon: Globe,
        title: 'Seamless Logistics',
        desc: 'High-speed rail bookings, domestic flights, hotel selection, and all transfers handled for a worry-free journey.',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Itinerary Design',
        desc: 'Tell us your China must-haves and our experts design a comprehensive route balancing culture, history, and adventure.',
      },
      {
        step: '02',
        title: 'Visa Processing',
        desc: 'We prepare your Chinese L-visa application with all required supporting documents and submit on your behalf.',
      },
      {
        step: '03',
        title: 'Booking Confirmation',
        desc: 'All hotels, domestic transport (including high-speed rail), guided tours, and activities are confirmed in advance.',
      },
      {
        step: '04',
        title: 'Travel with Confidence',
        desc: 'Depart fully equipped with documentation, local contacts, and our 24/7 support throughout your China adventure.',
      },
    ],
    benefits: [
      'Walk the Great Wall â€” the ultimate bucket-list experience',
      'Perfect blend of ancient history and futuristic cities',
      'World\'s most efficient high-speed rail network',
      'Expert bilingual guides for authentic, deep experiences',
      'Asia\'s premier food destination with incredible variety',
      'Affordable luxury â€” premium experiences at great value',
    ],
    faq: [
      {
        q: 'Is China safe for tourists?',
        a: 'China is generally very safe for tourists with very low violent crime rates. Standard travel precautions apply. We provide full safety briefings and local emergency contacts for all travelers.',
      },
      {
        q: 'Do I need to arrange internet access before visiting China?',
        a: 'Yes â€” many western apps (Google, WhatsApp, Instagram) are blocked in mainland China. We advise on VPN options and alternative apps before your trip so you stay connected.',
      },
      {
        q: 'How long does a Chinese tourist visa take?',
        a: 'Standard processing takes 4â€“7 business days. Express services can reduce this to 2â€“3 days. We recommend applying at least 3 weeks before your intended travel date.',
      },
      {
        q: 'What is the best time to visit China?',
        a: 'Spring (Aprilâ€“May) and Autumn (Septemberâ€“October) offer the best weather across most of China. Summer can be hot and crowded; winter offers lower prices and fewer crowds.',
      },
    ],
    testimonial: {
      name: 'Emeka Obiechina',
      role: 'Visited Beijing, Shanghai & Xi\'an',
      content:
        'The China trip organized by Boss Academy was extraordinary. The Great Wall at sunrise was a moment I will never forget. Our guide had encyclopedic knowledge of every dynasty. Flawless from visa to departure.',
      initials: 'EO',
    },
    cta: {
      title: 'Experience the Wonder of China',
      subtitle: 'Get your custom China itinerary and visa support today',
      button: 'Plan My China Adventure',
    },
  },

  'visit-australia': {
    title: 'Visit Australia',
    tagline: 'Discover the Land Down Under in All Its Glory',
    description:
      'The Sydney Opera House, the Great Barrier Reef, Uluru at dusk, and the wild Daintree Rainforest â€” Australia packs more natural wonders and iconic experiences into one country than almost anywhere on earth. Expert visa assistance and premium travel packages included.',
    icon: Globe,
    gradientFrom: '#044e54',
    gradientTo: '#0ea5e9',
    heroImage: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=900&h=650&fit=crop',
    stats: [
      { value: '350+', label: 'Travelers Served' },
      { value: '4.8â˜…', label: 'Traveler Rating' },
      { value: '94%', label: 'Visa Success Rate' },
    ],
    features: [
      {
        icon: Shield,
        title: 'Australia Visitor Visa (600)',
        desc: 'Complete Subclass 600 Visitor Visa support â€” document preparation, online application, and biometric guidance.',
      },
      {
        icon: MapPin,
        title: 'Curated Itineraries',
        desc: 'Expert routes covering Sydney, Melbourne, Great Barrier Reef, Uluru, Gold Coast, and Western Australia.',
      },
      {
        icon: Award,
        title: 'Premium Experiences',
        desc: 'From sunrise at Uluru to Great Barrier Reef diving and Sydney Harbour Bridge climbs â€” iconic moments arranged.',
      },
      {
        icon: Globe,
        title: 'Full Logistics',
        desc: 'Domestic flights, campervan rentals, inter-city transfers â€” all arranged to match your itinerary.',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Dream Planning',
        desc: 'We understand your Australia bucket list and design a comprehensive itinerary across your most exciting destinations.',
      },
      {
        step: '02',
        title: 'Visa Application',
        desc: 'We prepare and submit your Australian Visitor Visa application with a full suite of supporting documents.',
      },
      {
        step: '03',
        title: 'Complete Booking',
        desc: 'Flights, domestic transfers, accommodations, and experiences are all booked and confirmed for a seamless trip.',
      },
      {
        step: '04',
        title: 'Depart & Explore',
        desc: 'Travel fully prepared with documentation, emergency contacts, and our round-the-clock in-trip support.',
      },
    ],
    benefits: [
      'Iconic natural wonders on every traveler\'s bucket list',
      'English-speaking country â€” easy for all travelers',
      'World-class beaches, wildlife, and food culture',
      'High safety standards and excellent infrastructure',
      'Unique wildlife found nowhere else on earth',
      'Family-friendly destinations with activities for all ages',
    ],
    faq: [
      {
        q: 'How long does an Australian tourist visa take?',
        a: 'eVisitor applications (eligible nationalities) are often processed within 24â€“72 hours. Standard Visitor Visa (600) applications typically take 20â€“60 days. We assess the best option for your nationality.',
      },
      {
        q: 'What is the best time to visit Australia?',
        a: 'Australia is a year-round destination. Septemberâ€“November is ideal for Sydney and Melbourne. Juneâ€“August is best for the Great Barrier Reef and tropical north. Uluru is best visited Marchâ€“May or Augustâ€“October.',
      },
      {
        q: 'Can I see kangaroos and koalas in the wild?',
        a: 'Absolutely! We include wildlife encounters in our itineraries â€” kangaroos in the wild at Kangaroo Island and koalas at wildlife sanctuaries in Queensland.',
      },
      {
        q: 'Is Australia expensive to travel in?',
        a: 'Australia is a mid-to-high cost destination but we offer packages across all budgets â€” from backpacker-friendly to luxury. We optimize every itinerary for the best value at your level.',
      },
    ],
    testimonial: {
      name: 'Adaeze Okafor',
      role: 'Visited Sydney, Great Barrier Reef & Uluru',
      content:
        'Australia was the trip of my lifetime. Snorkeling at the Great Barrier Reef, watching the sunrise paint Uluru red, exploring Sydney Harbour â€” and my visa was approved in 3 days. Boss Academy delivered on every promise.',
      initials: 'AO',
    },
    cta: {
      title: 'Your Australia Adventure Awaits',
      subtitle: 'Get your tailored Australia package and visa assistance today',
      button: 'Plan My Australia Trip',
    },
  },

  'visit-kenya': {
    title: 'Visit Kenya',
    tagline: 'Experience the Heart of Africa on Safari',
    description:
      'Kenya is the ultimate African safari destination â€” home to the Great Migration in the Maasai Mara, snow-capped Mount Kenya, pristine Indian Ocean beaches at Diani, and the vibrant, modern capital of Nairobi. Discover East Africa\'s crown jewel with our expertly curated packages.',
    icon: Palmtree,
    gradientFrom: '#14532d',
    gradientTo: '#16a34a',
    heroImage: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=900&h=650&fit=crop',
    stats: [
      { value: '250+', label: 'Travelers Served' },
      { value: '4.9â˜…', label: 'Traveler Rating' },
      { value: '$1,199', label: 'Safari From' },
    ],
    features: [
      {
        icon: Globe,
        title: 'Maasai Mara Safari',
        desc: 'Expert-guided game drives in the Maasai Mara â€” Big Five sightings, the Great Migration, and golden savanna sunsets.',
      },
      {
        icon: MapPin,
        title: 'Coastal Escapes',
        desc: 'Pristine beaches of Diani, Malindi, and Watamu on Kenya\'s Indian Ocean coast â€” perfect for relaxation and water sports.',
      },
      {
        icon: Award,
        title: 'Nairobi City Tours',
        desc: 'Explore Kenya\'s dynamic capital â€” the Giraffe Centre, David Sheldrick Wildlife Trust, and vibrant markets.',
      },
      {
        icon: Users,
        title: 'Cultural Experiences',
        desc: 'Authentic Maasai village visits, traditional cooking experiences, and community immersion programs.',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Safari Planning',
        desc: 'We understand your Africa dreams and design a Kenya itinerary combining wildlife, culture, and beach relaxation.',
      },
      {
        step: '02',
        title: 'Visa & Documentation',
        desc: 'We assist with Kenya\'s eVisa application and provide complete health and travel documentation guidance.',
      },
      {
        step: '03',
        title: 'Lodges & Bookings',
        desc: 'We book your safari lodges, bush camps, and coastal resorts â€” from mid-range to luxury options.',
      },
      {
        step: '04',
        title: 'Safari & Explore',
        desc: 'Arrive to a warm welcome from our Nairobi team and begin your unforgettable Kenya adventure.',
      },
    ],
    benefits: [
      'Witness the Great Migration â€” a natural wonder of the world',
      'Kenya eVisa available online for most nationalities',
      'Safari, beach, and city in one incredible itinerary',
      'One of Africa\'s best-value safari destinations',
      'Expert local guides with deep wildlife knowledge',
      'Malaria prophylaxis and health guidance provided',
    ],
    faq: [
      {
        q: 'When is the best time to see the Great Migration?',
        a: 'The Great Migration is present in Kenya\'s Maasai Mara from July to October, with dramatic river crossings typically occurring August to September.',
      },
      {
        q: 'Is Kenya safe for tourists?',
        a: 'The main tourist areas â€” Maasai Mara, Nairobi, and the coast â€” are generally safe with appropriate precautions. We provide comprehensive safety briefings and use reputable operators throughout.',
      },
      {
        q: 'Do I need vaccinations to visit Kenya?',
        a: 'Yellow fever vaccination is required if coming from a yellow fever country. Malaria prophylaxis is strongly recommended. We provide a complete health checklist before your trip.',
      },
      {
        q: 'What is included in your safari packages?',
        a: 'Our safari packages include accommodation, game drives, park fees, and most meals. International flights are quoted separately unless requested as an all-inclusive package.',
      },
    ],
    testimonial: {
      name: 'Chukwuemeka Nwachukwu',
      role: 'Maasai Mara Safari & Diani Beach',
      content:
        'Kenya was the Africa trip I always dreamed of. Boss Academy arranged an incredible safari and then a beautiful beach stay in Diani. Seeing a lion pride at dusk over the Mara will stay with me forever.',
      initials: 'CN',
    },
    cta: {
      title: 'Experience the Wild Heart of Africa',
      subtitle: 'Book your Kenya safari and travel package today',
      button: 'Book My Kenya Safari',
    },
  },

  'celpip-tutorial': {
    title: 'CELPIP Tutorial',
    tagline: 'Hit Your Target CLB Score â€” Expert CELPIP Coaching',
    description:
      'The Canadian English Language Proficiency Index Program (CELPIP) is required for Canadian immigration and citizenship applications. Our specialized coaches deliver targeted preparation across Listening, Reading, Writing, and Speaking â€” so you walk into the test ready to perform.',
    icon: BookOpen,
    gradientFrom: '#9a1515',
    gradientTo: '#e8400c',
    heroImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=900&h=650&fit=crop',
    stats: [
      { value: '400+', label: 'Students Coached' },
      { value: '93%', label: 'Target Score Rate' },
      { value: 'CLB 7â€“10', label: 'Results Achieved' },
    ],
    features: [
      {
        icon: BookOpen,
        title: 'All 4 Components',
        desc: 'Targeted coaching for Listening, Reading, Writing, and Speaking â€” the complete CELPIP-General test covered in full.',
      },
      {
        icon: Award,
        title: 'Certified Coaches',
        desc: 'Coaches with deep expertise in CELPIP scoring criteria, test format, task types, and proven strategies.',
      },
      {
        icon: Globe,
        title: 'Full Mock Tests',
        desc: 'Full-length timed practice tests under real exam conditions with detailed performance band analysis.',
      },
      {
        icon: CheckCircle2,
        title: 'Personalized Feedback',
        desc: 'Individualized feedback on every speaking and writing response â€” targeting the exact weaknesses holding you back.',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Diagnostic Assessment',
        desc: 'Take a free diagnostic test to determine your current CELPIP level and identify which components need the most work.',
      },
      {
        step: '02',
        title: 'Personalized Study Plan',
        desc: 'We create a targeted study plan matched to your weaknesses, your required CLB score, and your available preparation time.',
      },
      {
        step: '03',
        title: 'Intensive Coaching',
        desc: 'Attend coaching sessions (online or in-person), complete practice tests, and review detailed written feedback.',
      },
      {
        step: '04',
        title: 'Test Ready',
        desc: 'Sit a final full-length mock test, review your readiness report, and walk into exam day with real confidence.',
      },
    ],
    benefits: [
      'Only English test accepted for both IRCC immigration and Canadian citizenship',
      'Fully computer-based â€” no speaking to an examiner',
      'North American English accents â€” natural for everyday speakers',
      'Same-day results available for CELPIP Online',
      'Flexible coaching schedule including evenings and weekends',
      'Score improvement guaranteed within the program period',
    ],
    faq: [
      {
        q: 'What CLB score do I need for Express Entry?',
        a: 'Most Express Entry profiles require CLB 7 minimum (equivalent to CELPIP 7 in each component). Higher scores significantly boost your CRS points and improve your chances of an invitation to apply.',
      },
      {
        q: 'How is CELPIP different from IELTS?',
        a: 'CELPIP is fully computer-based with speaking recorded to a computer (no human examiner). It uses everyday Canadian English and many test-takers find it feels more natural than IELTS.',
      },
      {
        q: 'How long does it take to improve my CELPIP score?',
        a: 'Most students see meaningful improvement within 4â€“8 weeks of focused coaching. Those needing larger score jumps (2+ CLB levels) typically need 2â€“3 months of preparation.',
      },
      {
        q: 'Can I retake CELPIP if I don\'t reach my target?',
        a: 'There is no limit on CELPIP retakes. We analyze your test report after each attempt and refine your preparation strategy to target the exact areas where points were lost.',
      },
    ],
    testimonial: {
      name: 'Olawale Adeyemi',
      role: 'Express Entry â€” CLB 9 Achieved',
      content:
        'I needed CLB 9 for Express Entry and had tried twice before without success. Boss Academy\'s CELPIP coaching was transformative â€” targeted strategies, real feedback, and confidence on test day. CLB 9, first try after coaching.',
      initials: 'OA',
    },
    cta: {
      title: 'Achieve Your Target CELPIP Score',
      subtitle: 'Start your coaching with a free diagnostic assessment today',
      button: 'Book Free Diagnostic',
    },
  },

  'chinese-language': {
    title: 'Chinese (Mandarin)',
    tagline: 'Master Mandarin â€” The Language of a Rising World',
    description:
      'Mandarin Chinese is spoken by over 1 billion people and is a powerful asset in international business, academic study, and travel. Our certified native Mandarin instructors guide you from complete beginner (HSK 1) to advanced proficiency (HSK 6) with cultural immersion woven into every lesson.',
    icon: Languages,
    gradientFrom: '#7c0000',
    gradientTo: '#dc2626',
    heroImage: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=900&h=650&fit=crop',
    stats: [
      { value: '300+', label: 'Students Trained' },
      { value: '88%', label: 'HSK Pass Rate' },
      { value: 'HSK 1â€“6', label: 'All Levels' },
    ],
    features: [
      {
        icon: BookOpen,
        title: 'All Levels (HSK 1â€“6)',
        desc: 'Structured courses from absolute beginner to business and academic Mandarin, following the official HSK framework.',
      },
      {
        icon: Award,
        title: 'HSK Exam Preparation',
        desc: 'Targeted preparation for the official HSK exam â€” the internationally recognized Chinese proficiency certification.',
      },
      {
        icon: Users,
        title: 'Native Mandarin Instructors',
        desc: 'All teachers are qualified native Mandarin speakers with formal teaching experience and cultural depth.',
      },
      {
        icon: Globe,
        title: 'Tone & Character Mastery',
        desc: 'Focused training on Mandarin\'s four tones and character recognition â€” the essential foundations of real fluency.',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Free Placement Test',
        desc: 'Take our free online placement assessment to determine your Mandarin level and get personalized course recommendations.',
      },
      {
        step: '02',
        title: 'Course Enrollment',
        desc: 'Enroll in your HSK level course. Choose from group classes, intensive programs, or private tuition to fit your goals.',
      },
      {
        step: '03',
        title: 'Weekly Sessions',
        desc: 'Attend structured weekly classes covering speaking, listening, reading, and character writing with native teachers.',
      },
      {
        step: '04',
        title: 'HSK Certification',
        desc: 'Prepare for and sit your HSK exam with coaching support â€” earning an internationally recognized certificate.',
      },
    ],
    benefits: [
      'Mandarin is spoken by 1 billion+ people worldwide',
      'Massive competitive advantage in international business',
      'HSK certificate recognized by Chinese and global universities',
      'Pathway to study in China with scholarship opportunities',
      'Small class sizes â€” maximum 12 students per group',
      'Cultural immersion including Chinese history and business etiquette',
    ],
    faq: [
      {
        q: 'Is Mandarin Chinese difficult to learn?',
        a: 'Mandarin has a reputation for difficulty due to tones and characters, but grammar is actually simpler than many European languages. With our structured, immersive approach, most students make rapid early progress.',
      },
      {
        q: 'How long does it take to reach conversational Mandarin?',
        a: 'Basic conversational ability (HSK 3) typically requires 200â€“300 hours of study. With our intensive programs, this is achievable in 6â€“9 months for dedicated students.',
      },
      {
        q: 'What is the HSK exam?',
        a: 'The HSK (Hanyu Shuiping Kaoshi) is the official international Chinese proficiency test with 6 levels. HSK certificates are required for Chinese university admission and recognized by employers worldwide.',
      },
      {
        q: 'Can learning Mandarin help me study in China?',
        a: 'Absolutely. Chinese universities require HSK 4 (undergraduate) or HSK 5 (postgraduate) for Chinese-taught programs. We combine Mandarin coaching with our Study in China guidance service.',
      },
    ],
    testimonial: {
      name: 'Chisom Okafor',
      role: 'HSK 4 Certificate Holder, Now at Beijing University',
      content:
        'I started with zero Mandarin and reached HSK 4 in 18 months with Boss Academy. The native teachers brought the language to life and the cultural lessons made it stick. I am now on a full scholarship in Beijing.',
      initials: 'CO',
    },
    cta: {
      title: 'Start Your Mandarin Journey Today',
      subtitle: 'Take our free placement test and discover your learning path',
      button: 'Take Free Level Test',
    },
  },

  'ielts': {
    title: 'IELTS Preparation',
    tagline: 'Achieve Your Target Band Score with Expert Coaching',
    description:
      'IELTS is the world\'s most widely accepted English language test â€” required for UK, Canadian, Australian, and New Zealand immigration, as well as thousands of universities worldwide. Our experienced coaches deliver comprehensive preparation for both Academic and General Training versions.',
    icon: BookOpen,
    gradientFrom: '#7f1d1d',
    gradientTo: '#ea580c',
    heroImage: 'https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=900&h=650&fit=crop',
    stats: [
      { value: '1,200+', label: 'Students Coached' },
      { value: '91%', label: 'Target Score Rate' },
      { value: '7.0+ Avg', label: 'Overall Band' },
    ],
    features: [
      {
        icon: BookOpen,
        title: 'Academic & General Training',
        desc: 'Specialized coaching for IELTS Academic (university admission) and General Training (migration and work).',
      },
      {
        icon: Award,
        title: 'All 4 Skills Covered',
        desc: 'Intensive coaching for Listening, Reading, Writing (Tasks 1 & 2), and Speaking â€” with detailed feedback on each.',
      },
      {
        icon: Globe,
        title: 'Full Mock Tests',
        desc: 'Regular timed practice tests under real exam conditions with detailed band score analysis and targeted strategies.',
      },
      {
        icon: CheckCircle2,
        title: 'Writing Feedback',
        desc: 'Detailed examiner-style feedback on every writing task â€” reports, graphs, letters, and Task 2 essays.',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Free Mock Test',
        desc: 'Sit a free full-length diagnostic IELTS mock test to identify your current band score and specific areas of weakness.',
      },
      {
        step: '02',
        title: 'Personalized Study Plan',
        desc: 'We create a targeted plan based on your current score, required band, and the time available before your exam.',
      },
      {
        step: '03',
        title: 'Intensive Coaching',
        desc: 'Attend coaching sessions with practice tests, writing feedback, speaking simulations, and strategy workshops.',
      },
      {
        step: '04',
        title: 'Exam Confidence',
        desc: 'Complete final mocks, receive your readiness report, and sit your IELTS with real confidence and preparation.',
      },
    ],
    benefits: [
      'IELTS accepted by 11,500+ organisations across 140+ countries',
      'Expert coaching for both Academic and General Training',
      'Coaches with 5+ years of dedicated IELTS teaching experience',
      'Small groups (max 10 students) for personalized attention',
      'Flexible schedules including weekends and evenings',
      'Score improvement guaranteed within the program period',
    ],
    faq: [
      {
        q: 'What IELTS score do I need for UK, Canada, or Australia?',
        a: 'UK universities typically require 6.0â€“7.0. Canada Express Entry needs CLB 7 (â‰ˆ IELTS 6.0). Australian skilled migration often requires 6.0. We advise on the exact requirement for your specific goal.',
      },
      {
        q: 'How many times can I take IELTS?',
        a: 'There is no limit on attempts. Many institutions accept your best score. We review your test report after each attempt and refine your strategy to target exactly where points were lost.',
      },
      {
        q: 'What is the difference between IELTS Academic and General Training?',
        a: 'Academic is for university admission and professional registration. General Training is for secondary school, work experience, and migration. Listening and Speaking are identical; Reading and Writing differ.',
      },
      {
        q: 'How long does IELTS preparation take?',
        a: 'A 0.5 band improvement typically needs 4â€“6 weeks. A 1.0 band improvement usually requires 8â€“12 weeks of focused preparation. Those starting from lower bands may need 3â€“6 months.',
      },
    ],
    testimonial: {
      name: 'Yetunde Adegoke',
      role: 'IELTS 7.5 â€” Now at Warwick University',
      content:
        'I needed a 7.0 for my UK university offer and was scoring 6.0. Boss Academy\'s IELTS coaching was exceptional â€” the writing feedback was worth the entire program on its own. I achieved 7.5 overall and exceeded my target in every component.',
      initials: 'YA',
    },
    cta: {
      title: 'Achieve Your Target IELTS Score',
      subtitle: 'Start with a free mock test and personalized study plan today',
      button: 'Book Free Mock Test',
    },
  },

  'travel-insurance': {
    title: 'Travel Insurance',
    tagline: 'Travel with Complete Confidence â€” Covered at Every Step',
    description:
      'The unexpected should never derail your travel or study plans. We source comprehensive travel insurance solutions covering medical emergencies, trip cancellations, lost baggage, visa rejections, and more â€” from leading insurers at the best available rates.',
    icon: Shield,
    gradientFrom: '#065f46',
    gradientTo: '#059669',
    heroImage: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=900&h=650&fit=crop',
    stats: [
      { value: '3,000+', label: 'Policies Issued' },
      { value: '24/7', label: 'Emergency Support' },
      { value: '100%', label: 'Claims Assisted' },
    ],
    features: [
      {
        icon: Shield,
        title: 'Medical Emergency Cover',
        desc: 'Comprehensive medical coverage including hospitalization, emergency evacuation, and repatriation â€” up to $5M cover.',
      },
      {
        icon: FileText,
        title: 'Trip Cancellation & Delay',
        desc: 'Protection against unexpected cancellations, delays, and curtailments due to illness, emergencies, or covered events.',
      },
      {
        icon: Award,
        title: 'Baggage & Personal Effects',
        desc: 'Cover for lost, stolen, or damaged luggage and personal belongings throughout your entire journey.',
      },
      {
        icon: CheckCircle2,
        title: 'Visa Rejection Cover',
        desc: 'Financial protection if your visa is rejected after purchasing non-refundable flights or accommodation.',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Coverage Assessment',
        desc: 'We assess your travel plans, destination, duration, and needs to identify the most suitable insurance options.',
      },
      {
        step: '02',
        title: 'Policy Comparison',
        desc: 'We compare policies from leading insurers to find you the best coverage at the most competitive premium.',
      },
      {
        step: '03',
        title: 'Policy Issuance',
        desc: 'Once you select your policy, we handle all documentation and issue your insurance certificate promptly.',
      },
      {
        step: '04',
        title: 'Claims Support',
        desc: 'If you ever need to claim, our dedicated team provides full assistance from documentation through to settlement.',
      },
    ],
    benefits: [
      'Medical emergency coverage up to $5 million',
      'Visa rejection protection available as an add-on',
      'Single trip and annual multi-trip policies available',
      'Student and study abroad specialist policies',
      '24/7 worldwide emergency assistance hotline',
      'Full claims assistance from our dedicated support team',
    ],
    faq: [
      {
        q: 'Is travel insurance mandatory for visa applications?',
        a: 'Travel insurance is mandatory for Schengen visas (minimum â‚¬30,000 medical cover required). It is also highly recommended for UK, US, Canada, and Australian applications. We ensure your policy meets embassy requirements.',
      },
      {
        q: 'Does travel insurance cover visa rejections?',
        a: 'Select policies include visa rejection cover â€” reimbursing non-refundable costs if your visa is rejected. We specifically source policies with this protection when you need it.',
      },
      {
        q: 'Can I get travel insurance with a pre-existing medical condition?',
        a: 'Yes. Many insurers cover declared pre-existing conditions, though premiums may be higher. We identify the best policy for your specific health situation and travel plans.',
      },
      {
        q: 'What is the difference between single-trip and annual multi-trip insurance?',
        a: 'Single-trip covers one specific journey. Annual multi-trip covers unlimited trips within a year (usually up to 31 days per trip). Frequent travelers typically save significantly with annual policies.',
      },
    ],
    testimonial: {
      name: 'Kemi Adesola',
      role: 'Covered on Her Europe Study Abroad Program',
      content:
        'I had a medical emergency in Germany during my semester abroad. Boss Academy\'s travel insurance covered everything â€” hospital bills, repatriation, even accommodation while I recovered. The 24/7 support line was a lifeline. Never travel uninsured.',
      initials: 'KA',
    },
    cta: {
      title: 'Travel Protected â€” Get Covered Today',
      subtitle: 'Get your travel insurance quote in minutes',
      button: 'Get Insurance Quote',
    },
  },
};

// â”€â”€ Inline FAQ with smooth height transition â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function FaqItem({ item, index }: { item: FaqItem; index: number }) {
  const [open, setOpen] = useState(false);
  const answerRef = useRef<HTMLDivElement>(null);
  return (
    <div className="border-b last:border-0" style={{ borderColor: 'rgba(13,17,23,0.08)' }}>
      <button
        id={`faq-q-${index}`}
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between py-6 text-left gap-6 group"
        aria-expanded={open}
      >
        <span
          className="text-base leading-snug transition-colors"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 600,
            color: open ? '#e8400c' : '#0D1117',
          }}
        >
          {item.q}
        </span>
        <span
          className="flex-shrink-0 mt-0.5 w-5 h-5 transition-transform duration-300"
          style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)', color: '#e8400c' }}
          aria-hidden
        >
          <svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" /></svg>
        </span>
      </button>
      <div
        ref={answerRef}
        style={{
          maxHeight: open ? `${answerRef.current?.scrollHeight ?? 400}px` : '0px',
          overflow: 'hidden',
          transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <p className="pb-6 leading-relaxed text-sm" style={{ color: '#6B6760', fontWeight: 300 }}>
          {item.a}
        </p>
      </div>
    </div>
  );
}

// â”€â”€ Scroll-fade-up hook â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function useFadeUp() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// â”€â”€ Count-up hook â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function useCountUp(target: string, duration = 1400) {
  const [display, setDisplay] = useState('0');
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const num = parseFloat(target.replace(/[^0-9.]/g, ''));
    if (isNaN(num)) { setDisplay(target); return; }
    const suffix = target.replace(/[0-9.]/g, '');
    let start: number | null = null;
    let raf: number;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        obs.disconnect();
        const step = (ts: number) => {
          if (!start) start = ts;
          const progress = Math.min((ts - start) / duration, 1);
          const val = Math.round(progress * num);
          setDisplay(`${val}${suffix}`);
          if (progress < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => { obs.disconnect(); cancelAnimationFrame(raf); };
  }, [target, duration]);
  return { ref, display };
}

// â”€â”€ Stat counter display â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function StatCount({ value, label }: { value: string; label: string }) {
  const { ref, display } = useCountUp(value);
  return (
    <div>
      <span
        ref={ref}
        className="block"
        style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '2.5rem', fontWeight: 800, color: '#FAF8F4', lineHeight: 1 }}
      >
        {display}
      </span>
      <span className="block text-xs uppercase tracking-widest mt-1" style={{ color: 'rgba(250,248,244,0.55)' }}>
        {label}
      </span>
    </div>
  );
}

export default function ServicePage({ slug: propSlug }: { slug?: string }) {
  const params = useParams<{ slug: string }>();
  const slug = propSlug ?? params.slug;
  const service = slug ? allServices[slug] : null;

  // section refs for fade-up
  const heroRef   = useFadeUp();
  const featRef   = useFadeUp();
  const procRef   = useFadeUp();
  const whyRef    = useFadeUp();
  const faqRef    = useFadeUp();
  const otherRef  = useFadeUp();

  // accordion state for features
  const [openFeature, setOpenFeature] = useState<number | null>(null);

  // Study in Europe application modal
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const isStudyEurope = slug === 'study-europe';

  if (!service) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center" style={{ background: '#FAF8F4' }}>
        <div className="text-center px-4">
          <p className="text-2xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#0D1117' }}>
            Service Not Found
          </p>
          <Link to="/study-europe" className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: '#e8400c' }}>
            Browse Services <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const Icon = service.icon;
  const WHATSAPP = 'https://wa.me/2347059461257';

  // Watermark = the service title repeated for atmospheric background texture
  const watermarkText = `${service.title}  `;

  return (
    <div className="w-full overflow-x-hidden" style={{ background: '#FAF8F4' }}>

      {/* ══════════════════ HERO ══════════════════ */}
      <style>{`
        @keyframes drift {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-animate { animation: fadeUp 0.6s ease forwards; }
        .hero-animate-delay { animation: fadeUp 0.6s 0.18s ease forwards; opacity: 0; }
        .hero-animate-delay2 { animation: fadeUp 0.6s 0.34s ease forwards; opacity: 0; }
        .cta-primary {
          background: #FAF8F4; color: #e8400c;
          border: 2px solid #FAF8F4;
          transition: background 0.2s, color 0.2s;
        }
        .cta-primary:hover { background: transparent; color: #FAF8F4; }
        .cta-ghost {
          background: transparent; color: rgba(250,248,244,0.85);
          border: 2px solid rgba(250,248,244,0.35);
          transition: background 0.2s, color 0.2s, border-color 0.2s;
        }
        .cta-ghost:hover { background: rgba(250,248,244,0.1); border-color: rgba(250,248,244,0.7); color: #FAF8F4; }
        .cta-red {
          background: #e8400c; color: #FAF8F4;
          border: 2px solid #e8400c;
          transition: background 0.2s, color 0.2s;
        }
        .cta-red:hover { background: transparent; color: #e8400c; }
        .cta-red-outline {
          background: transparent; color: #e8400c;
          border: 2px solid #e8400c;
          transition: background 0.2s, color 0.2s;
        }
        .cta-red-outline:hover { background: #e8400c; color: #FAF8F4; }
      `}</style>
      <section
        className="relative overflow-hidden"
        style={{
          minHeight: '92vh',
          paddingTop: '140px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          paddingBottom: '80px',
        }}
      >
        {/* Full-bleed hero image */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${service.heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            backgroundRepeat: 'no-repeat',
          }}
        />

        {/* Dark gradient overlay for legibility */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              to bottom,
              ${service.gradientFrom}cc 0%,
              ${service.gradientFrom}99 30%,
              rgba(13,17,23,0.75) 65%,
              rgba(13,17,23,0.92) 100%
            )`,
          }}
        />

        {/* Watermark scrolling strip — over the photo */}
        <div
          aria-hidden
          className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none select-none"
          style={{ height: '100%' }}
        >
          <div
            style={{
              position: 'absolute',
              top: '18%',
              whiteSpace: 'nowrap',
              fontSize: '9rem',
              fontWeight: 900,
              letterSpacing: '0.15em',
              color: 'rgba(250,248,244,0.04)',
              fontFamily: "'Playfair Display', Georgia, serif",
              animation: 'drift 60s linear infinite',
              willChange: 'transform',
            }}
          >
            {watermarkText.repeat(4)}
          </div>
          <div
            style={{
              position: 'absolute',
              top: '55%',
              whiteSpace: 'nowrap',
              fontSize: '6rem',
              fontWeight: 900,
              letterSpacing: '0.2em',
              color: 'rgba(250,248,244,0.02)',
              fontFamily: "'Playfair Display', Georgia, serif",
              animation: 'drift 90s linear infinite reverse',
              willChange: 'transform',
            }}
          >
            {watermarkText.repeat(4)}
          </div>
        </div>

        {/* CSS animation */}
        <style>{`
          @keyframes drift {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(28px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .hero-animate { animation: fadeUp 0.6s ease forwards; }
          .hero-animate-delay { animation: fadeUp 0.6s 0.18s ease forwards; opacity: 0; }
          .hero-animate-delay2 { animation: fadeUp 0.6s 0.34s ease forwards; opacity: 0; }
          /* Navbar red underline slide-in */
          .nav-link { position: relative; }
          .nav-link::after {
            content: ''; position: absolute; bottom: -2px; left: 0;
            width: 0; height: 2px; background: #e8400c;
            transition: width 0.25s ease;
          }
          .nav-link:hover::after { width: 100%; }
          /* Sharp CTA hover invert */
          .cta-primary {
            background: #FAF8F4; color: #e8400c;
            border: 2px solid #FAF8F4;
            transition: background 0.2s, color 0.2s;
          }
          .cta-primary:hover { background: transparent; color: #FAF8F4; }
          .cta-ghost {
            background: transparent; color: rgba(250,248,244,0.85);
            border: 2px solid rgba(250,248,244,0.35);
            transition: background 0.2s, color 0.2s, border-color 0.2s;
          }
          .cta-ghost:hover { background: rgba(250,248,244,0.1); border-color: rgba(250,248,244,0.7); color: #FAF8F4; }
          .cta-red {
            background: #e8400c; color: #FAF8F4;
            border: 2px solid #e8400c;
            transition: background 0.2s, color 0.2s;
          }
          .cta-red:hover { background: transparent; color: #e8400c; }
          .cta-red-outline {
            background: transparent; color: #e8400c;
            border: 2px solid #e8400c;
            transition: background 0.2s, color 0.2s;
          }
          .cta-red-outline:hover { background: #e8400c; color: #FAF8F4; }
        `}</style>

        {/* Hero content */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 w-full">

          {/* Service title label — clearly visible */}
          <div className="hero-animate mb-5 flex items-center gap-3">
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
              style={{
                background: '#e8400c',
                color: '#FAF8F4',
                borderRadius: '2px',
              }}
            >
              <Icon className="w-3.5 h-3.5" />
              {service.title}
            </span>
          </div>

          {/* Tagline headline */}
          <h1
            className="hero-animate-delay mb-5"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(2.6rem, 6vw, 5rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              color: '#FAF8F4',
              maxWidth: '780px',
            }}
          >
            {service.tagline}
          </h1>

          {/* Sub-line */}
          <p
            className="hero-animate-delay2 mb-10"
            style={{ color: 'rgba(250,248,244,0.75)', maxWidth: '540px', fontSize: '1.05rem', lineHeight: 1.65, fontWeight: 300 }}
          >
            {service.description.split('.')[0]}.
          </p>

          {/* CTA row */}
          <div className="hero-animate-delay2 flex flex-wrap gap-3 mb-20">
            {isStudyEurope ? (
              <button
                onClick={() => setShowApplicationModal(true)}
                className="cta-primary inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold"
                style={{ borderRadius: '4px' }}
              >
                {service.cta.button} <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-primary inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold"
                style={{ borderRadius: '4px' }}
              >
                {service.cta.button} <ArrowRight className="w-4 h-4" />
              </a>
            )}
            <a
              href="#how-it-works"
              className="cta-ghost inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold"
              style={{ borderRadius: '4px' }}
            >
              How It Works
            </a>
          </div>

          {/* Floating stats â€” bottom right typographic accents */}
          <div
            className="flex flex-wrap gap-10"
            style={{ borderTop: '1px solid rgba(250,248,244,0.15)', paddingTop: '28px' }}
          >
            {service.stats.map((stat, i) => (
              <StatCount key={i} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• WHAT WE OFFER (accordion) â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section className="px-6 sm:px-8" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
        <div className="max-w-7xl mx-auto">
          <div ref={featRef} className="grid lg:grid-cols-[280px_1fr] gap-16 items-start">

            {/* Left: category title */}
            <div className="lg:sticky" style={{ top: '120px' }}>
              <p className="text-xs uppercase tracking-widest mb-4" style={{ color: '#e8400c' }}>What We Offer</p>
              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(2rem, 3vw, 2.75rem)',
                  fontWeight: 800,
                  color: '#0D1117',
                  lineHeight: 1.15,
                }}
              >
                {service.title} Services
              </h2>
              <div className="mt-6 w-8 h-px" style={{ background: '#e8400c' }} />
            </div>

            {/* Right: accordion list */}
            <div className="divide-y" style={{ borderColor: 'rgba(13,17,23,0.08)' }}>
              {service.features.map((feature, i) => (
                <div key={i} className="py-6">
                  <button
                    className="w-full flex items-center justify-between gap-6 text-left group"
                    onClick={() => setOpenFeature(openFeature === i ? null : i)}
                    aria-expanded={openFeature === i}
                    id={`feat-${i}`}
                  >
                    <div className="flex items-center gap-5">
                      <span
                        className="text-xs tabular-nums"
                        style={{ color: '#e8400c', fontWeight: 600, minWidth: '24px' }}
                      >
                        0{i + 1}
                      </span>
                      <span
                        className="transition-colors"
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontSize: '1.15rem',
                          fontWeight: 700,
                          color: openFeature === i ? '#e8400c' : '#0D1117',
                        }}
                      >
                        {feature.title}
                      </span>
                    </div>
                    <feature.icon
                      className="w-5 h-5 flex-shrink-0 transition-colors"
                      style={{ color: openFeature === i ? '#e8400c' : '#6B6760' }}
                    />
                  </button>
                  <div
                    style={{
                      maxHeight: openFeature === i ? '200px' : '0',
                      overflow: 'hidden',
                      transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1)',
                    }}
                  >
                    <p className="pt-4 pl-9 text-sm leading-relaxed" style={{ color: '#6B6760', fontWeight: 300 }}>
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• HOW IT WORKS â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section
        id="how-it-works"
        style={{ paddingTop: '120px', paddingBottom: '120px', background: '#F2EFE9' }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div ref={procRef}>
            <p className="text-xs uppercase tracking-widest mb-4" style={{ color: '#e8400c' }}>The Process</p>
            <h2
              className="mb-16"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(2rem, 3vw, 2.75rem)',
                fontWeight: 800,
                color: '#0D1117',
                lineHeight: 1.15,
              }}
            >
              How It Works
            </h2>
          </div>

          {/* Horizontal timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 relative">
            {/* Connecting line */}
            <div
              className="hidden lg:block absolute"
              style={{
                top: '2.2rem',
                left: '12.5%',
                width: '75%',
                height: '1px',
                background: 'rgba(13,17,23,0.12)',
              }}
            />
            {service.process.map((step, i) => (
              <div key={i} className="relative px-4 pb-8 lg:pb-0">
                {/* Large ghost number */}
                <div
                  aria-hidden
                  className="absolute -top-4 left-2"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: '7rem',
                    fontWeight: 900,
                    lineHeight: 1,
                    color: 'rgba(232,64,12,0.06)',
                    userSelect: 'none',
                  }}
                >
                  {step.step}
                </div>

                {/* Dot on timeline */}
                <div
                  className="relative z-10 w-4 h-4 rounded-full mb-6 border-2"
                  style={{ borderColor: '#e8400c', background: i === 0 ? '#e8400c' : '#F2EFE9' }}
                />

                <p
                  className="text-xs uppercase tracking-widest mb-2"
                  style={{ color: '#e8400c', fontWeight: 600 }}
                >
                  Step {step.step}
                </p>
                <h3
                  className="mb-3"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: '#0D1117',
                  }}
                >
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed pr-4" style={{ color: '#6B6760', fontWeight: 300 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• WHY CHOOSE US + TESTIMONIAL â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section style={{ paddingTop: '120px', paddingBottom: '120px' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div ref={whyRef} className="grid lg:grid-cols-2 gap-20 items-start">

            {/* Benefits â€” 2-col typographic list */}
            <div>
              <p className="text-xs uppercase tracking-widest mb-4" style={{ color: '#e8400c' }}>Why Choose Us</p>
              <h2
                className="mb-10"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(1.8rem, 2.8vw, 2.5rem)',
                  fontWeight: 800,
                  color: '#0D1117',
                  lineHeight: 1.15,
                }}
              >
                Why Boss Academy for {service.title}?
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
                {service.benefits.map((benefit, i) => (
                  <div
                    key={i}
                    className="py-4 pr-6"
                    style={{
                      borderLeft: '2px solid #e8400c',
                      paddingLeft: '16px',
                      marginBottom: '8px',
                      marginRight: i % 2 === 0 ? '24px' : '0',
                    }}
                  >
                    <p className="text-sm leading-snug" style={{ color: '#0D1117', fontWeight: 400 }}>{benefit}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                {isStudyEurope ? (
                  <button
                    onClick={() => setShowApplicationModal(true)}
                    className="cta-red inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold"
                    style={{ borderRadius: '4px' }}
                  >
                    {service.cta.button} <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <a
                    href={WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-red inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold"
                    style={{ borderRadius: '4px' }}
                  >
                    {service.cta.button} <ArrowRight className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Large pull-quote testimonial */}
            <div>
              <blockquote>
                <p
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                    fontWeight: 700,
                    fontStyle: 'italic',
                    color: '#0D1117',
                    lineHeight: 1.4,
                    marginBottom: '32px',
                  }}
                >
                  &ldquo;{service.testimonial.content}&rdquo;
                </p>
                <div style={{ borderTop: '1px solid rgba(232,64,12,0.3)', paddingTop: '20px' }}>
                  <p className="text-sm font-semibold" style={{ color: '#0D1117' }}>
                    {service.testimonial.name}
                  </p>
                  <p className="text-xs mt-1" style={{ color: '#6B6760', fontWeight: 300 }}>
                    {service.testimonial.role}
                  </p>
                </div>
              </blockquote>
            </div>

          </div>
        </div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• FAQ â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section style={{ paddingTop: '120px', paddingBottom: '120px', background: '#F2EFE9' }}>
        <div className="max-w-3xl mx-auto px-6 sm:px-8">
          <div ref={faqRef}>
            <p className="text-xs uppercase tracking-widest mb-4" style={{ color: '#e8400c' }}>Questions</p>
            <h2
              className="mb-12"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                fontWeight: 800,
                color: '#0D1117',
                lineHeight: 1.15,
              }}
            >
              Frequently Asked
            </h2>
          </div>
          <div>
            {service.faq.map((item, i) => (
              <FaqItem key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• CTA BAND â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section
        style={{
          background: '#e8400c',
          paddingTop: '100px',
          paddingBottom: '100px',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">

            {/* Left: big headline */}
            <div style={{ maxWidth: '680px' }}>
              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(2.8rem, 6vw, 5rem)',
                  fontWeight: 900,
                  color: '#FAF8F4',
                  lineHeight: 1.0,
                }}
              >
                {service.cta.title}
              </h2>
              <p className="mt-5 text-base" style={{ color: 'rgba(250,248,244,0.72)', fontWeight: 300, maxWidth: '440px', lineHeight: 1.65 }}>
                {service.cta.subtitle}
              </p>
            </div>

            {/* Right: buttons */}
            <div className="flex flex-col sm:flex-row gap-3 lg:flex-shrink-0">
              {isStudyEurope ? (
                <button
                  onClick={() => setShowApplicationModal(true)}
                  className="cta-primary inline-flex items-center gap-2 px-7 py-4 text-sm font-semibold"
                  style={{ borderRadius: '4px' }}
                >
                  {service.cta.button} <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-primary inline-flex items-center gap-2 px-7 py-4 text-sm font-semibold"
                  style={{ borderRadius: '4px' }}
                >
                  {service.cta.button} <ArrowRight className="w-4 h-4" />
                </a>
              )}
              <a
                href="mailto:info@bossacademy.com"
                className="cta-ghost inline-flex items-center gap-2 px-7 py-4 text-sm font-semibold"
                style={{ borderRadius: '4px' }}
              >
                Email Us
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• OTHER SERVICES â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div ref={otherRef} className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs uppercase tracking-widest mb-2" style={{ color: '#e8400c' }}>Continue Exploring</p>
              <h3
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: '1.6rem',
                  fontWeight: 800,
                  color: '#0D1117',
                }}
              >
                Other Services
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 divide-y sm:divide-y-0 sm:divide-x" style={{ borderColor: 'rgba(13,17,23,0.1)', border: '1px solid rgba(13,17,23,0.1)' }}>
            {Object.entries(allServices)
              .filter(([key]) => key !== slug)
              .slice(0, 3)
              .map(([key, s]) => {
                const SIcon = s.icon;
                return (
                  <Link
                    key={key}
                    to={`/${key}`}
                    className="group flex flex-col justify-between p-6 sm:p-8 transition-colors"
                    style={{ minHeight: '180px' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#F2EFE9')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div className="flex items-start justify-between mb-6">
                      <SIcon className="w-5 h-5" style={{ color: '#e8400c' }} />
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#e8400c' }} />
                    </div>
                    <div>
                      <p
                        className="font-bold mb-1 group-hover:text-[#e8400c] transition-colors"
                        style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1rem', color: '#0D1117' }}
                      >
                        {s.title}
                      </p>
                      <p className="text-xs leading-snug" style={{ color: '#6B6760', fontWeight: 300 }}>
                        {s.tagline}
                      </p>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </section>

      {/* Study in Europe Application Modal */}
      {isStudyEurope && (
        <StudyEuropeApplicationModal
          open={showApplicationModal}
          onOpenChange={setShowApplicationModal}
        />
      )}

    </div>
  );
}

