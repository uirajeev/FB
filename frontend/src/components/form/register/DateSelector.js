import { useMediaQuery } from 'react-responsive';

import './dateSelector.scss';

const DateSelector = ({
  bDay,
  bMonth,
  bYear,
  days,
  bMonths,
  bYears,
  handleChange,
  dateError,
}) => {
  const desktopView = useMediaQuery({
    query: '(min-width: 1024px)',
  });

  return (
    <div className="date-grid">
      <select name="bDay" value={bDay} onChange={handleChange}>
        {days.map((day) => (
          <option value={day} key={day}>
            {day}
          </option>
        ))}
      </select>
      <select name="bMonth" value={bMonth} onChange={handleChange}>
        {bMonths.map((month) => (
          <option value={month} key={month}>
            {month}
          </option>
        ))}
      </select>
      <select name="bYear" value={bYear} onChange={handleChange}>
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
