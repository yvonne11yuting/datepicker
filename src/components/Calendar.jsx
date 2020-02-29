import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LOCALES from '../locales';
import Iconleft from '../assets/icon_arrow_left.svg';
import IconRight from '../assets/icon_arrow_right.svg';
import '../styles/calendar.scss';

// methods ------------
const dateToAry = (date) => {
  const convertedDate = new Date(date);
  const [m, d, y] = convertedDate.toLocaleDateString('en-US').split('/');
  return [+y, +m, +d, +convertedDate.getDay()];
};
const dateToObj = (rawDate) => {
  const [year, month, date] = dateToAry(rawDate);
  return { year, month, date };
};

// scoped ----------
const isLeapYear = (year) => new Date(year, 1, 29).getDate() === 29;
const MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const getMonthDays = (year, month) => (
  isLeapYear(year) && month === 2 ? 29 : MONTH_DAYS[month - 1]
);
const getPrevMonthLastDate = (curDate) => {
  curDate.setDate(0);
  return curDate;
};

// component start ----------
const Calendar = ({ lang, date, onSelect }) => {
  const today = new Date();
  const todayStr = today.toLocaleDateString('zh').replace(/\//g,'');
  const [selectedDate, setSelectedDate] = useState(dateToObj(date || today));
  const LANG_SRC = LOCALES[lang];
  const monthStr = lang === 'zh' ? `${selectedDate.year}年 ${LANG_SRC.MONTH(selectedDate.month)}月` : `${LANG_SRC.MONTH[selectedDate.month]} ${selectedDate.year}`;


  const getDays = ({
    todayStr,
    year,
    month,
    date: curDate,
  }) => {
    const days = [];
    const WEEK_ROW = 6;
    const curMonthDays = getMonthDays(year, month);

    const daysLength = WEEK_ROW * LANG_SRC.DAY.length;
    const curMonthFirstDay = new Date(`${year}-${month}-01`).getDay();

    const prevMonthRemainLength = curMonthFirstDay % 7;
    const prevMonthLastDate = getPrevMonthLastDate(new Date(year, month - 1));
    const [prevYear, prevMonth, prevDate] = dateToAry(prevMonthLastDate);
    const prevMonthFirstRenderDate = prevDate - prevMonthRemainLength + 1;

    const nextMonthRemainLength = daysLength - curMonthDays - prevMonthRemainLength;
    const [nextYear, nextMonth, nextDate] = dateToAry(new Date(year, month, 1));

    for (let i = 0; i < prevMonthRemainLength; i += 1) {
      days.push({
        year: prevYear,
        month: prevMonth,
        date: i + prevMonthFirstRenderDate,
      });
    }

    for (let i = 0; i < curMonthDays; i += 1) {
      days.push({
        year,
        month,
        date: i + 1,
        isCurMonth: true,
        isSelectedDate: i + 1 === curDate,
        isToday: todayStr === `${year}${month}${i + 1}`,
      });
    }

    for (let i = 0; i < nextMonthRemainLength; i += 1) {
      days.push({
        year: nextYear,
        month: nextMonth,
        date: i + nextDate,
      });
    }
    return days;
  };

  const handleDateSelect = (dataInfo) => {
    setSelectedDate(dataInfo);
  };

  return (
    <div className="rt-calendar">
      <div className="rt-calendar__header">
        <div className="rt-calendar__header__cur-month">
          <button className="rt-calendar__icon" type="button"><img src={Iconleft} alt="previous month" /></button>
          <span>{monthStr}</span>
          <button className="rt-calendar__icon" type="button"><img src={IconRight} alt="next month" /></button>
        </div>
        <div className="rt-calendar__day-name">
          { LANG_SRC.DAY.map((dayName) => (
            <div className="rt-calendar__day-name__text" key={dayName}>{dayName}</div>
          ))}
        </div>
        <div className="rt-calendar__month">
          { getDays({ todayStr, ...selectedDate }).map(({
            isCurMonth,
            isSelectedDate,
            isToday,
            ...dateInfo
          }) => {
            const outsideClass = !isCurMonth ? 'rt-calendar__month__day--outside' : '';
            const selectedClass = isSelectedDate ? 'rt-calendar__month__day--selected' : '';
            const todayClass = isToday && !isSelectedDate ? 'rt-calendar__month__day--today' : '';
            const className = `rt-calendar__month__day ${outsideClass} ${selectedClass} ${todayClass}`;
            return (
              <div
                tabIndex="0"
                role="button"
                className={className}
                onClick={() => handleDateSelect(dateInfo)}
                onKeyDown={() => handleDateSelect(dateInfo)}
                key={Object.values(dateInfo).join('')}
              >
                {dateInfo.date}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

Calendar.propTypes = {
  lang: PropTypes.string,
  date: PropTypes.string,
  onSelect: PropTypes.func,
};

Calendar.defaultProps = {
  lang: 'en',
  date: null,
  onSelect: () => {},
};


export default Calendar;
