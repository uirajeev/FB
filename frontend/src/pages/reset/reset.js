import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import { logout } from '../../store/slices/userSlice';
import SearchAccount from '../../components/searchAccount';
import SendResetEmail from '../../components/sendResetEmail';
import CodeVerification from '../../components/codeVerification';

import './style.scss';

const Reset = () => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user);
  const [step, setStep] = useState(2);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [code, setCode] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    Cookies.set('user', '');
    dispatch(logout());
    navigate('/');
  };

  const goBack = () => {
    navigate('/');
  }

  return (
    <div className='reset'>
      <div className='reset__header'>
        <img src='../../icons/facebook.svg' alt='' />
        <div>
          {user ? (
            <div className='reset__header__title'>
              <Link to='/profile'>
                <img
                  src={user.picture}
                  alt={`${user.first_name} ${user.last_name}`}
                />
              </Link>
              <button onClick={logoutHandler} className='btn btn-blue'>
                {t('header.logout')}
              </button>
            </div>
          ) : (
            <Link to='/login' className='btn btn-blue'>
              {t('reset.back')}
            </Link>
          )}
        </div>
      </div>
      {step === 0 && <SearchAccount email={email} setEmail={setEmail} error={error} logout={goBack} />}
      {step === 1 && <SendResetEmail user={user} setStep={setStep} />}
      {step === 2 && <CodeVerification code={code} setStep={setStep} error={error} logout={goBack} />}
    </div>
  );
};

export default Reset;