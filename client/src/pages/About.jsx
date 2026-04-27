import { Heart, Target, Award, Users, Shield, Zap, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();
  const values = [
    { icon: Heart, title: t('about.val1Title'), description: t('about.val1Desc') },
    { icon: Zap, title: t('about.val2Title'), description: t('about.val2Desc') },
    { icon: Shield, title: t('about.val3Title'), description: t('about.val3Desc') },
    { icon: Target, title: t('about.val4Title'), description: t('about.val4Desc') },
    { icon: Users, title: t('about.val5Title'), description: t('about.val5Desc') },
    { icon: Award, title: t('about.val6Title'), description: t('about.val6Desc') },
  ];

  const team = [
    { name: 'Ato Eshetu Aredo', role: t('about.role1') },
    { name: 'Wro. Woinshet Damtew', role: t('about.role2') },
    { name: 'Ato Daniel Abera', role: t('about.role3') },
  ];

  const heroImage = "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=2000";

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
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">{t('about.whoWeAre')}</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light">{t('about.heroDesc')}</p>
        </div>
      </section>

      {/* Main Story */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">{t('about.ourFoundation')}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed italic">
                "{t('about.quote')}"
              </p>
              <p className="text-sm font-semibold text-accent mt-2">{t('about.quoteAuthor')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: t('about.p1').replace('Hon. Dr. Abebech Gobena in 1980', '<strong>Hon. Dr. Abebech Gobena in 1980</strong>').replace('ክቡር ዶ/ር አበበች ጎበና', '<strong>ክቡር ዶ/ር አበበች ጎበና</strong>') }}></p>
                <p className="text-muted-foreground leading-relaxed">{t('about.p2')}</p>
                <p className="text-muted-foreground leading-relaxed">{t('about.p3')}</p>
              </div>
              <div className="bg-muted p-8 rounded-2xl border border-border">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <CheckCircle2 className="text-accent" /> {t('about.ourImpact')}
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0"></span>
                    <span className="text-muted-foreground">{t('about.impact1')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0"></span>
                    <span className="text-muted-foreground">{t('about.impact2')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0"></span>
                    <span className="text-muted-foreground">{t('about.impact3')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0"></span>
                    <span className="text-muted-foreground">{t('about.impact4')}</span>
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
              <h2 className="text-2xl font-bold mb-4">{t('about.ourVision')}</h2>
              <p className="text-muted-foreground leading-relaxed">{t('about.visionDesc')}</p>
            </div>
            <div className="medical-card text-center p-10">
              <div className="flex justify-center mb-6">
                <Shield size={48} className="text-accent" />
              </div>
              <h2 className="text-2xl font-bold mb-4">{t('about.ourMission')}</h2>
              <p className="text-muted-foreground leading-relaxed">{t('about.missionDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">{t('about.ourCoreValues')}</h2>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('about.topManagement')}</h2>
          <p className="text-muted-foreground mb-12">{t('about.topManagementDesc')}</p>
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
