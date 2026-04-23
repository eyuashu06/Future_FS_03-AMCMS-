import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { 
  BarChart3, 
  Users, 
  Calendar, 
  ClipboardList, 
  CreditCard, 
  UserCog, 
  Settings, 
  Menu, 
  X,
  LogOut,
  ChevronRight,
  Bell
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [location, setLocation] = useLocation();
  const { user, logout } = useAuth();

  const menuItems = [
    { label: 'Overview', icon: BarChart3, href: '/dashboard' },
    { label: 'Patients', icon: Users, href: '/dashboard/patients' },
    { label: 'Appointments', icon: Calendar, href: '/dashboard/appointments' },
    { label: 'Booking Requests', icon: ClipboardList, href: '/dashboard/requests' },
    { label: 'Payments / Billing', icon: CreditCard, href: '/dashboard/payments' },
    { label: 'Doctors / Staff', icon: UserCog, href: '/dashboard/staff' },
    { label: 'Reports', icon: BarChart3, href: '/dashboard/reports' },
    { label: 'Settings', icon: Settings, href: '/dashboard/settings' },
  ];

  const isActive = (href) => {
    if (href === '/dashboard' && location === '/dashboard') return true;
    if (href !== '/dashboard' && location.startsWith(href)) return true;
    return false;
  };

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="p-6 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground font-bold">
                AG
              </div>
              <span className="text-xl font-bold text-foreground">Clinic Admin</span>
            </Link>
            <button className="md:hidden" onClick={() => setIsSidebarOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link key={item.href} href={item.href}>
                  <div className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    active 
                      ? 'bg-accent text-accent-foreground' 
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}>
                    <item.icon size={20} />
                    <span>{item.label}</span>
                    {active && <ChevronRight size={16} className="ml-auto" />}
                  </div>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-border">
            <button 
              onClick={logout}
              className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
            >
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-40">
          <button className="md:hidden p-2 -ml-2" onClick={() => setIsSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          
          <div className="flex-1 px-4 hidden md:block">
            <h1 className="text-lg font-semibold text-foreground truncate">
              {menuItems.find(item => isActive(item.href))?.label || 'Dashboard'}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full"></span>
            </Button>
            <div className="flex items-center gap-3 pl-4 border-l border-border">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-foreground">{user?.full_name}</p>
                <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold">
                {user?.full_name?.charAt(0) || 'A'}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
