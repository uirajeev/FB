import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import fetchData from '../../../helpers/fetchData';
import { verify } from '../../../store/slices/userSlice';
import Header from '../../../components/header';
import HomeLeft from '../left';
import HomeRight from '../right';
import Stories from '../stories';
import CreatePost from '../../../components/createPost';
import Activate from '../../../components/modals/Activate';
import '../style.scss';

const ActivateAccount = () => {
  const { t } = useTranslation();
  const user = useSelector(
    (state) => state.user,
    (prev, next) => prev === next
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useParams();

  const activateAccount = async () => {
    const { success, data, error } = await fetchData(
      '/user/activate',
      'POST',
      { token },
      {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      }
    );

    if (success) {
      setSuccess(data.message);
      Cookies.set('user', JSON.stringify({ ...user, verified: true }));
      dispatch(verify(true));
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 3000);
    }
    if (error) {
      setError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    activateAccount();
  }, []);

  return (
    <div className='home'>
      {success && (
        <Activate
          type='success'
          header={t('verify.successful')}
          text={success}
          loading={loading}
        />
      )}

      {error && (
        <Activate
          type='error'
          header={t('verify.failed')}
          text={error}
          loading={loading}
        />
      )}
      <Header />
      <HomeLeft user={user} />
      <article className='home-middle'>
        <Stories />
        <CreatePost user={user} />
      </article>
      <HomeRight user={user} />
    </div>
  );
};

export default ActivateAccount;
