import React from 'react';
import { Calendar } from '../../../libs/calendar.min';
// import Calendar from './Calendar';

export default { title: 'Calendar' };

export const mainEn = () => (
  <div style={{ background: '#eee', width: '100vw', height: '100vh' }}>
    <Calendar lang="en" date="2020-02-01" onSelect={(date) => console.log(date)} />
  </div>
);

export const mainZh = () => (
  <div style={{ background: '#eee', width: '100vw', height: '100vh' }}>
    <Calendar lang="zh" date="2020-02-28" onSelect={(date) => console.log(date)} />
  </div>
);

export const mainJp = () => (
  <div style={{ background: '#eee', width: '100vw', height: '100vh' }}>
    <Calendar lang="jp" date="2020-02-28" onSelect={(date) => console.log(date)} />
  </div>
);
