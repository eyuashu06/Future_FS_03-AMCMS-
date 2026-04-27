import { useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { LogIn, Mail, Lock, UserPlus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Login() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        toast.success(t('auth.loginSuccess'));
        // Check if admin or user and redirect
        // For now just redirect to root or last page
        setLocation('/');
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error(t('auth.loginErr'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-muted/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-background p-8 rounded-2xl shadow-xl border border-border">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
            <LogIn className="w-8 h-8 text-accent" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            {t('auth.signInTitle')}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {t('auth.welcomeSub')}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">{t('auth.emailOrUsername')}</Label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                </div>
                <Input
                  id="email"
                  type="text"
                  required
                  className="pl-10"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password">{t('auth.password')}</Label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  className="pl-10"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full h-11 text-lg font-medium"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  ...
                </div>
              ) : (
                t('auth.logIn')
              )}
            </Button>
          </div>
          
          <div className="text-center mt-4">
            <p className="text-sm text-muted-foreground">
              {t('auth.noAccount')}{' '}
              <button
                type="button"
                onClick={() => setLocation('/register')}
                className="font-medium text-accent hover:text-accent/80 transition-colors inline-flex items-center gap-1"
              >
                <UserPlus size={16} /> {t('auth.signUpNow')}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
