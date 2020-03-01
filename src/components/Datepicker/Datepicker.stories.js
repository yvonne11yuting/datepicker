import React from 'react';
import Datepicker from '../../../libs/calendar';

export default { title: 'Datepicker' };

export const mainEn = () => (
  <div>
    <Datepicker lang="en" onSelect={(date) => console.log(date)} />
  </div>
);
