import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function Date({ handleChange, value }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        name="date"
        value={value}
        onChange={(val, context) => handleChange({target : {name : "date", value : val}})}
        format="DD/MM/YYYY"
      />
    </LocalizationProvider>
  );
}
