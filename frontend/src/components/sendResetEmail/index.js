import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import BaseCard from '../baseCard';
import fetchData from '../../helpers/fetchData';
import InlineLoader from '../inlineLoader';

import './style.scss';

const SendResetEmail = ({ user, setStep }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const goBack = () => {
    setStep(0);
  };

  const sendCode = async () => {
    setLoading(true);
    setError('');
    const { success, error } = await fetchData('/user/sendcode', 'POST', {
      email: user.email,
    });
    if (success) {
      setStep(2);
    } else {
      setError(error);
    }
    setLoading(false);
  };

  return (
    <div className='reset__content'>
      <BaseCard>
        <div className='reset__content__title'>
          <h3>{t('reset.resetPassword')}</h3>
          <hr className='splitter' />
        </div>

        <div className='reset__content__form'>
          <div className='reset__content__form__text'>
            <div className='reset__content__form__input'>
              <p>{t('reset.subTitle')}</p>
              <label htmlFor='email'>
                <input type='radio' checked readOnly />
                {t('reset.sendEmailToReset')} <br />
                {user && user.email}
              </label>
            </div>
            <div className='reset__content__form__img'>
              <img src={user && user.picture} alt='' />
              <div>
                <div className='text-ellipsis'>{user && user.email}</div>
                {t('reset.fbUser')}
              </div>
            </div>
          </div>
          <InlineLoader loading={loading} error={error} />
          <hr className='splitter' />

          <div className='search__content__form__buttons'>
            <button className='btn btn-gray' onClick={goBack}>
              {t('reset.notYou')}
            </button>
            <button className='btn btn-blue' onClick={sendCode}>
              {t('reset.send')}
            </button>
          </div>
        </div>
      </BaseCard>
    </div>
  );
};

export default SendResetEmail;
