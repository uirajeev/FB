import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { verify } from '../../store/slices/userSlice';
import Header from '../../components/header';
import HomeLeft from './left';
import HomeRight from './right';
import Stories from './stories';
import CreatePost from '../../components/createPost';
import Activate from '../../components/form/Activate/Activate';
import './style.scss';

const ActivateAccount = () => {
  const user = useSelector((state) => state.user, (prev, next) => prev === next);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useParams();

  const activateAccount = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/activate`,
        { token },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = res.data;
      if (data.error) {
        setError(data.error);
      } else {
        setSuccess(data.message);
        Cookies.set('user', JSON.stringify({...user, verified: true}));
        dispatch(verify(true));
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 3000);
      }
      setLoading(false);
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    activateAccount();
  }, []);

  return (
    <div className='home'>
      {success && (
        <Activate
          type='success'
          header='Account verification successful'
          text={success}
          loading={loading}
        />
      )}

      {error && (
        <Activate
          type='error'
          header='Account verification failed'
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