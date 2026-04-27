import { Link } from 'wouter';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Clinic Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">{t("common.abebechGobena")}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {t('footer.providingQuality')}
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <MapPin size={16} className="text-accent" />
              <span>{t('footer.addisAbaba')}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-muted-foreground hover:text-accent transition-colors">{t('footer.home')}</Link></li>
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-accent transition-colors">{t('footer.aboutUs')}</Link></li>
              <li><Link href="/services" className="text-sm text-muted-foreground hover:text-accent transition-colors">{t('footer.servicesTitle')}</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-accent transition-colors">{t('footer.contact')}</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t('footer.servicesTitle')}</h4>
            <ul className="space-y-2">
              <li><a href="/services" className="text-sm text-muted-foreground hover:text-accent transition-colors">{t('footer.generalConsultation')}</a></li>
              <li><a href="/services" className="text-sm text-muted-foreground hover:text-accent transition-colors">{t('footer.dentalCare')}</a></li>
              <li><a href="/services" className="text-sm text-muted-foreground hover:text-accent transition-colors">{t('footer.laboratoryTests')}</a></li>
              <li><a href="/services" className="text-sm text-muted-foreground hover:text-accent transition-colors">{t('footer.pharmacy')}</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t('footer.contact')}</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-accent" />
                <a href="tel:+251911234567" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  +251 911 234 567
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-accent" />
                <a href="mailto:info@abebechgobena.com" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  info@abebechgobena.com
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Clock size={16} className="text-accent mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  <p>{t('footer.hoursWeekdays')}</p>
                  <p>{t('footer.hoursWeekend')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} {t('footer.rightsReserved')}
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">{t('footer.privacyPolicy')}</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">{t('footer.termsOfService')}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
