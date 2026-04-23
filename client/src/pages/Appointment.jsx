import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calendar, Clock, User, Phone, Mail, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import api from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

const appointmentSchema = z.object({
  serviceId: z.string().min(1, 'Please select a service'),
  appointmentDate: z.string().min(1, 'Please select a date'),
  appointmentTime: z.string().min(1, 'Please select a time'),
  notes: z.string().optional(),
});

export default function Appointment() {
  const [services, setServices] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { user } = useAuth();

  // Fetch services from backend
  useEffect(() => {
    api.get('/services')
      .then((res) => setServices(res.data.data || []))
      .catch(() => toast.error('Failed to load services. Please refresh the page.'));
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(appointmentSchema),
  });

  const selectedDate = watch('appointmentDate');
  const selectedTime = watch('appointmentTime');

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await api.post('/appointments', {
        serviceId: parseInt(data.serviceId),
        appointmentDate: data.appointmentDate,
        appointmentTime: data.appointmentTime,
        notes: data.notes || null,
      });

      toast.success('Appointment booked successfully!');
      setIsSuccess(true);
      reset();
    } catch (error) {
      toast.error(error.message || 'Failed to book appointment. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00',
  ];

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    return maxDate.toISOString().split('T')[0];
  };

  if (isSuccess) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-12 h-12 text-emerald-600" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-4">Appointment Booked!</h1>
        <p className="text-muted-foreground max-w-md mb-8">
          Thank you, {user?.full_name}. We have received your request for an appointment. 
          Our staff will review it and send a confirmation to your email shortly.
        </p>
        <div className="flex gap-4">
          <Button onClick={() => setIsSuccess(false)} variant="outline">Book Another</Button>
          <Button onClick={() => window.location.href = '/'}>Go to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="bg-gradient-to-br from-background to-muted py-16 md:py-24">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Book an Appointment</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Schedule your visit with our healthcare professionals. 
            Currently logged in as <span className="font-semibold text-foreground">{user?.full_name}</span>.
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="section-spacing">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* User Account Info (Read-only reminder) */}
              <div className="medical-card bg-muted/20 border-dotted">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Booking Account</h3>
                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <User size={16} className="text-accent" /> {user?.full_name}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <Mail size={16} className="text-accent" /> {user?.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <Phone size={16} className="text-accent" /> {user?.phone}
                  </div>
                </div>
              </div>

              {/* Appointment Details */}
              <div className="medical-card">
                <h2 className="text-2xl font-semibold text-foreground mb-6">Appointment Details</h2>
                <div className="space-y-4">
                  {/* Service Selection */}
                  <div>
                    <Label htmlFor="serviceId" className="text-foreground font-medium mb-2">Select Service *</Label>
                    <Select onValueChange={(val) => setValue('serviceId', val)}>
                      <SelectTrigger className="border-border">
                        <SelectValue placeholder="Choose a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.id} value={service.id.toString()}>
                            {service.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.serviceId && <p className="text-sm text-destructive mt-1">{errors.serviceId.message}</p>}
                  </div>

                  {/* Date */}
                  <div>
                    <Label htmlFor="appointmentDate" className="text-foreground font-medium">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar size={18} className="text-accent" /> Preferred Date *
                      </div>
                    </Label>
                    <Input
                      id="appointmentDate"
                      type="date"
                      min={getMinDate()}
                      max={getMaxDate()}
                      {...register('appointmentDate')}
                      className="border-border"
                    />
                    {errors.appointmentDate && <p className="text-sm text-destructive mt-1">{errors.appointmentDate.message}</p>}
                  </div>

                  {/* Time */}
                  <div>
                    <Label htmlFor="appointmentTime" className="text-foreground font-medium">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock size={18} className="text-accent" /> Preferred Time *
                      </div>
                    </Label>
                    <Select onValueChange={(val) => setValue('appointmentTime', val)}>
                      <SelectTrigger className="border-border">
                        <SelectValue placeholder="Choose a time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>{time}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.appointmentTime && <p className="text-sm text-destructive mt-1">{errors.appointmentTime.message}</p>}
                  </div>

                  {/* Notes */}
                  <div>
                    <Label htmlFor="notes" className="text-foreground font-medium mb-2">Additional Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any additional information or concerns you'd like us to know about?"
                      {...register('notes')}
                      className="border-border"
                      rows={4}
                    />
                  </div>
                </div>
              </div>

              {/* Summary */}
              {selectedDate && selectedTime && (
                <div className="medical-card bg-accent/5 border-accent">
                  <h3 className="font-semibold text-foreground mb-2">Appointment Summary</h3>
                  <p className="text-sm text-muted-foreground">Date: <span className="font-medium text-foreground">{selectedDate}</span></p>
                  <p className="text-sm text-muted-foreground">Time: <span className="font-medium text-foreground">{selectedTime}</span></p>
                </div>
              )}

              {/* Submit */}
              <Button type="submit" disabled={isSubmitting} className="w-full cta-button">
                {isSubmitting ? 'Booking...' : 'Confirm Appointment'}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                * Required fields. We will contact you to confirm your appointment.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Before Your Appointment */}
      <section className="section-spacing bg-light-gray">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Before Your Appointment</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="medical-card">
              <h3 className="text-lg font-semibold text-foreground mb-3">What to Bring</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Valid ID or passport</li>
                <li>• Insurance card (if applicable)</li>
                <li>• Medical records</li>
                <li>• List of current medications</li>
              </ul>
            </div>
            <div className="medical-card">
              <h3 className="text-lg font-semibold text-foreground mb-3">Preparation</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Arrive 10 minutes early</li>
                <li>• Wear comfortable clothing</li>
                <li>• Avoid heavy meals before</li>
                <li>• Bring a list of questions</li>
              </ul>
            </div>
            <div className="medical-card">
              <h3 className="text-lg font-semibold text-foreground mb-3">Cancellation</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Cancel 24 hours in advance</li>
                <li>• Call us at +251 911 234 567</li>
                <li>• Reschedule anytime</li>
                <li>• No cancellation fees</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
