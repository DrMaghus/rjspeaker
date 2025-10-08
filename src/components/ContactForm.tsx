import { useState, FormEvent } from 'react';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'a3f71e02-502f-4961-8df1-ddd4d44450d0',
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: formData.message,
          subject: `Nuevo mensaje de ${formData.name} - ${formData.company}`,
          botcheck: false,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        
        // Clear form after 2 seconds
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            company: '',
            message: '',
          });
          setStatus('idle');
        }, 2000);
      } else {
        setStatus('error');
        setErrorMessage('Hubo un error al enviar el mensaje. Por favor intenta de nuevo o escríbeme directamente a rjohnsonh@gmail.com');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Hubo un error al enviar el mensaje. Por favor intenta de nuevo o escríbeme directamente a rjohnsonh@gmail.com');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contacto" data-section="contacto" className="py-20 md:py-28 gradient-contact">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Listo para llevar relevancia a tu organización?
          </h2>
          <p className="text-lg text-white/90 max-w-xl mx-auto">
            Si buscas un speaker que inspire a tu equipo, desafíe el status quo y entregue
            frameworks accionables para transformar la experiencia de tus clientes, conversemos.
          </p>
        </div>

        {/* Form Container */}
        <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-8 md:p-10 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-white mb-2 font-medium">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Tu nombre completo"
                className="w-full bg-white rounded-lg border-2 border-transparent focus:border-cyan px-4 py-3 text-navy placeholder:text-slate-gray/60 transition-colors duration-300 outline-none"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-white mb-2 font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                className="w-full bg-white rounded-lg border-2 border-transparent focus:border-cyan px-4 py-3 text-navy placeholder:text-slate-gray/60 transition-colors duration-300 outline-none"
              />
            </div>

            {/* Company Field */}
            <div>
              <label htmlFor="company" className="block text-white mb-2 font-medium">
                Empresa
              </label>
              <input
                type="text"
                id="company"
                name="company"
                required
                value={formData.company}
                onChange={handleChange}
                placeholder="Nombre de tu empresa"
                className="w-full bg-white rounded-lg border-2 border-transparent focus:border-cyan px-4 py-3 text-navy placeholder:text-slate-gray/60 transition-colors duration-300 outline-none"
              />
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-white mb-2 font-medium">
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Cuéntame sobre tu evento o necesidad..."
                className="w-full bg-white rounded-lg border-2 border-transparent focus:border-cyan px-4 py-3 text-navy placeholder:text-slate-gray/60 transition-colors duration-300 outline-none resize-none"
              />
            </div>

            {/* Honeypot Anti-Spam */}
            <input 
              type="checkbox" 
              name="botcheck" 
              className="hidden" 
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
            />

            {/* Success Message */}
            {status === 'success' && (
              <div className="bg-[#10B981]/20 border-2 border-[#10B981] rounded-lg p-4 flex items-start gap-3 animate-in fade-in slide-in-from-bottom-4">
                <CheckCircle2 className="h-5 w-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                <p className="text-white font-medium">
                  ¡Mensaje enviado con éxito! Te contactaré pronto.
                </p>
              </div>
            )}

            {/* Error Message */}
            {status === 'error' && (
              <div className="bg-[#EF4444]/20 border-2 border-[#EF4444] rounded-lg p-4 flex items-start gap-3 animate-in fade-in slide-in-from-bottom-4">
                <AlertCircle className="h-5 w-5 text-[#EF4444] flex-shrink-0 mt-0.5" />
                <p className="text-white text-sm">
                  Hubo un error al enviar el mensaje. Por favor intenta de nuevo o escríbeme directamente a{' '}
                  <a 
                    href="mailto:rjohnsonh@gmail.com" 
                    className="underline hover:text-[#3fafe4ff] transition-colors"
                  >
                    rjohnsonh@gmail.com
                  </a>
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="w-full bg-[#F97316] hover:bg-[#ea580c] text-white font-bold py-3.5 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              data-event="cta_click"
              data-cta-name="enviar_contacto"
              data-cta-location="contacto"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Enviando...
                </>
              ) : status === 'success' ? (
                <>
                  <CheckCircle2 className="h-5 w-5" />
                  ¡Enviado!
                </>
              ) : (
                'Enviar Mensaje'
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
