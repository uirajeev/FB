import { useTranslation } from 'react-i18next';
import './style.scss';

const PostError = ({ error, setError }) => {
  const { t } = useTranslation();
  return (
    <div className='post__error'>
      <div className='error-text'>{error}</div>
      <button onClick={() => setError('')} className='btn btn-blue'>{t('try')}</button>
    </div>
  );
};

export default PostError;
