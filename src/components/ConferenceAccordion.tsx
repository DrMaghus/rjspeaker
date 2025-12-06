import { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface ConferenceCardProps {
  id: number;
  emoji: string;
  title: string;
  subtitle: string;
  description: string;
  idealFor: string[];
  takeaways: string[];
  duration: string[];
  isOpen: boolean;
  onToggle: () => void;
}

const ConferenceCard = ({
  id,
  emoji,
  title,
  subtitle,
  description,
  idealFor,
  takeaways,
  duration,
  isOpen,
  onToggle,
}: ConferenceCardProps) => {
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

  // Determine card styling based on id
  const isCard1 = id === 1;
  const gradientClass = isCard1 
    ? 'bg-gradient-to-b from-[#21334E] to-[#4495DE]' 
    : 'bg-gradient-to-b from-[#4495DE] to-[#3fafe4ff]';

  return (
    <div className={`${gradientClass} rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out hover:-translate-y-2 hover:rotate-x-[2deg] relative`}>

      {/* Header - Always Visible */}
      <div className="flex flex-col items-center text-center gap-4 mb-4">
        <span className="text-6xl" style={{ textShadow: '0 0 20px rgba(255,255,255,0.5)' }}>
          {emoji}
        </span>
        <div className="w-full">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight">
            {title}
          </h3>
          <p className="text-base md:text-lg text-white/90 mb-4">
            {subtitle}
          </p>
          <button
            onClick={onToggle}
            className="bg-[#F97316] text-white px-6 py-2 rounded-md font-medium hover:brightness-110 transition-all inline-flex items-center gap-2"
            data-event="cta_click"
            data-cta-name={`toggle_conferencia_${id}`}
            data-cta-location="conferencias"
          >
            {isOpen ? 'Ver menos' : 'Ver más'}
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-300 ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Expandable Content */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-[2000px] opacity-100 mt-6' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="space-y-6 pt-6 border-t border-white/20">
          {/* Description */}
          <div>
            <p className="text-white/90 leading-relaxed">{description}</p>
          </div>

          {/* Ideal Para */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Ideal para:</h4>
            <ul className="space-y-2">
              {idealFor.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-white/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Qué se llevan */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">
              Qué se llevan los participantes:
            </h4>
            <ul className="space-y-2">
              {takeaways.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-white/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Duración */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Duración:</h4>
            <ul className="space-y-2">
              {duration.map((item, index) => (
                <li key={index} className="text-white/90 ml-4">
                  • {item}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <button
              onClick={() => scrollToSection('contacto')}
              className="bg-[#F97316] text-white px-8 py-3 rounded-md font-semibold hover:brightness-110 transition-all"
              data-event="cta_click"
              data-cta-name="solicitar_info"
              data-cta-location="conferencias"
            >
              Solicitar información
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ConferenceAccordion = () => {
  const [openCards, setOpenCards] = useState<Set<number>>(new Set());

  const conferences = [
    {
      id: 1,
      emoji: '🎯',
      title: 'Los 4 Momentos de un Customer Experience Relevante',
      subtitle:
        'Toda organización vive un viaje en la relación con sus clientes. Algunas apenas reaccionan, otras empiezan a coordinar sus esfuerzos, unas pocas ya anticipan con inteligencia, pero solo las que logran ser relevantes conectan de verdad con las personas.',
      description:
        'En esta charla, Richard presenta los 4 momentos de un Customer Experience Relevante: Pasivo, Orquestado, Inteligente y Relevante. Estos momentos son reflejo de la visión, voluntad y propósito de la organización. La conferencia invita a reflexionar sobre cómo pasar de silos a colaboración, de datos aislados a comprensión humana, de automatización fría a experiencias empáticas que transforman la vida del cliente.',
      idealFor: [
        'Líderes de CX, Marketing y Estrategia que buscan inspirar a sus equipos',
        'Ejecutivos C-Level que desean alinear visión y propósito con la experiencia de cliente',
        'Organizaciones que enfrentan retos de crecimiento, fidelización y diferenciación en mercados competitivos',
      ],
      takeaways: [
        'Una comprensión clara de los 4 momentos de CX como metáfora de madurez organizacional',
        'El reconocimiento de que la relevancia comienza en la voluntad del liderazgo, no solo en la tecnología',
        'Reflexión sobre cómo romper silos es un acto de compromiso con el cliente',
        'Inspiración para repensar sus customer journeys como puentes de conexión humana',
      ],
      duration: ['Keynote: 40-50 minutos', 'Workshop: 90-120 minutos (con dinámicas de reflexión)'],
    },
    {
      id: 2,
      emoji: '💎',
      title: 'VALOR: 5 Pasos para Construir Experiencias que Importan',
      subtitle:
        'El modelo VALOR es un framework de cinco pasos para transformar el CX: Ver, Anticipar, Liberar, Orquestar y Reforzar. Aprende a combinar empatía, oportunidad e inteligencia para construir experiencias que generan confianza y resultados.',
      description:
        'Esta charla presenta el modelo VALOR, un recorrido de cinco pasos que ayuda a líderes y equipos a transformar la experiencia del cliente: Ver al cliente como persona, Anticipar sus expectativas, Liberar los silos, Orquestar con inteligencia y Reforzar con impacto. Con un estilo inspirador y estratégico, esta conferencia muestra cómo combinar empatía, oportunidad e inteligencia para construir relaciones sólidas, diferenciarse en mercados competitivos y generar resultados tangibles para el negocio.',
      idealFor: [
        'Líderes de Customer Experience, Marketing, Transformación Digital y Estrategia',
        'Ejecutivos C-Level que buscan conectar CX con crecimiento del negocio',
        'Empresas en sectores de banca, seguros, ecommerce, telcos y servicios financieros',
      ],
      takeaways: [
        'La importancia de ver al cliente como persona en un mundo dominado por datos',
        'Cómo anticipar expectativas y crear experiencias más oportunas',
        'La necesidad de romper silos y dar coherencia a cada interacción',
        'Cómo usar la IA y la automatización para orquestar experiencias relevantes, sin perder el toque humano',
        'Aprender a reforzar con impacto, midiendo cómo la relevancia genera confianza, lealtad y valor',
      ],
      duration: [
        'Keynote: 40-50 minutos',
        'Workshop: 90-120 minutos (con dinámicas participativas sobre el modelo VALOR)',
      ],
    },
  ];

  const handleToggle = (id: number) => {
    setOpenCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <section id="conferencias" data-section="conferencias" className="py-20 md:py-28 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            Conferencias Disponibles
          </h2>
          <p className="text-lg md:text-xl text-slate-gray max-w-3xl mx-auto">
            Charlas inspiracionales y estratégicas para transformar la experiencia de tus clientes
          </p>
        </div>

        {/* Conference Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {conferences.map((conference) => (
            <ConferenceCard
              key={conference.id}
              {...conference}
              isOpen={openCards.has(conference.id)}
              onToggle={() => handleToggle(conference.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConferenceAccordion;
