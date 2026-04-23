import { useLocation } from 'wouter';
import DashboardLayout from './DashboardLayout';
import Overview from './Overview';
import Patients from './Patients';
import Appointments from './Appointments';

export default function DashboardRouter({ params }) {
  const section = params.section || 'overview';

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
            <h2 className="text-xl font-bold mb-4">Booking Requests</h2>
            <p className="text-muted-foreground">This section will list new web booking requests that haven't been confirmed yet.</p>
          </div>
        );
      case 'payments':
        return (
          <div className="p-10 bg-card rounded-xl border border-border">
            <h2 className="text-xl font-bold mb-4">Payments & Billing</h2>
            <p className="text-muted-foreground">Financial overview and billing management.</p>
          </div>
        );
      case 'staff':
        return (
          <div className="p-10 bg-card rounded-xl border border-border">
            <h2 className="text-xl font-bold mb-4">Doctors & Staff Management</h2>
            <p className="text-muted-foreground">Manage clinic medical professionals and administrative staff.</p>
          </div>
        );
      case 'reports':
        return (
          <div className="p-10 bg-card rounded-xl border border-border">
            <h2 className="text-xl font-bold mb-4">Reports & Analytics</h2>
            <p className="text-muted-foreground">Advanced reports on clinic performance and patient outcomes.</p>
          </div>
        );
      case 'settings':
        return (
          <div className="p-10 bg-card rounded-xl border border-border">
            <h2 className="text-xl font-bold mb-4">Clinic Settings</h2>
            <p className="text-muted-foreground">General clinic configurations and system settings.</p>
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
