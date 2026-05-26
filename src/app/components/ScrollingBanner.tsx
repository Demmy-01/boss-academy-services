import { GraduationCap, CheckCircle } from 'lucide-react';

const universities = [
  // France
  { country: 'France', flag: '🇫🇷', name: 'Advancia', fee: '€8,000' },
  { country: 'France', flag: '🇫🇷', name: 'AgroParisTech', fee: '€353' },
  { country: 'France', flag: '🇫🇷', name: 'AIX', fee: '€4,900' },
  { country: 'France', flag: '🇫🇷', name: 'Albert School', fee: '€16,900' },
  { country: 'France', flag: '🇫🇷', name: 'American Graduate School', fee: '€19,119' },
  // Lithuania
  { country: 'Lithuania', flag: '🇱🇹', name: 'Aleksandras Stulginskis University', fee: '€4,295' },
  { country: 'Lithuania', flag: '🇱🇹', name: 'Alytaus Kolegija', fee: '€2,950' },
  // Switzerland
  { country: 'Switzerland', flag: '🇨🇭', name: 'American Graduate School of Business', fee: 'CHF 29,000' },
  { country: 'Switzerland', flag: '🇨🇭', name: 'American Institute of Applied Sciences', fee: 'CHF 22,000' },
  { country: 'Switzerland', flag: '🇨🇭', name: 'Berner Fachhochschule', fee: 'CHF 5,100' },
  { country: 'Switzerland', flag: '🇨🇭', name: 'Business & Hotel Management School', fee: 'CHF 29,600' },
  { country: 'Switzerland', flag: '🇨🇭', name: 'Cesar Ritz College', fee: 'CHF 22,000' },
  { country: 'Switzerland', flag: '🇨🇭', name: 'CREA-INSEEC Geneva', fee: 'CHF 15,800' },
  { country: 'Switzerland', flag: '🇨🇭', name: 'Albert School', fee: 'CHF 22,900' },
  // Denmark
  { country: 'Denmark', flag: '🇩🇰', name: 'Aarhus University', fee: '€10,000' },
  // Austria
  { country: 'Austria', flag: '🇦🇹', name: 'TU Wien', fee: '€2,000' },
  { country: 'Austria', flag: '🇦🇹', name: 'TU Graz', fee: '€2,000' },
  { country: 'Austria', flag: '🇦🇹', name: 'University of Innsbruck', fee: '€2,000' },
];

// Duplicate for seamless infinite scroll
const loopedItems = [...universities, ...universities];

export function ScrollingBanner() {
  return (
    <div className="bg-white border-b border-border shadow-sm">
      <style>{`
        @keyframes boss-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .boss-marquee-track {
          display: flex;
          width: max-content;
          animation: boss-marquee 55s linear infinite;
          will-change: transform;
        }
        .boss-marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Title strip */}
      <div className="flex items-center justify-center gap-2 py-2 bg-[#2d4a9e]">
        <CheckCircle className="w-3.5 h-3.5 text-white/80" />
        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/90">
          Affordable Tuition &amp; Flexible Payment Plans Available
        </span>
        <CheckCircle className="w-3.5 h-3.5 text-white/80" />
      </div>

      {/* Scrolling cards */}
      <div className="overflow-hidden">
        <div className="boss-marquee-track">
          {loopedItems.map((uni, i) => (
            <div
              key={i}
              className="flex flex-col justify-between gap-1.5 px-5 py-3 border-r border-border/60 min-w-[210px] cursor-default select-none"
            >
              {/* Name + icon */}
              <div className="flex items-start justify-between gap-2">
                <span className="font-bold text-[13px] text-foreground leading-snug">
                  {uni.name}
                </span>
                <GraduationCap className="w-4 h-4 text-[#2d4a9e] flex-shrink-0 mt-0.5" />
              </div>

              {/* Fee */}
              <div className="flex items-baseline gap-1">
                <span className="text-[13px] font-bold text-[#2d4a9e]">{uni.fee}</span>
                <span className="text-[11px] text-muted-foreground">Tuition</span>
              </div>

              {/* Country badge */}
              <div className="flex items-center gap-1.5">
                <span className="text-sm leading-none">{uni.flag}</span>
                <span className="text-[10px] font-semibold text-[#2d4a9e] bg-[#2d4a9e]/8 px-2 py-0.5 rounded-full">
                  {uni.country}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
