import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import { Heart, Stethoscope, Users, Award, ChevronRight } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function Home() {
  const { t } = useTranslation();
  const services = [
    { icon: Stethoscope, title: t('home.service1Title'), description: t('home.service1Desc') },
    { icon: Heart, title: t('home.service2Title'), description: t('home.service2Desc') },
    { icon: Users, title: t('home.service3Title'), description: t('home.service3Desc') },
    { icon: Award, title: t('home.service4Title'), description: t('home.service4Desc') },
  ];

  const testimonials = [
    { name: t('home.test1Name'), role: t('home.test1Role'), content: t('home.test1Content'), rating: 5 },
    { name: t('home.test2Name'), role: t('home.test2Role'), content: t('home.test2Content'), rating: 5 },
    { name: t('home.test3Name'), role: t('home.test3Role'), content: t('home.test3Content'), rating: 5 },
  ];

  const faqs = [
    { question: t('home.faq1Q'), answer: t('home.faq1A') },
    { question: t('home.faq2Q'), answer: t('home.faq2A') },
    { question: t('home.faq3Q'), answer: t('home.faq3A') },
    { question: t('home.faq4Q'), answer: t('home.faq4A') },
    { question: t('home.faq5Q'), answer: t('home.faq5A') },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background to-muted py-20 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-3">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground">{t('home.yourHealth')}</h1>
                <p className="text-lg text-muted-foreground">{t('home.welcomeText')}</p>
              </div>
              <p className="text-base text-muted-foreground">{t('home.heroDesc')}</p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/appointment" className="cta-button text-center flex items-center justify-center">{t('navbar.bookAppointment')}<ChevronRight size={18} className="ml-2" />
                </Link>
                <Link href="/services" className="inline-flex items-center justify-center rounded-lg border border-accent px-6 py-3 font-semibold text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300">{t('home.learnMore')}</Link>
              </div>
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8">
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent">15+</p>
                  <p className="text-sm text-muted-foreground">{t('home.yearsExperience')}</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent">5000+</p>
                  <p className="text-sm text-muted-foreground">{t('home.happyPatients')}</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent">20+</p>
                  <p className="text-sm text-muted-foreground">{t('home.medicalStaff')}</p>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="hidden md:block">
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl border-4 border-background/50">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent z-10 pointer-events-none"></div>
                <img 
                  src="https://images.unsplash.com/photo-1638202993928-7267aad84c31?auto=format&fit=crop&w=2000&q=80" 
                  alt="Professional Healthcare Provider" 
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section-spacing bg-light-gray">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t('home.ourServices')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('home.servicesDesc')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="medical-card text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-accent/10 rounded-lg">
                      <Icon size={32} className="text-accent" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-12">
            <Link href="/services" className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all justify-center">{t('home.viewAllServices')} <ChevronRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-spacing">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t('home.whatPatientsSay')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('home.patientsSayDesc')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="medical-card">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-accent text-lg">★</span>
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-spacing bg-light-gray">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t('home.faqTitle')}</h2>
              <p className="text-lg text-muted-foreground">{t('home.faqDesc')}</p>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-border">
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:text-accent">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing bg-gradient-to-r from-accent to-accent/80">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-accent-foreground mb-4">{t('home.readyToBook')}</h2>
          <p className="text-lg text-accent-foreground/90 mb-8 max-w-2xl mx-auto">{t('home.scheduleVisit')}</p>
          <Link href="/appointment" className="inline-flex items-center justify-center rounded-lg bg-accent-foreground px-8 py-4 font-semibold text-accent hover:opacity-90 transition-all">{t('home.bookNow')} <ChevronRight size={20} className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}
