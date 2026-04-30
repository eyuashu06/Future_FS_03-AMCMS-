import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Users, 
  Calendar, 
  Clock, 
  TrendingUp, 
  Search,
  MoreVertical
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import api from '@/lib/api';
import { toast } from 'sonner';

export default function Overview() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/admin/stats');
        if (res.data.success) {
          setData(res.data.data);
        }
      } catch (err) {
        toast.error(t('dashboard.failedLoadData'));
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center p-20">{t('dashboard.loadingStats')}</div>;
  }

  const stats = [
    { label: t('dashboard.totalPatients'), value: data?.stats.totalPatients, icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: t('dashboard.totalAppointments'), value: data?.stats.totalAppointments, icon: Calendar, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { label: t('dashboard.pendingBookings'), value: data?.stats.pendingAppointments, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-100' },
    { label: t('dashboard.revenue'), value: data?.stats.totalRevenue, icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-100' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-card p-6 rounded-2xl border border-border flex items-center gap-4">
            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card p-6 rounded-2xl border border-border">
          <h3 className="text-lg font-bold text-foreground mb-6">{t('dashboard.patientRegistrations')}</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data?.growthChart}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="count" stroke="#0EA5E9" strokeWidth={2} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card p-6 rounded-2xl border border-border">
          <h3 className="text-lg font-bold text-foreground mb-6">{t('dashboard.appointmentStatus')}</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data?.statusChart}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="status" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                   contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0' }}
                />
                <Bar dataKey="count" fill="#10B981" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h3 className="text-lg font-bold text-foreground">{t('dashboard.recentActivity')}</h3>
          <button className="text-accent text-sm font-medium hover:underline">{t('dashboard.viewAll')}</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-muted/50 text-xs uppercase text-muted-foreground font-semibold">
              <tr>
                <th className="px-6 py-4">{t('dashboard.patient')}</th>
                <th className="px-6 py-4">{t('dashboard.service')}</th>
                <th className="px-6 py-4">{t('dashboard.dateAndTime')}</th>
                <th className="px-6 py-4">{t('dashboard.status')}</th>
                <th className="px-6 py-4">{t('dashboard.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {data?.recentActivity?.map((activity) => (
                <tr key={activity.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{activity.patient_name}</td>
                  <td className="px-6 py-4 text-muted-foreground text-sm">{activity.service}</td>
                  <td className="px-6 py-4 text-muted-foreground text-sm">
                    {activity.date} {t('dashboard.atTime')} {activity.time}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      activity.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' :
                      activity.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {activity.status === 'confirmed' ? t('dashboard.statusConfirmed') : activity.status === 'pending' ? t('dashboard.statusPending') : activity.status === 'completed' ? t('dashboard.statusCompleted') : activity.status === 'cancelled' ? t('dashboard.statusCancelled') : activity.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-1 hover:bg-muted rounded-md text-muted-foreground">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
