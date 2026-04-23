import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MapPin, Phone, Mail, Clock, Send, PhoneCall, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import api from '@/lib/api';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await api.post('/contact', data);
      toast.success("Message sent successfully! We'll get back to you soon.");
      reset();
    } catch (error) {
      toast.error(error.message || 'Failed to send message.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const heroImage = "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000";

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <img 
          src={heroImage} 
          alt="Contact Us Banner" 
          className="absolute inset-0 w-full h-full object-cover brightness-50"
        />
        <div className="container relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">Contact Us</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light">
            We are here to assist you. Reach out to us for any medical or humanitarian inquiries.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-10">
              <div>
                <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Abebech Gobena Charity is at the frontline of assisting vulnerable women and children. 
                  Contact our medical center or office for more information about our services.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="medical-card border-none bg-muted/50 p-6">
                  <PhoneCall size={28} className="text-accent mb-4" />
                  <h3 className="font-bold text-lg mb-2">Hospital (MCH)</h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>+251 118 694 406</p>
                    <p>+251 951 555 555</p>
                  </div>
                </div>
                <div className="medical-card border-none bg-muted/50 p-6">
                  <Phone size={28} className="text-accent mb-4" />
                  <h3 className="font-bold text-lg mb-2">Main Office</h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>+251 118 694 629</p>
                    <p>+251 111 553 622</p>
                  </div>
                </div>
                <div className="medical-card border-none bg-muted/50 p-6">
                  <Mail size={28} className="text-accent mb-4" />
                  <h3 className="font-bold text-lg mb-2">Email Address</h3>
                  <p className="text-sm text-muted-foreground">info@abebechgobenacharity.org</p>
                </div>
                <div className="medical-card border-none bg-muted/50 p-6">
                  <MapPin size={28} className="text-accent mb-4" />
                  <h3 className="font-bold text-lg mb-2">P.O. Box</h3>
                  <p className="text-sm text-muted-foreground">24998, Addis Ababa</p>
                </div>
              </div>

              {/* Hours */}
              <div className="medical-card border-l-4 border-l-accent p-8 bg-accent/5">
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="text-accent" />
                  <h3 className="text-xl font-bold">Clinical Hours</h3>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm font-medium">
                  <div className="text-muted-foreground uppercase">Emergency & Delivery</div>
                  <div className="text-accent text-right">24/7 Hours</div>
                  <div className="text-muted-foreground uppercase">General OPD</div>
                  <div className="text-foreground text-right">Mon - Fri: 8 AM - 6 PM</div>
                  <div className="text-muted-foreground uppercase">Laboratory</div>
                  <div className="text-foreground text-right">Mon - Sat: 8 AM - 7 PM</div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-card border border-border p-10 rounded-3xl shadow-xl shadow-muted/20">
              <h2 className="text-2xl font-bold mb-8">Send us a Message</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input id="name" {...register('name')} placeholder="Your name" />
                    {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" {...register('email')} placeholder="Email address" />
                    {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number (Optional)</Label>
                  <Input id="phone" {...register('phone')} placeholder="+251 ..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea id="message" {...register('message')} placeholder="How can we help you?" rows={6} className="resize-none" />
                  {errors.message && <p className="text-xs text-destructive">{errors.message.message}</p>}
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full h-14 text-lg font-bold cta-button">
                  {isSubmitting ? 'Sending...' : 'Submit Inquiry'} <Send size={20} className="ml-2" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="flex flex-col items-center text-center mb-10">
            <MapPin size={40} className="text-accent mb-4" />
            <h2 className="text-3xl font-bold mb-4">Location & Directions</h2>
            <p className="text-muted-foreground max-w-xl">
              Visit us at our main location in Addis Ababa, Ethiopia. We have easy access and ample parking.
            </p>
          </div>
          <div className="w-full h-[500px] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.7!2d38.75!3d9.03!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cecc1d0001%3A0x1234567890!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2set!4v1234567890"
              allowFullScreen
              loading="lazy"
              title="Abebech Gobena Hospital Location"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
