import { ChevronDown } from 'lucide-react';
import heroImage from '@/assets/richard-hero.png';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 lg:py-0">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-right lg:bg-center"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 gradient-hero" />
      
      {/* Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 sm:px-8 lg:px-8 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-3 sm:mb-4 lg:mb-6 animate-fade-in-up">
          Inspiro a equipos a transformar datos en experiencias relevantes que conectan y generan valor
        </h1>
        
        <h2 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-medium text-white mb-3 sm:mb-4 lg:mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Speaker | Consultor en Experiencia Digital y Analítica de Clientes
        </h2>
        
        <p className="text-sm sm:text-base lg:text-lg text-white/90 mb-6 sm:mb-8 lg:mb-10 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          Con +18 años liderando transformación digital en LATAM, combino storytelling inspirador con frameworks accionables para construir experiencias empáticas, oportunas e inteligentes
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <button
            onClick={() => scrollToSection('conferencias')}
            className="btn-hero-primary w-full sm:w-auto"
          >
            Ver Conferencias
          </button>
          <button
            onClick={() => scrollToSection('contacto')}
            className="btn-hero-secondary w-full sm:w-auto"
          >
            Contactar
          </button>
        </div>
      </div>
      
      {/* Animated Chevron */}
      <button
        onClick={() => scrollToSection('conferencias')}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce-slow cursor-pointer group"
        aria-label="Scroll to conferences"
      >
        <ChevronDown className="h-10 w-10 text-white group-hover:text-cyan transition-colors duration-300" />
      </button>
    </section>
  );
};

export default Hero;
