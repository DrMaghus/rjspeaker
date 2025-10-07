import { Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-navy py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bio */}
        <div className="text-center mb-8">
          <p className="text-white/80 max-w-3xl mx-auto leading-relaxed">
            Richard Johnson es fundador de Elevance, co-autor del libro 'Relevancia' y co-host del
            podcast 'The Relevant Show'. Con más de 18 años liderando equipos de digital analytics
            y digital experiences en LATAM, ayuda a organizaciones a construir experiencias más
            humanas e inteligentes.
          </p>
        </div>

        {/* Links */}
        <div className="flex justify-center items-center gap-8 mb-8">
          <a
            href="https://linkedin.com/in/rjohnsonh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky hover:text-orange font-medium transition-colors duration-300 flex items-center gap-2"
          >
            <Linkedin className="h-5 w-5" />
            LinkedIn
          </a>
          <a
            href="mailto:rjohnsonh@gmail.com"
            className="text-sky hover:text-orange font-medium transition-colors duration-300 flex items-center gap-2"
          >
            <Mail className="h-5 w-5" />
            Email
          </a>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 my-8" />

        {/* Copyright */}
        <div className="text-center">
          <p className="text-slate-gray text-sm">
            © 2025 Richard Johnson. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
