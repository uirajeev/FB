import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import EmojiPicker from './emojiPicker';
import AddToPost from './addToPost';
import ImagePreview from './imagePreview';
import './style.scss';

const CreatPostModal = () => {
  const user = useSelector((state) => state.user);
  const { t } = useTranslation();
  const [text, setText] = useState('');
  const [showPreview, setShowPreview] = useState(true);
  const [images, setImages] = useState([]);

  return (
    <div className='blur'>
      <div className='post-box'>
        <div className='post-box__header'>
          <div className='post-box__header__circle small-circle'>
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
          <EmojiPicker text={text} user={user} setText={setText} />
        ) : (
          <ImagePreview
            text={text}
            user={user}
            images={images}
            setImages={setImages}
            setText={setText}
            setShowPreview={setShowPreview}
          />
        )}
        <AddToPost setShowPreview={setShowPreview} />
        <button className='btn btn-blue post-button'>{t('post.post')}</button>
      </div>
    </div>
  );
};
export default CreatPostModal;
