import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import useClickOutside from '../../../helpers/ClickOutside';
import Picker from 'emoji-picker-react';

import './style.scss';

const EmojiPicker = ({ text, user, setText, type2, setBackground }) => {
  const { t } = useTranslation();
  const [cursorPosition, setCursorPosition] = useState(0);
  const [picker, setPicker] = useState(false);
  const [showBg, setShowBg] = useState();
  const pickerRef = useRef(null);
  const textRef = useRef(null);
  const bgRef = useRef(null);
  const imagesUrl = Array(9).fill('../../../images/postBackgrounds/');

  const handelEmoji = ({ emoji }) => {
    const ref = textRef.current;
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setText(newText);
    setCursorPosition(start.length + emoji.length);
  };

  const handelTextInput = (e) => {
    const ref = textRef.current;
    setText(e.target.value);
    ref.style.height = 'auto'; // Reset height to calculate the new height
    ref.style.height = `${ref.scrollHeight}px`;
  };

  const handelBackground = (i) => {
    const elm = bgRef.current;
    const text = textRef.current;
    if (i !== null) {
      elm.style.backgroundImage = `url(../../../images/postBackgrounds/${
        i + 1
      }.jpg)`;
      elm.classList.add('hendal-post-bg');
      text.classList.remove(...Array.from(text.classList));
      text.classList.add('effect' + (i + 1));
      setBackground(`../../../images/postBackgrounds/${i + 1}.jpg`);
    } else {
      elm.classList.remove('hendal-post-bg');
      elm.removeAttribute('style');
      text.classList.remove(...Array.from(text.classList));
      setBackground('');
    }
  };

  useClickOutside(pickerRef, () => {
    setPicker(false);
  });

  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  return (
    <>
      <div className={!type2 ? 'post__post' : ''} ref={bgRef}>
        <textarea
          className={type2 ? 'post__input' : ''}
          maxLength='500'
          value={text}
          ref={textRef}
          placeholder={t('post.whatsInMind') + user.first_name}
          onChange={handelTextInput}
        ></textarea>
      </div>
      <div className={!type2 ? 'post__emojis' : ''}>
        {picker && (
          <div
            className={`post__emojis__picker ${
              type2 ? 'move-picker-top' : 'rlmove'
            }`}
            ref={pickerRef}
          >
            <Picker height={350} lazyLoad={true} onEmojiClick={handelEmoji} />
          </div>
        )}
        {!type2 && (
          <img
            src='../../../icons/colorful.png'
            onClick={() => setShowBg((prev) => !prev)}
            alt=''
          />
        )}
        {!type2 && showBg && (
          <div className='post__background'>
            <div className='no-bg' onClick={() => handelBackground(null)}></div>
            {imagesUrl.map((url, index) => (
              <img
                src={`${url}${index + 1}.jpg`}
                alt='Post Background'
                key={`${index + 1}.jpg`}
                onClick={() => handelBackground(index)}
              />
            ))}
          </div>
        )}
        <i
          className={`emoji_icon_large ${type2 ? 'move-left' : ''}`}
          onClick={(e) => setPicker((prev) => !prev)}
        />
      </div>
    </>
  );
};

export default EmojiPicker;
