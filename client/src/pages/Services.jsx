import { CheckCircle2, Stethoscope, Heart, Baby, Users, Microscope, ShieldCheck, Activity } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Services() {
  const { t } = useTranslation();
  
  const categories = [
    {
      title: t('services.s1'),
      icon: Stethoscope,
      description: t('services.sd1')
    },
    {
      title: t('services.s2'),
      icon: Baby,
      description: t('services.sd2')
    },
    {
      title: t('services.s3'),
      icon: Heart,
      description: t('services.sd3')
    },
    {
      title: t('services.s4'),
      icon: Activity,
      description: t('services.sd4')
    },
    {
      title: t('services.s5'),
      icon: Users,
      description: t('services.sd5')
    },
    {
      title: t('services.s6'),
      icon: Microscope,
      description: t('services.sd6')
    },
    {
      title: t('services.s7'),
      icon: ShieldCheck,
      description: t('services.sd7')
    },
    {
      title: t('services.s8'),
      icon: CheckCircle2,
      description: t('services.sd8')
    }
  ];

  const heroImage = "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=2000";

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <img 
          src={heroImage} 
          alt="Clinic Services Banner" 
          className="absolute inset-0 w-full h-full object-cover brightness-50"
        />
        <div className="container relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">{t('services.heroTitle')}</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light">
            {t('services.heroSubtitle')}
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 bg-background text-center">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 italic text-accent">{t('services.ourMedicalServices')}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('services.desc1')}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((cat, i) => (
              <div key={i} className="medical-card p-0 overflow-hidden flex flex-col md:flex-row h-full group hover:border-accent/50 transition-colors">
                <div className="md:w-1/3 bg-accent/5 p-8 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-border group-hover:bg-accent/10 transition-colors">
                  <cat.icon size={48} className="text-accent mb-4" />
                  <h3 className="text-xl font-bold text-foreground leading-tight">{cat.title}</h3>
                </div>
                <div className="md:w-2/3 p-8 flex items-center justify-center">
                  <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{cat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">{t('services.needToSeeDoctor')}</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/appointment" className="bg-white text-accent px-10 py-4 rounded-xl font-bold hover:bg-white/90 transition-colors shadow-lg">
              {t('services.bookAnAppointment')}
            </a>
            <a href="/contact" className="border-2 border-white text-white px-10 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors">
              {t('contact.contactUs')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
