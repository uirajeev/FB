import { useRef, useState } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useCssRootColor from '../../hooks/useCssRootColor';
import useClickOutside from '../../helpers/ClickOutside';

import AllMenu from './allMenu/AllMenu';
import SearchMenu from './search/SearchMenu';
import {
  ArrowDown,
  Friends,
  Gaming,
  HomeActive,
  Logo,
  Market,
  Menu,
  Messenger,
  Notifications,
  Search,
  Watch,
} from '../../svg';

import './style.scss';
import UserMenu from '../header/userMenu';

const Header = () => {
  const icon_color = useCssRootColor('--color-secondary');
  const { t } = useTranslation();
  const user = useSelector((state) => state.user);
  const allMenu = useRef(null);
  const userMenu = useRef(null);
  const [showSearch, setShowSearch] = useState(false);
  const [showAllMenu, setShowAllMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useClickOutside(allMenu, () => {
    setShowAllMenu(false);
  });

  useClickOutside(userMenu, () => {
    setShowUserMenu(false);
  });

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/">
          <div className="circle">
            <Logo />
          </div>
        </Link>
        <label
          className="search serach-icon"
          htmlFor="search"
          onClick={() => setShowSearch(true)}
        >
          <Search color={icon_color} />
          <input
            type="text"
            id="search"
            placeholder={t('header.search')}
            className="hide-input"
          />
        </label>
      </div>
      {showSearch && (
        <SearchMenu color={icon_color} setShowSearch={setShowSearch} />
      )}
      <div className="header-middle">
        <Link to="/" color={icon_color} className="header-middle-icon active">
          <HomeActive />
        </Link>
        <Link to="/" color={icon_color} className="header-middle-icon hover1">
          <Friends />
        </Link>
        <Link to="/" color={icon_color} className="header-middle-icon hover1">
          <Watch />
          <div className="header-middle-icon-info">9+</div>
        </Link>
        <Link to="/" color={icon_color} className="header-middle-icon hover1">
          <Market />
        </Link>
        <Link to="/" color={icon_color} className="header-middle-icon hover1">
          <Gaming />
        </Link>
      </div>
      <div className="header-right">
        <Link to="/profile" className="header-right-profile hover1">
          <img src={user?.picture} alt="" />
          <span>{user?.first_name}</span>
        </Link>
        <div
          className={`header-right-icon hover1 ${
            showAllMenu && 'active-header'
          }`}
          ref={allMenu}
        >
          <div onClick={() => setShowAllMenu((prev) => !prev)}>
            <div style={{ ransform: 'translateY(2px)' }}>
              <Menu />
            </div>
          </div>
          {showAllMenu && <AllMenu />}
        </div>
        <div className="header-right-icon hover1">
          <Messenger />
        </div>
        <div className="header-right-icon hover1">
          <Notifications />
          <div className="header-right-icon-info">9+</div>
        </div>
        <div
          className={`header-right-icon hover1 ${
            showUserMenu && 'active-header'
          }`}
          ref={userMenu}
        >
          <div onClick={() => setShowUserMenu((prev) => !prev)}>
            <div style={{ transform: ' translateY(2px)' }}>
              <ArrowDown />
            </div>
          </div>
          {showUserMenu && <UserMenu user={user} />}
        </div>
      </div>
    </header>
  );
};

export default Header;
