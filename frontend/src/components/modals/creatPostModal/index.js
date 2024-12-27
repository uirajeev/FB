import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Picker from 'emoji-picker-react';
import './style.scss';

const CreatPostModal = () => {
  const user = useSelector((state) => state.user);
  const [text, setText] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [picker, setPicker] = useState(false);
  const textRef = useRef(null);
  const { t } = useTranslation();

  const handelEmoji = ({ emoji }) => {
    const ref = textRef.current;
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setText(newText);
    setCursorPosition(start.length + emoji.length);
  };

  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

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
        {!showPreview && (
          <div className='post-box__post'>
            <textarea
              className='post-box__input'
              maxLength='500'
              value={text}
              ref={textRef}
              placeholder={t('post.whatsInMind') + user.first_name}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
          </div>
        )}
        <div className='post-box__emojis'>
          {picker && (
            <div className='post-box__emojis__picker rlmove'>
              <Picker height={400} lazyLoad={true} onEmojiClick={handelEmoji} />
            </div>
          )}
          <img src='../../../icons/colorful.png' alt='' />
          <i
            className='emoji_icon_large'
            onClick={(e) => setPicker((prev) => !prev)}
          />
        </div>
      </div>
    </div>
  );
};
export default CreatPostModal;
