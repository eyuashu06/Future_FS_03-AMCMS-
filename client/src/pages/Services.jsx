import { CheckCircle2, Stethoscope, Heart, Baby, Users, Microscope, Pill, Activity, ShieldCheck } from 'lucide-react';

export default function Services() {
  const categories = [
    {
      title: "Maternal Health Services",
      icon: Heart,
      description: "Dedicated care for mothers at all stages of pregnancy and beyond.",
      services: [
        "Antenatal Care (ANC)",
        "Postnatal Care (PNC)",
        "Child Delivery (Natural & C-Section)",
        "Obstetric Services",
        "Gynaecological Care"
      ]
    },
    {
      title: "Child Healthcare",
      icon: Baby,
      description: "Specialized medical attention for children's growth and wellbeing.",
      services: [
        "Paediatric Consultations",
        "Growth Monitoring",
        "Infertility Services",
        "Newborn Care"
      ]
    },
    {
      title: "Preventive & Public Health",
      icon: ShieldCheck,
      description: "Proactive measures to ensure community health and awareness.",
      services: [
        "Immunization & Vaccinations",
        "Family Planning Services",
        "VCT/PMTCT Services",
        "Nutrition & Hygiene Education"
      ]
    },
    {
      title: "Support & Diagnostic",
      icon: Microscope,
      description: "Comprehensive supporting services for accurate diagnosis and treatment.",
      services: [
        "Advanced Laboratory Testing",
        "Pharmacy Services",
        "Radiology",
        "Male Circumcision"
      ]
    }
  ];

  const heroImage = "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000";

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
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">Our Services</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light">
            Comprehensive medical care designed to save lives and improve community wellbeing.
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 bg-background text-center">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 italic text-accent">Our Commitment to Health</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Abebech Gobena Mothers and Children Medical Center provides quality medical care 
              on a 24-hour basis. We are dedicated to supporting vulnerable women and children 
              by ensuring adequate services are accessible to all in need.
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
                <div className="md:w-2/3 p-8">
                  <p className="text-sm text-muted-foreground mb-6 font-medium uppercase tracking-wider">{cat.description}</p>
                  <ul className="grid grid-cols-1 gap-3">
                    {cat.services.map((s, j) => (
                      <li key={j} className="flex items-center gap-3 text-foreground font-medium">
                        <CheckCircle2 size={18} className="text-accent shrink-0" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Services Info */}
      <section className="py-20">
        <div className="container overflow-hidden">
          <div className="max-w-4xl mx-auto">
            <div className="medical-card border-l-4 border-l-accent p-10 bg-accent/5">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Activity className="text-accent" /> Public Health Provisions
              </h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  The Charity provides necessary equipment and provisions to health institutions throughout 
                  Addis Ababa. The objective is to ensure that adequate services be provided and 
                  accessible to all who are need of it.
                </p>
                <p>
                  <strong>Nutrition and Health Education:</strong> We provide a supplementary feeding and 
                  growth monitoring program within the community so those suffering malnutrition can be 
                  assisted. We also deliver education in relation to nutrition and hygiene.
                </p>
                <p>
                  Previously, health clinics have been established in rural areas providing necessary 
                  health assistance to communities, which have been transitioned to local government 
                  bodies to ensure continued services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Need Medical Assistance?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Our medical staff is available to provide expert care and support for you and your family.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/appointment" className="bg-white text-accent px-10 py-4 rounded-xl font-bold hover:bg-white/90 transition-colors shadow-lg">
              Book Appointment
            </a>
            <a href="/contact" className="border-2 border-white text-white px-10 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
