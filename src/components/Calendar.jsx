import React from 'react';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import '../i18n';
// import './styles/calendar.scss';

export default React.memo(() => {
  const { t, i18n } = useTranslation();
  // i18n.changeLanguage('zh');
  return (
    <div className="main">
      <span>{t('week.mo')}</span>
    </div>
  );
});
