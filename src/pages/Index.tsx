import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import LogoCarousel from '@/components/LogoCarousel';
import ConferenceAccordion from '@/components/ConferenceAccordion';
import AboutSection from '@/components/AboutSection';
import GallerySection from '@/components/GallerySection';
import BlogSection from '@/components/BlogSection';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <LogoCarousel />
        <ConferenceAccordion />
        <AboutSection />
        <GallerySection />
        <BlogSection />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
