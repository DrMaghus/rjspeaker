import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";

// Import images
import img1 from '@/assets/richard-johnson-speaker.jpg';
import img2 from '@/assets/richard-johnson-speaker01.jpg';
import img3 from '@/assets/richard-johnson-speaker02.jpg';
import img4 from '@/assets/richard-johnson-speaker03.jpg';
import img5 from '@/assets/richard-johnson-speaker04.jpg';
import img6 from '@/assets/richard-johnson-speaker05.png';
import img7 from '@/assets/richard-johnson-speaker06.jpg';
import img8 from '@/assets/richard-johnson-speaker07.jpg';

const images = [
  { src: img1, alt: 'Richard Johnson como speaker, foto 1' },
  { src: img2, alt: 'Richard Johnson como speaker, foto 2' },
  { src: img3, alt: 'Richard Johnson como speaker, foto 3' },
  { src: img4, alt: 'Richard Johnson como speaker, foto 4' },
  { src: img5, alt: 'Richard Johnson como speaker, foto 5' },
  { src: img6, alt: 'Richard Johnson como speaker, foto 6' },
  { src: img7, alt: 'Richard Johnson como speaker, foto 7' },
  { src: img8, alt: 'Richard Johnson como speaker, foto 8' },
];

const GallerySection = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Update current slide
  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Auto-play functionality
  useEffect(() => {
    if (!api || isHovered) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [api, isHovered]);

  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const goToSlide = useCallback((index: number) => {
    api?.scrollTo(index);
  }, [api]);

  return (
    <section 
      className="py-20 bg-gradient-to-b from-white to-slate-50"
      role="region"
      aria-label="Galería de fotos"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#21334E] mb-4">
            Experiencias en Vivo
          </h2>
          <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
            Cada charla es una oportunidad para conectar ideas con acción
          </p>
        </div>

        {/* Carousel */}
        <div 
          className="relative max-w-6xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Carousel
            setApi={setApi}
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative h-[400px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover object-center transition-opacity duration-500"
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Arrows */}
            <button
              onClick={scrollPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full p-3 md:p-4 shadow-lg transition-all duration-300 z-10"
              aria-label="Ver foto anterior"
            >
              <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 text-[#21334E]" />
            </button>
            
            <button
              onClick={scrollNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full p-3 md:p-4 shadow-lg transition-all duration-300 z-10"
              aria-label="Ver siguiente foto"
            >
              <ChevronRight className="h-5 w-5 md:h-6 md:w-6 text-[#21334E]" />
            </button>
          </Carousel>

          {/* Dots Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                  current === index
                    ? 'bg-[#4495DE] scale-110'
                    : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Ir a foto ${index + 1} de ${images.length}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
