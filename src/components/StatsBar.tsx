import { useEffect, useRef, useState } from 'react';

const StatsBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      number: '+1,000',
      label: 'Profesionales formados',
      colorClass: 'text-navy',
    },
    {
      number: '+18 años',
      label: 'Transformación digital LATAM',
      colorClass: 'text-sky-blue',
    },
    {
      number: '9.2/10',
      label: 'Calificación promedio',
      colorClass: 'text-orange',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-12 md:py-16 bg-gradient-to-r from-slate-50 to-white"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`
                text-center
                ${index < stats.length - 1 ? 'md:border-r md:border-slate-200' : ''}
                transition-all duration-700 ease-out
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
              `}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className={`text-4xl md:text-5xl font-bold ${stat.colorClass} mb-2`}>
                {stat.number}
              </div>
              <div className="text-sm md:text-base text-slate-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
