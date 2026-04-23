import { Link } from 'wouter';
import { Heart, Stethoscope, Users, Award, ChevronRight } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function Home() {
  const services = [
    { icon: Stethoscope, title: 'General Consultation', description: 'Expert medical consultation for all your health concerns' },
    { icon: Heart, title: 'Preventive Care', description: 'Comprehensive health screening and preventive services' },
    { icon: Users, title: 'Family Medicine', description: 'Healthcare services for the entire family' },
    { icon: Award, title: 'Specialized Treatment', description: 'Advanced medical treatments with experienced specialists' },
  ];

  const testimonials = [
    { name: 'Abeba Zelalem', role: 'Patient', content: 'The clinic provided excellent care and attention. The doctors are very professional and caring.', rating: 5 },
    { name: 'Mulatu Tesfaye', role: 'Patient', content: 'Great experience! The staff is friendly and the facilities are modern and clean.', rating: 5 },
    { name: 'Belayneh Kebede', role: 'Patient', content: 'I appreciate the quick service and thorough medical examination. Highly recommended!', rating: 5 },
  ];

  const faqs = [
    { question: 'How do I book an appointment?', answer: 'You can book an appointment through our website using the appointment booking form, or call us directly at +251 911 234 567.' },
    { question: 'What are your operating hours?', answer: 'We are open Monday to Friday from 8:00 AM to 6:00 PM, and Saturday from 9:00 AM to 2:00 PM. We are closed on Sundays.' },
    { question: 'Do you accept insurance?', answer: 'Yes, we accept most major insurance plans. Please contact us to verify your specific coverage.' },
    { question: 'What should I bring to my appointment?', answer: 'Please bring a valid ID, insurance card if applicable, and any relevant medical records or test results.' },
    { question: 'Is there parking available?', answer: 'Yes, we have ample parking available for our patients at no additional cost.' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background to-muted py-20 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-3">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                  Your Health is Our Priority
                </h1>
                <p className="text-lg text-muted-foreground">
                  Welcome to Abebech Gobena Medical Clinic, where we provide compassionate,
                  professional healthcare services to our community.
                </p>
              </div>
              <p className="text-base text-muted-foreground">
                With experienced doctors, modern facilities, and a commitment to patient care,
                we're here to help you achieve optimal health and wellness.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/appointment" className="cta-button text-center flex items-center justify-center">
                  Book Appointment
                  <ChevronRight size={18} className="ml-2" />
                </Link>
                <Link href="/services" className="inline-flex items-center justify-center rounded-lg border border-accent px-6 py-3 font-semibold text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300">
                  Learn More
                </Link>
              </div>
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8">
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent">15+</p>
                  <p className="text-sm text-muted-foreground">Years Experience</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent">5000+</p>
                  <p className="text-sm text-muted-foreground">Happy Patients</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent">20+</p>
                  <p className="text-sm text-muted-foreground">Medical Staff</p>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="hidden md:block">
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl border-4 border-background/50">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent z-10 pointer-events-none"></div>
                <img 
                  src="https://www.medanit.com/storage/images/7a2TPCYvTXvMRewwYBjv73v0ETKh1ThhwQzIp0Cl.jpg" 
                  alt="Professional Ethiopian Doctor" 
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
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We offer a comprehensive range of medical services to meet your healthcare needs.
            </p>
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
            <Link href="/services" className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all justify-center">
              View All Services <ChevronRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-spacing">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">What Our Patients Say</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real experiences from patients who trust us with their healthcare.
            </p>
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
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-muted-foreground">
                Find answers to common questions about our clinic and services.
              </p>
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
          <h2 className="text-3xl md:text-4xl font-bold text-accent-foreground mb-4">
            Ready to Book Your Appointment?
          </h2>
          <p className="text-lg text-accent-foreground/90 mb-8 max-w-2xl mx-auto">
            Schedule your visit today and experience quality healthcare from our dedicated team.
          </p>
          <Link href="/appointment" className="inline-flex items-center justify-center rounded-lg bg-accent-foreground px-8 py-4 font-semibold text-accent hover:opacity-90 transition-all">
            Book Now <ChevronRight size={20} className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}
