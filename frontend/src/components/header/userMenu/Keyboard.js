import { useTranslation } from 'react-i18next';

const Keyboard = ({ setVisible }) => {
  const { t } = useTranslation();

  return (
    <div className="abs-wrap">
      <div className="abs-wrap-header">
        <div
          className="circle hover1"
          onClick={() => {
            setVisible(3);
          }}
        >
          <i className="arrow_back_icon"></i>
        </div>
        {t(`header.keyboard`)}
      </div>

      <div class="menu-item hover3">
        <div class="small-circle">
          <i className="keyboard_icon"></i>
        </div>
        {t(`header.keyboardShortcuts`)}
      </div>

      <div className="menu-main">
        <div>
          <span className="small-circle">
            <i className="character_keyboard_icon"></i>
          </span>
        </div>
        <div className="menu-col">
          <div className="menu-main-text">{t('header.singleCharacter')}</div>
          <div className="menu-main-sub-text">
            {t('header.singleCharacterDec')}
          </div>
        </div>
      </div>
      <label htmlFor="singleCharacterOff" className="hover1">
        <span>{t('off')}</span>
        <input type="radio" name="singleCharacter" id="singleCharacterOff" />
      </label>
      <label htmlFor="singleCharacterOn" className="hover1">
        <span>{t('on')}</span>
        <input type="radio" name="singleCharacter" id="singleCharacterOn" />
      </label>
    </div>
  );
};

export default Keyboard;
