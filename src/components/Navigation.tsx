import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '@/assets/richard-johnson-logo.png';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Inicio', id: 'inicio' },
    { name: 'Conferencias', id: 'conferencias' },
    { name: 'Sobre Richard', id: 'sobre-richard' },
    { name: 'Podcast', href: 'https://open.spotify.com/show/17lUXLgHea99EWQfMz7Qqc', external: true },
    { name: 'Blog', href: 'https://blog.rjohnsonh.com', external: false },
    { name: 'Contacto', id: 'contacto' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
        isScrolled ? 'shadow-md' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('inicio')}
            className="flex-shrink-0 transition-transform duration-300 hover:scale-105"
          >
            <img
              src={logo}
              alt="Richard Johnson"
              className="h-5 md:h-6 w-auto"
            />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) =>
              link.href ? (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="text-navy hover:text-sky font-medium transition-colors duration-300"
                >
                  {link.name}
                </a>
              ) : (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.id!)}
                  className="text-navy hover:text-sky font-medium transition-colors duration-300"
                >
                  {link.name}
                </button>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-light-gray transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-navy" />
            ) : (
              <Menu className="h-6 w-6 text-navy" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 bg-black/50 transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />
      <div
        className={`md:hidden fixed right-0 top-0 bottom-0 w-64 bg-white shadow-2xl transform transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col p-6 space-y-6 mt-20">
          {navLinks.map((link) =>
            link.href ? (
              <a
                key={link.name}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="text-navy hover:text-sky font-medium text-lg transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ) : (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.id!)}
                className="text-navy hover:text-sky font-medium text-lg transition-colors duration-300 text-left"
              >
                {link.name}
              </button>
            )
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
