import { Link } from 'wouter';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Clinic Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Abebech Gobena</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Providing quality healthcare services to our community with compassion and expertise.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <MapPin size={16} className="text-accent" />
              <span>Addis Ababa, Ethiopia</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-muted-foreground hover:text-accent transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-accent transition-colors">About Us</Link></li>
              <li><Link href="/services" className="text-sm text-muted-foreground hover:text-accent transition-colors">Services</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-accent transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="/services" className="text-sm text-muted-foreground hover:text-accent transition-colors">General Consultation</a></li>
              <li><a href="/services" className="text-sm text-muted-foreground hover:text-accent transition-colors">Dental Care</a></li>
              <li><a href="/services" className="text-sm text-muted-foreground hover:text-accent transition-colors">Laboratory Tests</a></li>
              <li><a href="/services" className="text-sm text-muted-foreground hover:text-accent transition-colors">Pharmacy</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
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
                  <p>Mon - Fri: 8:00 AM - 6:00 PM</p>
                  <p>Sat: 9:00 AM - 2:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} Abebech Gobena Medical Clinic. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
