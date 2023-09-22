import { useTranslation } from 'react-i18next';

import './subMenu.scss';

const DisplayAndAccessibility = ({ setVisible }) => {
  const { t } = useTranslation();
  return (
    <div className="abs-wrap scrollbar">
      <div className="abs-wrap-header">
        <div
          className="circle hover1"
          onClick={() => {
            setVisible(0);
          }}
        >
          <i className="arrow_back_icon"></i>
        </div>
        {t(`header.userItem.2.name`)}
      </div>
      <div className="menu-main">
        <div>
          <span className="small-circle">
            <i className="dark_filled_icon"></i>
          </span>
        </div>
        <div className="menu-col">
          <div className="menu-main-text">{t('header.dark')}</div>
          <div className="menu-main-sub-text">{t('header.darkDec')}</div>
        </div>
      </div>
      <label htmlFor="darkOff" className="hover1">
        <span>{t('off')}</span>
        <input type="radio" name="dark" id="darkOff" />
      </label>
      <label htmlFor="darkOn" className="hover1">
        <span>{t('on')}</span>
        <input type="radio" name="dark" id="darkOn" />
      </label>
      <label htmlFor="auto" className="hover1">
        <div>
          <span>{t('header.automatic')}</span>
          <p className="sub-text">{t('header.automaticDec')}</p>
        </div>
        <input type="radio" name="dark" id="auto" />
      </label>

      <div className="menu-main">
        <div>
          <span className="small-circle">
            <i className="compact_icon"></i>
          </span>
        </div>
        <div className="menu-col">
          <div className="menu-main-text">{t('header.compact')}</div>
          <div className="menu-main-sub-text">{t('header.compactDec')}</div>
        </div>
      </div>
      <label htmlFor="compactOff" className="hover1">
        <span>{t('off')}</span>
        <input type="radio" name="compact" id="compactOff" />
      </label>
      <label htmlFor="compactOn" className="hover1">
        <span>{t('on')}</span>
        <input type="radio" name="compact" id="compactOn" />
      </label>

      <div className="menu-main">
        <div>
          <span className="small-circle">
            <i className="pointer_icon"></i>
          </span>
        </div>
        <div className="menu-col">
          <div className="menu-main-text">{t('header.previews')}</div>
          <div className="menu-main-sub-text">{t('header.previewsDec')}</div>
        </div>
      </div>
      <label htmlFor="previewHover" className="hover1">
        <span className="sub-header">{t('header.previewHovering')}</span>
        <input type="radio" name="preview" id="previewHover" />
      </label>
      <label htmlFor="previewOn" className="hover1">
        <div className="sub-header">
          <span>{t('header.previewClick')}</span>
          <p className="sub-text">{t('header.previewClickDec')}</p>
        </div>
        <input type="radio" name="preview" id="previewOn" />
      </label>
      <label htmlFor="previewOff" className="hover1">
        <span>{t('header.dontShow')}</span>
        <input type="radio" name="preview" id="previewOff" />
      </label>

      <div className="menu-item hover3" onClick={() => setVisible(31)}>
        <div className="small-circle">
          <i className="keyboard_icon"></i>
        </div>
        <span>{t('header.keyboard')}</span>
        <div className="rArrow">
          <i className="right_icon"></i>
        </div>
      </div>
    </div>
  );
};

export default DisplayAndAccessibility;
