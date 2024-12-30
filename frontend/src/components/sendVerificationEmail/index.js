import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import fetchData from '../../helpers/fetchData';

import './style.scss';

const SandVerificationEmail = ({ user }) => {
  const { t } = useTranslation();
  const [success, setSuccess] = useState(null);

  const sendMail = async () => {
    const headers = {
      Authorization: `Bearer ${user.token}`,
    };
    const { success } = await fetchData('/user/resendverifyemail', 'POST', null, headers);
    if (success) {
        setSuccess(true);
      } else {
        setSuccess(false);
      }
  };
  return (
    <div className='send-verification'>
      <p>{t('user.verifyText')}</p>
      <button onClick={sendMail} className='btn-link'>
        {t('user.verifyButton')}
      </button>
      {success === true && <p className='success-text'>{t('user.emailSent')}</p>}
      {success === false && <p className='error-text'>{t('user.emailNotSent')}</p>}
    </div>
  );
};

export default SandVerificationEmail;
