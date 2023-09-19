import { useTranslation } from 'react-i18next';

import './settingsAndHelp.scss';
import { useTransition } from 'react';

const SettingsAndHelp = () => {
  const { t } = useTranslation();

  return (
    <div className="abs-wrap">
      <div className="abs-wrap-header">
        <div className="circle">
          <i className="arrow_back_icon"></i>
        </div>
        {t(`header.userItem.0.name`)}
      </div>
      <div className="menu-item hover3">
        <div className="small-circle">
          <i className="settings_filled_icon"></i>
        </div>
        <span>Settings</span>
      </div>
    </div>
  );
};

export default SettingsAndHelp;
