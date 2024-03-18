import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <h1 className="h4 text-muted">{t('notFound.header')}</h1>
      <p className="text-muted">{t('notFound.message')}</p>
      <a href="/">{t('notFound.linkText')}</a>
    </div>
  );
};

export default NotFoundPage;
