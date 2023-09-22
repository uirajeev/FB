import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { userMenuItem } from '../../../data/userMenu';
import SettingsAndHelp from './SettingsAndHelp';
import './style.scss';
import HelpAndSupport from './HelpAndSupport';
import DisplayAndAccessibility from './DisplayAndAccessibility';
import Keyboard from './Keyboard';

const UserMenu = ({ user }) => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(0);
  return (
    <div className="menu">
      {visible === 0 && (
        <div>
          <Link to="/profile" className="menu-header hover3">
            <img src={user?.picture} alt="user" />
            <div className="menu-col">
              <span>
                {user?.first_name} {user?.last_name}
              </span>
              <span>{t('header.yourProfile')}</span>
            </div>
          </Link>
          <hr className="splitter" />
          <div className="menu-main hover3">
            <div className="small-circle">
              <i className="report_filled_icon"></i>
            </div>
            <div className="menu-main-col">
              <div className="menu-main-text">{t('header.feedback')}</div>
              <div className="menu-main-sub-text">{t('header.helpUs')}</div>
            </div>
          </div>
          <hr className="splitter" />
          {userMenuItem.map((item, index) => (
            <div
              className="menu-item hover3"
              key={item.icon}
              onClick={() => {
                setVisible(index + 1);
              }}
            >
              <div className="small-circle">
                <i className={item.icon}></i>
              </div>
              <span>{t(`header.userItem.${index}.name`)}</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </div>
          ))}
          <div className="menu-item hover3">
            <div className="small-circle">
              <i className="logout_filled_icon"></i>
            </div>
            <span>{t('header.logout')}</span>
          </div>
        </div>
      )}

      {visible === 1 && <SettingsAndHelp setVisible={setVisible} />}
      {visible === 2 && <HelpAndSupport setVisible={setVisible} />}
      {visible === 3 && <DisplayAndAccessibility setVisible={setVisible} />}
      {visible === 31 && <Keyboard setVisible={setVisible} />}
    </div>
  );
};

export default UserMenu;
