import { useSelector } from 'react-redux/es/hooks/useSelector';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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

const Header = () => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user);
  const icon_color = '#65676b';

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/">
          <div className="circle">
            <Logo />
          </div>
        </Link>
        <label className="search serach-icon" htmlFor="search">
          <Search color={icon_color} />
          <input
            type="text"
            id="search"
            placeholder={t('header.search')}
            className="hide-input"
          />
        </label>
      </div>
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
        <div className="header-right-icon hover1">
          <Menu />
        </div>
        <div className="header-right-icon hover1">
          <Messenger />
        </div>
        <div className="header-right-icon hover1">
          <Notifications />
          <div className="header-right-icon-info">9+</div>
        </div>
        <div className="header-right-icon hover1">
          <ArrowDown />
        </div>
      </div>
    </header>
  );
};

export default Header;
