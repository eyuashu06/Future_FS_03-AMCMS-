import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="medical-card max-w-md w-full">
        <h1 className="text-6xl font-bold text-accent mb-4">{t('common.err404')}</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-4">{t('common.pageNotFound')}</h2>
        <p className="text-muted-foreground mb-8">
          {t('common.pageMissingStr')}
        </p>
        <Link href="/" className="cta-button inline-flex">{t('common.returnToHome')}</Link>
      </div>
    </div>
  );
}
