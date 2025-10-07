import { useState, FormEvent } from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Integrate with Formspree - replace YOUR_FORM_ID with actual Formspree form ID
      const response = await fetch('https://formspree.io/f/xanyyjbb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: formData.message,
          _subject: `Nuevo mensaje de ${formData.name} - ${formData.company}`,
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        toast.success('¡Mensaje enviado con éxito! Te contactaré pronto.');
        
        // Clear form after 2 seconds
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            company: '',
            message: '',
          });
          setIsSuccess(false);
        }, 2000);
      } else {
        throw new Error('Error al enviar el formulario');
      }
    } catch (error) {
      toast.error(
        'Hubo un error al enviar el mensaje. Por favor intenta de nuevo o escríbeme directamente a rjohnsonh@gmail.com'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contacto" className="py-20 md:py-28 gradient-contact">
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || isSuccess}
              className="w-full bg-[hsl(var(--orange))] hover:bg-[hsl(21,95%,48%)] text-white font-bold py-3.5 rounded-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Enviando...
                </>
              ) : isSuccess ? (
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
