import { useTranslation } from 'react-i18next';

import { helpMenu } from '../../../data/userMenu';

import './subMenu.scss';

const HelpAndSupport = ({ setVisible }) => {
  const { t } = useTranslation();

  return (
    <div className="abs-wrap">
      <div className="abs-wrap-header">
        <div
          className="circle hover1"
          onClick={() => {
            setVisible(0);
          }}
        >
          <i className="arrow_back_icon"></i>
        </div>
        {t(`header.userItem.1.name`)}
      </div>
      {helpMenu.map(({ icon }, index) => (
        <div className="menu-item hover3" key={icon}>
          <div className="small-circle">
            <i className={icon}></i>
          </div>
          <span>{t(`header.helpMenu.${index}.name`)}</span>
        </div>
      ))}
    </div>
  );
};

export default HelpAndSupport;
