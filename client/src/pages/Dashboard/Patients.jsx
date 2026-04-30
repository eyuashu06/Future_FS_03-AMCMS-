import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Users, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Mail, 
  Phone, 
  Calendar 
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

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await api.get('/admin/users');
        if (res.data.success) {
          setPatients(res.data.data);
        }
      } catch (err) {
        toast.error(t('dashboard.failedLoadPatients'));
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  const filteredPatients = patients.filter(p => 
    p.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.phone?.includes(searchTerm)
  );

  if (loading) return <div className="p-10 text-center">{t('dashboard.loadingPatients')}</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input 
            placeholder={t('dashboard.searchPatients')}
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter size={18} /> {t('dashboard.filter')}
        </Button>
      </div>

      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-muted/50 text-xs uppercase text-muted-foreground font-semibold">
              <tr>
                <th className="px-6 py-4">{t('dashboard.patientInformation')}</th>
                <th className="px-6 py-4">{t('dashboard.contactDetails')}</th>
                <th className="px-6 py-4">{t('dashboard.registeredDate')}</th>
                <th className="px-6 py-4">{t('dashboard.status')}</th>
                <th className="px-6 py-4 text-right">{t('dashboard.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-sm">
                        {patient.full_name?.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{patient.full_name}</p>
                        <p className="text-xs text-muted-foreground">ID: #PT-{patient.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Mail size={12} /> {patient.email}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Phone size={12} /> {patient.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Calendar size={14} /> {new Date(patient.created_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                      {t('dashboard.active')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal size={18} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="cursor-pointer">{t('dashboard.viewRecords')}</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">{t('dashboard.editProfile')}</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-destructive">{t('dashboard.deactivate')}</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
              {filteredPatients.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-muted-foreground">
                    {t('dashboard.noPatientsFound')}
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
