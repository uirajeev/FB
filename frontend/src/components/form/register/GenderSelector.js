import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';

import './genderSelector.scss';

const GenderSelector = ({ handleChange, genderError }) => {
  const { t } = useTranslation();
  const desktopView = useMediaQuery({
    query: '(min-width: 1024px)',
  });
  return (
    <div className="gender-grid">
      <label htmlFor="male">
        {t('signup.male')}
        <input
          type="radio"
          name="gender"
          id="male"
          value="male"
          onChange={handleChange}
        />
      </label>
      <label htmlFor="female">
        {t('signup.female')}
        <input
          type="radio"
          name="gender"
          id="female"
          value="female"
          onChange={handleChange}
        />
      </label>
      <label htmlFor="other">
        {t('signup.other')}
        <input
          type="radio"
          name="gender"
          id="other"
          value="other"
          onChange={handleChange}
        />
      </label>
      {genderError && (
        <div
          className={
            desktopView
              ? 'input-error-message input-error-desktop'
              : 'input-error-message'
          }
        >
          {genderError}
          <div
            className={desktopView ? 'input-arrow-left' : 'input-arrow-bottom'}
          ></div>
        </div>
      )}
    </div>
  );
};

export default GenderSelector;
