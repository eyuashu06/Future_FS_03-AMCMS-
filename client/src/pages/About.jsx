import { Heart, Target, Award, Users, Shield, Zap, CheckCircle2 } from 'lucide-react';

export default function About() {
  const values = [
    { icon: Heart, title: 'Compassion', description: 'Treating every patient with empathy and respect.' },
    { icon: Zap, title: 'Empowerment', description: 'Empowering communities through health and knowledge.' },
    { icon: Shield, title: 'Integrity', description: 'Maintaining the highest ethical standards in medical care.' },
    { icon: Target, title: 'Sustainability', description: 'Building health systems that last for generations.' },
    { icon: Users, title: 'Inclusivity', description: 'Serving all members of our community equally.' },
    { icon: Award, title: 'Excellence', description: 'Committed to medical advancement and quality service.' },
  ];

  const team = [
    { name: 'Ato Eshetu Aredo', role: 'Executive Director' },
    { name: 'Wro. Woinshet Damtew', role: 'Deputy Program Director' },
    { name: 'Ato Daniel Abera', role: 'IGA Director' },
  ];

  const heroImage = "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000";

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <img 
          src={heroImage} 
          alt="Abebech Gobena Medical Clinic Hero" 
          className="absolute inset-0 w-full h-full object-cover brightness-50"
        />
        <div className="container relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">Who We Are</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light">
            Founded on the legacy of Hon. Dr. Abebech Gobena, dedicated to vulnerable women and children.
          </p>
        </div>
      </section>

      {/* Main Story */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">Our Foundation</h2>
              <p className="text-lg text-muted-foreground leading-relaxed italic">
                "I have no children of my own but I have a family of hundreds of thousands and I have no regret."
              </p>
              <p className="text-sm font-semibold text-accent mt-2">— Dr. Abebech Gobena</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  Abebech Gobena Charity is a not-for-profit organization established by philanthropist 
                  <strong> Hon. Dr. Abebech Gobena in 1980</strong> during severe drought in the country.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Dr. Abebech Gobena (1935 – 2021) founded Biruh Tesfa Children’s Village, one of Ethiopia’s 
                  oldest orphanages. Currently, the organization is involved in a wide range of services including 
                  Institutional child care, Supplementary feeding, and Women empowerment through skill training.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Through these programs, the organization has changed the lives of millions of people in the 
                  past 45 years, receiving a registration certificate with number 0181.
                </p>
              </div>
              <div className="bg-muted p-8 rounded-2xl border border-border">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <CheckCircle2 className="text-accent" /> Our Impact
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0"></span>
                    <span className="text-muted-foreground">Institutional child care & Foster care</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0"></span>
                    <span className="text-muted-foreground">Maternal & Children’s health services</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0"></span>
                    <span className="text-muted-foreground">Women empowerment & Skill training</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0"></span>
                    <span className="text-muted-foreground">Supplementary feeding programs</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="medical-card text-center p-10">
              <div className="flex justify-center mb-6">
                <Target size={48} className="text-accent" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                To see a nation in which every child attains their fullness and becomes a responsible and participating citizen.
              </p>
            </div>
            <div className="medical-card text-center p-10">
              <div className="flex justify-center mb-6">
                <Shield size={48} className="text-accent" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                Promote children well being, empower communities and contribute to education and health advancement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {values.map((v, i) => (
              <div key={i} className="p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-shadow">
                <v.icon className="mx-auto mb-4 text-accent" size={32} />
                <h3 className="font-bold mb-2">{v.title}</h3>
                <p className="text-xs text-muted-foreground">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Management Team */}
      <section className="py-20 bg-muted/50">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Top Management Team</h2>
          <p className="text-muted-foreground mb-12">Dedicated leaders continuing the legacy of Dr. Abebech Gobena.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((m, i) => (
              <div key={i} className="medical-card group hover:bg-accent/5 transition-colors">
                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 text-accent group-hover:scale-110 transition-transform">
                  <Users size={32} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-1">{m.name}</h3>
                <p className="text-sm font-medium text-accent uppercase tracking-wider">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
