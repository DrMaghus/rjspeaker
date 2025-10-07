import { Check } from 'lucide-react';
import portraitImage from '@/assets/richard-portrait.png';

const AboutSection = () => {
  const differentiators = [
    {
      title: '18 años liderando experiencias digitales en LATAM',
      description:
        'Experiencia práctica implementando estrategias en bancos, telcos, aseguradoras y ecommerce',
    },
    {
      title: 'No solo teoría: casos reales',
      description:
        'Cada charla incluye ejemplos concretos y aprendizajes de implementaciones exitosas',
    },
    {
      title: 'Estilo único que conecta',
      description:
        'Cercano, divertido, consultivo y académico. Combina storytelling con frameworks accionables',
    },
    {
      title: 'Más de 12 años como docente',
      description:
        'Ha formado a cientos de profesionales en analítica digital, UX y desarrollo de productos digitales',
    },
  ];

  return (
    <section id="sobre-richard" className="py-20 md:py-28 bg-light-gray">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Left Column - Image */}
          <div className="lg:col-span-2">
            <div className="relative">
              <img
                src={portraitImage}
                alt="Richard Johnson - Speaker en Customer Experience"
                className="w-full aspect-[4/5] object-cover rounded-2xl shadow-md"
              />
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-3">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
              Por qué contratar a Richard
            </h2>

            {/* Biography */}
            <div className="space-y-4 text-slate-gray mb-8">
              <p>
                Richard es fundador y CEO de Elevance, consultora estratégica en experiencia digital
                y análisis del comportamiento del cliente. Con más de 18 años liderando equipos de
                digital analytics y digital experiences en LATAM, ha trabajado con marcas líderes en
                telcos, banca, retail, aseguradoras, aerolíneas y transporte como Telcel,
                Bancolombia, Banco Santander, Movistar, LATAM Airlines, GNP y Mobility ADO.
              </p>

              <p>
                Como consultor senior en estrategia y analítica digital, se especializa en el
                desarrollo de estrategias de personalización de experiencias digitales que
                transforman cómo las organizaciones se relacionan con sus clientes. Ha liderado
                proyectos de diagnóstico y optimización digital en múltiples países de LATAM,
                trabajando en estrecha colaboración con partners tecnológicos como Google, Adobe y
                ContentSquare.
              </p>

              <p>
                Es co-autor del libro 'Relevancia: El futuro de las organizaciones pasa por
                construir experiencias digitales más oportunas, cercanas e inteligentes' y co-host
                del podcast 'The Relevant Show'. Como speaker, Richard se caracteriza por su estilo
                cercano, consultivo y lleno de historias que conectan tanto con audiencias C-Level
                como con practitioners. Ha sido profesor durante más de 12 años en instituciones
                como Pontificia Universidad Católica de Chile, IEBS Biztech School y OBS Business
                School.
              </p>
            </div>

            {/* Differentiators */}
            <div className="space-y-4 mb-8">
              {differentiators.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-9 w-9 rounded-full bg-[hsl(var(--cyan))]/20 flex items-center justify-center">
                    <Check className="h-5 w-5 text-cyan" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-navy mb-1">{item.title}</h4>
                    <p className="text-slate-gray">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* LinkedIn Button */}
            <a
              href="https://linkedin.com/in/rjohnsonh"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-sky inline-block"
            >
              Ver perfil en LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
