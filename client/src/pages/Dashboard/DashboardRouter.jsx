import { useLocation } from 'wouter';
import { useTranslation } from 'react-i18next';
import DashboardLayout from './DashboardLayout';
import Overview from './Overview';
import Patients from './Patients';
import Appointments from './Appointments';

export default function DashboardRouter({ params }) {
  const section = params.section || 'overview';
  const { t } = useTranslation();

  const renderContent = () => {
    switch (section) {
      case 'overview':
        return <Overview />;
      case 'patients':
        return <Patients />;
      case 'appointments':
        return <Appointments />;
      // Placeholders for other sections as requested
      case 'requests':
        return (
          <div className="p-10 bg-card rounded-xl border border-border">
            <h2 className="text-xl font-bold mb-4">{t('dashboard.bookingRequests')}</h2>
            <p className="text-muted-foreground">{t('dashboard.requestsDesc')}</p>
          </div>
        );
      case 'payments':
        return (
          <div className="p-10 bg-card rounded-xl border border-border">
            <h2 className="text-xl font-bold mb-4">{t('dashboard.paymentsBilling')}</h2>
            <p className="text-muted-foreground">{t('dashboard.paymentsDesc')}</p>
          </div>
        );
      case 'staff':
        return (
          <div className="p-10 bg-card rounded-xl border border-border">
            <h2 className="text-xl font-bold mb-4">{t('dashboard.doctorsStaff')}</h2>
            <p className="text-muted-foreground">{t('dashboard.staffDesc')}</p>
          </div>
        );
      case 'reports':
        return (
          <div className="p-10 bg-card rounded-xl border border-border">
            <h2 className="text-xl font-bold mb-4">{t('dashboard.reports')}</h2>
            <p className="text-muted-foreground">{t('dashboard.reportsDesc')}</p>
          </div>
        );
      case 'settings':
        return (
          <div className="p-10 bg-card rounded-xl border border-border">
            <h2 className="text-xl font-bold mb-4">{t('dashboard.settings')}</h2>
            <p className="text-muted-foreground">{t('dashboard.settingsDesc')}</p>
          </div>
        );
      default:
        return <Overview />;
    }
  };

  return (
    <DashboardLayout>
      {renderContent()}
    </DashboardLayout>
  );
}
