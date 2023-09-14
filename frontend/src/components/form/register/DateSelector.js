import { useMediaQuery } from 'react-responsive';

import './dateSelector.scss';

const DateSelector = ({ values, handleChange, dateError }) => {
  const desktopView = useMediaQuery({
    query: '(min-width: 1024px)',
  });

  const fullYear = new Date().getFullYear();

  const bYears = Array.from(new Array(100), (val, index) => fullYear - index);
  const bMonths = Array.from(new Array(12), (val, index) => 1 + index);
  const getDays = () => {
    return new Date(values.bYear, values.bMonth, 0).getDate();
  };
  const days = Array.from(new Array(getDays()), (val, index) => index + 1);

  return (
    <div className="date-grid">
      <select name="bDay" value={values.bDay} onChange={handleChange}>
        {days.map((day) => (
          <option value={day} key={day}>
            {day}
          </option>
        ))}
      </select>
      <select name="bMonth" value={values.bMonth} onChange={handleChange}>
        {bMonths.map((month) => (
          <option value={month} key={month}>
            {month}
          </option>
        ))}
      </select>
      <select name="bYear" value={values.bYear} onChange={handleChange}>
        {bYears.map((year) => (
          <option value={year} key={year}>
            {year}
          </option>
        ))}
      </select>
      {dateError && (
        <div
          className={
            desktopView
              ? 'input-error-message input-error-desktop'
              : 'input-error-message'
          }
        >
          {dateError}
          <div
            className={desktopView ? 'input-arrow-left' : 'input-arrow-bottom'}
          ></div>
        </div>
      )}
    </div>
  );
};

export default DateSelector;
