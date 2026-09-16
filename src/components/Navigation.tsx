import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import logo from '@/assets/richard-johnson-logo.png';

const podcastOptions = [
  {
    name: 'Experience Unplugged',
    href: 'https://youtube.com/playlist?list=PLgKGsfkPVehwl2_SKW6JmfIZCDubmVD6z&si=ce7esP6Vf1tdjhQA',
    isNew: true,
  },
  {
    name: 'The Relevant Show',
    href: 'https://open.spotify.com/show/17lUXLgHea99EWQfMz7Qqc',
    isNew: false,
  },
];

const navLinks = [
  { name: 'Inicio', id: 'inicio' },
  { name: 'Conferencias', id: 'conferencias' },
  { name: 'Sobre Richard', id: 'sobre-richard' },
  { name: 'Podcast', isPodcast: true },
  { name: 'Blog', href: 'https://blog.rjohnsonh.com', external: false },
  { name: 'Contacto', id: 'contacto' },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPodcastOpen, setIsPodcastOpen] = useState(false);
  const [isMobilePodcastOpen, setIsMobilePodcastOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) =>
              link.isPodcast ? (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => {
                    if (closeTimer.current) {
                      clearTimeout(closeTimer.current);
                      closeTimer.current = null;
                    }
                    setIsPodcastOpen(true);
                  }}
                  onMouseLeave={() => {
                    closeTimer.current = setTimeout(() => setIsPodcastOpen(false), 200);
                  }}
                >
                  <button
                    className="text-navy hover:text-sky font-medium transition-colors duration-300 flex items-center gap-1"
                    onClick={() => setIsPodcastOpen(!isPodcastOpen)}
                  >
                    {link.name}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 ${
                        isPodcastOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {/* Dropdown — sin gap: padding-top mantiene la zona de hover continua */}
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 min-w-[220px] ${
                      isPodcastOpen ? 'pointer-events-auto' : 'pointer-events-none'
                    }`}
                  >
                    <div
                      className={`bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden transition-all duration-300 origin-top ${
                        isPodcastOpen
                          ? 'opacity-100 visible translate-y-0'
                          : 'opacity-0 invisible -translate-y-2'
                      }`}
                    >
                      {podcastOptions.map((option) => (
                        <a
                          key={option.name}
                          href={option.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between gap-3 px-4 py-3 text-navy hover:bg-navy hover:text-white transition-colors duration-200 group"
                        >
                          <span className="font-medium text-sm whitespace-nowrap">
                            {option.name}
                          </span>
                          {option.isNew && (
                            <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wide bg-orange text-white px-2 py-0.5 rounded-full group-hover:bg-white group-hover:text-orange transition-colors duration-200">
                              Nuevo
                            </span>
                          )}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ) : link.href ? (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
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
            className="lg:hidden p-2 rounded-lg hover:bg-light-gray transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-navy" />
            ) : (
              <Menu className="h-6 w-6 text-navy" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/50 transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />
      {/* Mobile Menu Panel */}
      <div
        className={`lg:hidden fixed right-0 top-0 bottom-0 w-64 bg-white shadow-2xl transform transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col p-6 space-y-6 mt-20">
          {navLinks.map((link) =>
            link.isPodcast ? (
              <div key={link.name} className="flex flex-col">
                <button
                  onClick={() => setIsMobilePodcastOpen(!isMobilePodcastOpen)}
                  className="text-navy hover:text-sky font-medium text-lg transition-colors duration-300 text-left flex items-center justify-between"
                >
                  {link.name}
                  <ChevronDown
                    className={`h-5 w-5 transition-transform duration-300 ${
                      isMobilePodcastOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isMobilePodcastOpen ? 'max-h-96 mt-3' : 'max-h-0'
                  }`}
                >
                  <div className="flex flex-col space-y-3 pl-4 border-l-2 border-sky/30">
                    {podcastOptions.map((option) => (
                      <a
                        key={option.name}
                        href={option.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-navy hover:text-sky font-medium text-base transition-colors duration-300 flex items-center gap-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {option.name}
                        {option.isNew && (
                          <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wide bg-orange text-white px-2 py-0.5 rounded-full">
                            Nuevo
                          </span>
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : link.href ? (
              <a
                key={link.name}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
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
