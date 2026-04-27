import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calendar, Clock, User, Phone, Mail, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
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



export default function Appointment() {
  const { t } = useTranslation();
  
  const appointmentSchema = z.object({
    fullName: z.string().min(1, t('formValidation.enterName')),
    email: z.string().email(t('formValidation.enterEmail')).min(1, t('formValidation.fillField')),
    phone: z.string().min(10, t('formValidation.enterPhone')),
    serviceId: z.string().min(1, t('formValidation.chooseService')),
    appointmentDate: z.string().min(1, t('formValidation.selectDate')),
    appointmentTime: z.string().min(1, t('formValidation.selectTime')),
    doctor: z.string().optional(),
    message: z.string().optional()
  });
  
  const [services, setServices] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { user } = useAuth();

  // Fetch services from backend
  useEffect(() => {
    api.get('/services')
      .then((res) => setServices(res.data.data || []))
      .catch(() => toast.error(t('booking.failedMsg')));
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
    defaultValues: {
      fullName: user?.full_name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      serviceId: '',
      appointmentDate: '',
      appointmentTime: '',
      doctor: '',
      message: ''
    }
  });

  useEffect(() => {
    if (user) {
      setValue('fullName', user.full_name || '');
      setValue('email', user.email || '');
      setValue('phone', user.phone || '');
    }
  }, [user, setValue]);

  const selectedDate = watch('appointmentDate');
  const selectedTime = watch('appointmentTime');

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await api.post('/appointments', {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        doctor: data.doctor || null,
        serviceId: parseInt(data.serviceId),
        appointmentDate: data.appointmentDate,
        appointmentTime: data.appointmentTime,
        message: data.message || null,
      });

      toast.success(t('booking.successSubmit'));
      setIsSuccess(true);
      reset();
    } catch (error) {
      toast.error(error.message || t('booking.failSubmit'));
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
        <h1 className="text-3xl font-bold text-foreground mb-4">{t('booking.booked')}</h1>
        <p className="text-muted-foreground max-w-md mb-8">{t('booking.bookedMsg').replace('{{name}}', user?.full_name)}</p>
        <div className="flex gap-4">
          <Button onClick={() => setIsSuccess(false)} variant="outline">{t('booking.bookAnother')}</Button>
          <Button onClick={() => window.location.href = '/'}>{t('booking.goToHome')}</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="bg-gradient-to-br from-background to-muted py-16 md:py-24">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t('booking.bookAnAppointment')}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">{t('booking.scheduleYourVisit')} {t('booking.loggedInAs')} <span className="font-semibold text-foreground">{user?.full_name}</span>.
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="section-spacing">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Patient Details */}
              <div className="medical-card">
                <h2 className="text-2xl font-semibold text-foreground mb-6">{t('booking.patientDetails')}</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fullName" className="text-foreground font-medium mb-2">{t('booking.fullName')}</Label>
                    <Input id="fullName" {...register('fullName')} className="border-border" placeholder="e.g. John Doe" />
                    {errors.fullName && <p className="text-sm text-destructive mt-1">{errors.fullName.message}</p>}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email" className="text-foreground font-medium mb-2">{t('booking.emailAddress')}</Label>
                      <Input id="email" type="email" {...register('email')} className="border-border" placeholder="john@example.com" />
                      {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-foreground font-medium mb-2">{t('booking.phoneNumber')}</Label>
                      <Input id="phone" {...register('phone')} className="border-border" placeholder="+251 911 234 567" />
                      {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Appointment Details */}
              <div className="medical-card">
                <h2 className="text-2xl font-semibold text-foreground mb-6">{t('booking.appointmentDetails')}</h2>
                <div className="space-y-4">
                  {/* Service Selection */}
                  <div>
                    <Label htmlFor="serviceId" className="text-foreground font-medium mb-2">{t('booking.selectService')}</Label>
                    <Select onValueChange={(val) => setValue('serviceId', val)}>
                      <SelectTrigger className="border-border">
                        <SelectValue placeholder={t('booking.chooseService')} />
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
                        <Calendar size={18} className="text-accent" /> {t('booking.preferredDate')}
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
                        <Clock size={18} className="text-accent" /> {t('booking.preferredTime')}
                      </div>
                    </Label>
                    <Select onValueChange={(val) => setValue('appointmentTime', val)}>
                      <SelectTrigger className="border-border">
                        <SelectValue placeholder={t('booking.chooseTime')} />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>{time}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.appointmentTime && <p className="text-sm text-destructive mt-1">{errors.appointmentTime.message}</p>}
                  </div>

                  {/* Doctor (Optional) */}
                  <div>
                    <Label htmlFor="doctor" className="text-foreground font-medium mb-2">{t('booking.preferredDoctor')}</Label>
                    <Input id="doctor" placeholder="e.g. Dr. Abebe" {...register('doctor')} className="border-border" />
                  </div>

                  {/* Message */}
                  <div>
                    <Label htmlFor="message" className="text-foreground font-medium mb-2">{t('booking.additionalNotes')}</Label>
                    <Textarea
                      id="message"
                      placeholder={t('booking.notesPlaceholder')}
                      {...register('message')}
                      className="border-border"
                      rows={4}
                    />
                  </div>
                </div>
              </div>

              {/* Summary */}
              {selectedDate && selectedTime && (
                <div className="medical-card bg-accent/5 border-accent">
                  <h3 className="font-semibold text-foreground mb-2">{t('booking.appointmentSummary')}</h3>
                  <p className="text-sm text-muted-foreground">{t('booking.date')} <span className="font-medium text-foreground">{selectedDate}</span></p>
                  <p className="text-sm text-muted-foreground">{t('booking.time')} <span className="font-medium text-foreground">{selectedTime}</span></p>
                </div>
              )}

              {/* Submit */}
              <Button type="submit" disabled={isSubmitting} className="w-full cta-button">
                {isSubmitting ? t('booking.bookingStatus') : t('booking.confirmAppointmentBtn')}
              </Button>

              <p className="text-xs text-muted-foreground text-center">{t('booking.requiredFields')}</p>
            </form>
          </div>
        </div>
      </section>

      {/* Before Your Appointment */}
      <section className="section-spacing bg-light-gray">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">{t('booking.beforeAppointment')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="medical-card">
              <h3 className="text-lg font-semibold text-foreground mb-3">{t('booking.whatToBring')}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>{t('booking.bring1')}</li>
                <li>{t('booking.bring2')}</li>
                <li>{t('booking.bring3')}</li>
                <li>{t('booking.bring4')}</li>
              </ul>
            </div>
            <div className="medical-card">
              <h3 className="text-lg font-semibold text-foreground mb-3">{t('booking.preparation')}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>{t('booking.prep1')}</li>
                <li>{t('booking.prep2')}</li>
                <li>{t('booking.prep3')}</li>
                <li>{t('booking.prep4')}</li>
              </ul>
            </div>
            <div className="medical-card">
              <h3 className="text-lg font-semibold text-foreground mb-3">{t('booking.cancellation')}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>{t('booking.canc1')}</li>
                <li>{t('booking.canc2')}</li>
                <li>{t('booking.canc3')}</li>
                <li>{t('booking.canc4')}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
