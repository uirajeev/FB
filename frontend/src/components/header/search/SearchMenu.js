import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useClickOutside from '../../../helpers/ClickOutside';

import { Return, Search } from '../../../svg';
import './searchMenu.scss';

const SearchMenu = ({ color, setShowSearch }) => {
  const { t } = useTranslation();
  const menu = useRef(null);
  const input = useRef(null);

  const [searchIconVisible, setSearchIconVisible] = useState(true);

  useEffect(() => {
    input.current.focus();
  }, []);

  useClickOutside(menu, () => {
    setShowSearch(false);
  });

  return (
    <div className="header-left search-area scrollbar" ref={menu}>
      <div className="search-wrap">
        <div className="header-logo">
          <div className="circle hover1" onClick={() => setShowSearch(false)}>
            <Return color={color} />
          </div>
        </div>
        <div
          className="search"
          onClick={() => {
            input.current.focus();
          }}
        >
          {searchIconVisible && (
            <div>
              <Search color={color} />
            </div>
          )}
          <input
            type="text"
            placeholder={t('header.search')}
            ref={input}
            onFocus={() => {
              setSearchIconVisible(false);
            }}
            onBlur={() => {
              setSearchIconVisible(true);
            }}
          />
        </div>
      </div>
      <div className="search-header">
        <span>{t('header.recent')}</span> <a>{t('header.edit')}</a>
      </div>
      <div className="search-history">
        <div className="search-results-scrollbar"></div>
      </div>
    </div>
  );
};

export default SearchMenu;
