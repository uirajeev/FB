import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LeftLink from './LeftLink';
import Shortcut from './Shortcut';
import { left, shortcut } from '../../../data/home';
import { ArrowDown1 } from '../../../svg';

import './style.scss';

const HomeLeft = ({ user }) => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  return (
    <aside className="left-home">
      <Link to="/profile" className="left-home-link hover1">
        <img src={user?.picture} alt="User" />
        <span>
          {user.first_name} {user.last_name}
        </span>
      </Link>
      {left.slice(0, 8).map(({ img, name, notification }) => (
        <LeftLink
          img={img}
          text={t(`leftMenu.menu.${name}.text`)}
          notification={notification}
          key={img}
        />
      ))}
      {!visible && (
        <div className="left-home-link hover1" onClick={() => setVisible(true)}>
          <div className="small-circle">
            <ArrowDown1 />
          </div>
          <span>{t('leftMenu.seeMore')}</span>
        </div>
      )}
      {visible &&
        left
          .slice(8, left.length)
          .map(({ img, name, notification }) => (
            <LeftLink
              img={img}
              text={t(`leftMenu.menu.${name}.text`)}
              notification={notification}
              key={img}
            />
          ))}
      {visible && (
        <div
          className="left-home-link hover1"
          onClick={() => setVisible(false)}
        >
          <div className="small-circle rotate180">
            <ArrowDown1 />
          </div>
          <span>{t('leftMenu.showLess')}</span>
        </div>
      )}
      <hr className="splitter" />
      <div className="left-home-shortcut">
        <div className="left-home-shortcut-heading">
          {t('leftMenu.yourShourcuts')}
        </div>
        <div className="left-home-shortcut-edit">{t('leftMenu.edit')}</div>
      </div>
      <div className="left-home-shortcut-list">
        {shortcut.map(({ name, url, img }) => (
          <Shortcut
            name={t(`leftMenu.shortcut.${name}.text`)}
            url={url}
            img={img}
            key={img}
          />
        ))}
      </div>
      <div className="fb-copyright">
        <Link to="/">{t('leftMenu.privacy')}</Link>
        <span> . </span>
        <Link to="/">{t('leftMenu.terms')}</Link>
        <span> . </span>
        <Link to="/">{t('leftMenu.advertising')}</Link>
        <span> . </span>
        <Link to="/">
          {t('leftMenu.adChoices')} <i className="ad_choices_icon"></i>
        </Link>
        <span> . </span>
        <Link to="/">{t('leftMenu.cookies')}</Link>
        <span> . </span>
        <Link to="/">{t('leftMenu.more')}</Link>
        <span> . </span>
        <br />
        {t('leftMenu.meta')} &copy; {new Date().getFullYear()}
      </div>
    </aside>
  );
};

export default HomeLeft;
