import { useTranslation } from 'react-i18next';
import { menu, create } from '../../../data/allMenu';
import AllMenuItem from './AllMenuItem';
import './allMenu.scss';

const AllMenu = () => {
  const { t } = useTranslation();

  return (
    <div className="all-menu">
      <div className="all-menu-header">{t('header.menu')}</div>
      <div className="all-menu-wrap scrollbar">
        <div className="all-menu-left">
          <div className="all-menu-search">
            <i className="amm_s_ic"></i>
            <input type="text" placeholder="Search Menu" />
          </div>
          {menu.map(({ groupName, items }, i) => (
            <div className="all-menu-group" key={groupName}>
              <div className="all-menu-group-header">
                {t(`header.allMenu.${i}.groupName`)}
              </div>
              {items.map(({ icon }, j) => (
                <AllMenuItem
                  name={t(`header.allMenu.${i}.items.${j}.name`)}
                  icon={icon}
                  description={t(`header.allMenu.${i}.items.${j}.description`)}
                  key={icon}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="all-menu-right">
          <div className="all-menu-right-header">Create</div>
          {create.map(({ icon }, k) => (
            <div className="all-menu-right-item hover1" key={icon}>
              <div>
                <span className="all-menu-right-circle">
                  <i className={icon}></i>
                </span>
              </div>
              {t(`header.create.${k}.name`)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllMenu;
