import { useTranslation } from 'react-i18next';

import './registerForm.scss';

const RegisterForm = () => {
  const { t } = useTranslation();
  return (
    <div className="blur">
      <div className="register">
        <div className="register-header">
          <i className="exit_icon"></i>
          <h3>{t('signup.header')}</h3>
          <span>{t('signup.subheader')}</span>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
