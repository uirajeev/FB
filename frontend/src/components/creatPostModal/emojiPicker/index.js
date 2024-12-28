import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Picker from 'emoji-picker-react';
import './style.scss';

const EmojiPicker = ({ text, user, setText, type2 }) => {
  const { t } = useTranslation();
  const [cursorPosition, setCursorPosition] = useState(0);
  const [picker, setPicker] = useState(false);
  const textRef = useRef(null);

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
    <>
      <div className={!type2 ? 'post__post' : ''}>
        <textarea
          className={type2 ? 'post__input' : ''}
          maxLength='500'
          value={text}
          ref={textRef}
          placeholder={t('post.whatsInMind') + user.first_name}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </div>
      <div className={!type2 ? 'post__emojis' : ''}>
        {picker && (
          <div
            className={`post__emojis__picker ${
              type2 ? 'move-picker-top' : 'rlmove'
            }`}
          >
            <Picker height={350} lazyLoad={true} onEmojiClick={handelEmoji} />
          </div>
        )}
        {!type2 && <img src='../../../icons/colorful.png' alt='' />}
        <i
          className={`emoji_icon_large ${type2 && 'move-left'}`}
          onClick={(e) => setPicker((prev) => !prev)}
        />
      </div>
    </>
  );
};

export default EmojiPicker;
