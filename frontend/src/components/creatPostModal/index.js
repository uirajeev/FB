import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import useClickOutside from '../../helpers/ClickOutside';
import useCssRootColor from '../../hooks/useCssRootColor';
import createPost from '../../helpers/creatPost';
import creatImagePost from '../../helpers/createImagePost';
import EmojiPicker from './emojiPicker';
import AddToPost from './addToPost';
import ImagePreview from './imagePreview';
import PostError from './postError';
import './style.scss';

const CreatPostModal = ({ setVisible }) => {
  const user = useSelector((state) => state.user);
  const { t } = useTranslation();
  const modalRef = useRef(null);
  const [text, setText] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [images, setImages] = useState([]);
  const [background, setBackground] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const color = useCssRootColor('--bg-primary');

  const postData = async () => {
    if (!text && images.length === 0) {
      setError('Please right you post!');
      return;
    }
    setLoading(true);
    const postText = text ? text : null;

    if (images.length) {
      const { success, data, error } = await creatImagePost(
        images,
        postText,
        null,
        user
      );
      if (success) {
        setText('');
        setVisible(false);
      } else {
        setError(error);
      }
      setLoading(false);
      return;
    }
    
    const { success, error } = await createPost(
      null,
      background,
      postText,
      null,
      user.id,
      user.token
    );
    setLoading(false);
    if (success) {
      setBackground(null);
      setText('');
      setVisible(false);
    } else {
      setError(error);
    }
  };

  useClickOutside(modalRef, () => {
    setVisible(false);
  });

  return (
    <div className='blur'>
      <div className='post-box' ref={modalRef}>
        {error && <PostError error={error} setError={setError} />}
        <div className='post-box__header'>
          <div
            className='post-box__header__circle small-circle'
            onClick={() => setVisible(false)}
          >
            <i className='exit_icon'></i>
          </div>
          <span>{t('post.createPost')}</span>
        </div>

        <div className='post-box__profile'>
          <img
            src={user.picture}
            alt={`${user.first_name}`}
            className='post-box__profile__img'
          />
          <div className='post-box__profile__col'>
            <div className='post-box__profile__name'>
              {user.first_name} {user.last_name}
            </div>
            <div className='post-box__profile__privacy'>
              <img src='../../icons/public.png' alt='' />
              <span>{t('post.public')}</span>
              <i className='arrowDown_icon' />
            </div>
          </div>
        </div>
        {!showPreview ? (
          <EmojiPicker
            text={text}
            user={user}
            setText={setText}
            setBackground={setBackground}
          />
        ) : (
          <ImagePreview
            text={text}
            user={user}
            images={images}
            setImages={setImages}
            setText={setText}
            setShowPreview={setShowPreview}
            setError={setError}
          />
        )}
        <AddToPost setShowPreview={setShowPreview} />
        <button
          className='btn btn-blue post-button'
          onClick={postData}
          disabled={loading}
        >
          {loading ? <PulseLoader size={8} color={color} /> : t('post.post')}
        </button>
      </div>
    </div>
  );
};
export default CreatPostModal;
