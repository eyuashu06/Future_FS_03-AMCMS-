import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Calendar, 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle, 
  XCircle, 
  Clock,
  Trash2,
  ExternalLink
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import api from '@/lib/api';
import { toast } from 'sonner';

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await api.get('/admin/appointments');
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (err) {
      toast.error(t('dashboard.failedLoadAppointments'));
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      const res = await api.patch(`/admin/appointments/${id}/status`, { status });
      if (res.data.success) {
        toast.success(t('dashboard.appointmentStatusSuccess'));
        fetchAppointments();
      }
    } catch (err) {
      toast.error(err.message || t('dashboard.failedUpdateStatus'));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(t('dashboard.confirmDeleteAppointment'))) {
      try {
        const res = await api.delete(`/admin/appointments/${id}`);
        if (res.data.success) {
          toast.success(t('dashboard.appointmentDeleted'));
          fetchAppointments();
        }
      } catch (err) {
        toast.error(t('dashboard.failedDeleteAppointment'));
      }
    }
  };

  const filteredAppointments = appointments.filter(a => 
    a.patient_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.service?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-emerald-100 text-emerald-700';
      case 'pending': return 'bg-amber-100 text-amber-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      case 'cancelled': return 'bg-destructive/10 text-destructive';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  if (loading) return <div className="p-10 text-center">{t('dashboard.loadingAppointments')}</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input 
            placeholder={t('dashboard.searchByPatientOrService')}
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline"><Filter size={18} className="mr-2" /> {t('dashboard.filter')}</Button>
          <Button className="cta-button">{t('dashboard.newAppointment')}</Button>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-muted/50 text-xs uppercase text-muted-foreground font-semibold">
              <tr>
                <th className="px-6 py-4">{t('dashboard.patient')}</th>
                <th className="px-6 py-4">{t('dashboard.service')}</th>
                <th className="px-6 py-4">{t('dashboard.dateAndTime')}</th>
                <th className="px-6 py-4">{t('dashboard.status')}</th>
                <th className="px-6 py-4 text-right">{t('dashboard.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredAppointments.map((app) => (
                <tr key={app.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{app.patient_name}</td>
                  <td className="px-6 py-4 text-sm">{app.service}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col text-xs text-muted-foreground">
                      <div className="flex items-center gap-1"><Calendar size={12} /> {app.date}</div>
                      <div className="flex items-center gap-1"><Clock size={12} /> {app.time}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(app.status)}`}>
                      {app.status === 'confirmed' ? t('dashboard.statusConfirmed') : app.status === 'pending' ? t('dashboard.statusPending') : app.status === 'completed' ? t('dashboard.statusCompleted') : app.status === 'cancelled' ? t('dashboard.statusCancelled') : app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical size={18} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleStatusUpdate(app.id, 'confirmed')} className="cursor-pointer">
                          <CheckCircle size={14} className="mr-2 text-emerald-600" /> {t('dashboard.confirm')}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusUpdate(app.id, 'cancelled')} className="cursor-pointer">
                          <XCircle size={14} className="mr-2 text-destructive" /> {t('dashboard.cancel')}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusUpdate(app.id, 'completed')} className="cursor-pointer text-blue-600">
                          <CheckCircle size={14} className="mr-2" /> {t('dashboard.markCompleted')}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <ExternalLink size={14} className="mr-2" /> {t('dashboard.viewDetails')}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(app.id)} className="cursor-pointer text-destructive">
                          <Trash2 size={14} className="mr-2" /> {t('dashboard.delete')}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
              {filteredAppointments.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-muted-foreground">
                    {t('dashboard.noAppointmentsFound')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
