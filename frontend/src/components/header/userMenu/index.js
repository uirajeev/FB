import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { userMenuItem } from '../../../data/userMenu';
import SettingsAndHelp from './SettingsAndHelp';
import './style.scss';

const UserMenu = ({ user }) => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(1);
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
              <span>See Your profile</span>
            </div>
          </Link>
          <hr className="splitter" />
          <div className="menu-main hover3">
            <div className="small-circle">
              <i className="report_filled_icon"></i>
            </div>
            <div className="menu-main-col">
              <div className="menu-main-feed">Give feedback</div>
              <div className="menu-main-help">Help us improve facebook</div>
            </div>
          </div>
          <hr className="splitter" />
          {userMenuItem.map((item, index) => (
            <div className="menu-item hover3" key={item.icon}>
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
            <span>Logout</span>
          </div>
        </div>
      )}

      {visible === 1 && <SettingsAndHelp />}
    </div>
  );
};

export default UserMenu;
