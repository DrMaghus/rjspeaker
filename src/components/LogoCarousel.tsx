import { useState } from 'react';

interface Logo {
  name: string;
  src: string;
  fullName: string;
}

const collaborators: Logo[] = [
  { name: 'Adobe', src: '/logos/adobe.png', fullName: 'Adobe' },
  { name: 'ContentSquare', src: '/logos/contentsquare.png', fullName: 'ContentSquare' },
  { name: 'Dynamic Yield', src: '/logos/dynamicyield.png', fullName: 'Dynamic Yield' },
  { name: 'Google', src: '/logos/google.webp', fullName: 'Google' },
  { name: 'Insider', src: '/logos/insider.png', fullName: 'Insider' },
  { name: 'IEBS', src: '/logos/iebs.webp', fullName: 'IEBS Business School' },
  { name: 'OBS', src: '/logos/obs.png', fullName: 'OBS Business School' },
  { name: 'PUC', src: '/logos/puc.png', fullName: 'Pontificia Universidad Católica de Chile' },
  { name: 'Twilio', src: '/logos/twilio.png', fullName: 'Twilio' },
];

const clients: Logo[] = [
  { name: 'AMVO', src: '/logos/amvo.webp', fullName: 'AMVO' },
  { name: 'Bancolombia', src: '/logos/bancolombia.png', fullName: 'Bancolombia' },
  { name: 'BBVA', src: '/logos/bbva.png', fullName: 'BBVA' },
  { name: 'CCS', src: '/logos/ccs.png', fullName: 'Cámara de Comercio de Santiago' },
  { name: 'El Tiempo', src: '/logos/el_tiempo.png', fullName: 'Casa Editorial El Tiempo' },
  { name: 'eRetail Day', src: '/logos/eRetail_Day.png', fullName: 'eRetailDay Mexico' },
  { name: 'IAB Colombia', src: '/logos/iab-colombia.png', fullName: 'IAB Colombia' },
  { name: 'Telcel', src: '/logos/telcel.png', fullName: 'Telcel' },
];

interface LogoItemProps {
  logo: Logo;
}

const LogoItem = ({ logo }: LogoItemProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="relative flex-shrink-0 mx-4 md:mx-16 group"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <img
        src={logo.src}
        alt={logo.fullName}
        className="h-8 md:h-20 max-h-8 md:max-h-20 min-w-[70px] md:min-w-[160px] w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-300"
      />
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 bg-[#21334E] text-white text-xs rounded-lg shadow-lg whitespace-nowrap animate-fade-in z-10">
          {logo.fullName}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#21334E]" />
        </div>
      )}
    </div>
  );
};

interface CarouselBandProps {
  logos: Logo[];
  direction: 'left' | 'right';
  title: string;
  isSecond?: boolean;
}

const CarouselBand = ({ logos, direction, title, isSecond = false }: CarouselBandProps) => {
  const animationClass = direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right';

  return (
    <div className={`w-full overflow-hidden ${isSecond ? 'mt-10 md:mt-16' : ''}`}>
      <p className="text-sm md:text-lg font-semibold text-[#21334E] mb-6 md:mb-10 tracking-wide uppercase text-center">
        {title}
      </p>
      <div className="relative group">
        <div
          className={`flex ${animationClass} group-hover:[animation-play-state:paused]`}
        >
          {/* Primera copia de logos */}
          {logos.map((logo, index) => (
            <LogoItem key={`logo-1-${logo.name}-${index}`} logo={logo} />
          ))}
          {/* Segunda copia para seamless loop */}
          {logos.map((logo, index) => (
            <LogoItem key={`logo-2-${logo.name}-${index}`} logo={logo} />
          ))}
        </div>
      </div>
    </div>
  );
};

const LogoCarousel = () => {
  return (
    <section
      role="region"
      aria-label="Colaboraciones y clientes"
      className="py-10 md:py-20 bg-white w-full overflow-hidden"
    >
      <CarouselBand
        logos={collaborators}
        direction="right"
        title="He colaborado con"
      />
      
      <CarouselBand
        logos={clients}
        direction="left"
        title="Han confiado en mí"
        isSecond
      />
    </section>
  );
};

export default LogoCarousel;
