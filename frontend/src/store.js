import { configureStore } from '@reduxjs/toolkit';
import { volunteerReducer } from './Reducer/volunteer.slice';
import { eventReducer } from './Reducer/event.slice';

// eslint-disable-next-line react-refresh/only-export-components
export const store = configureStore({
  reducer: {
    volunteers: volunteerReducer,
    events: eventReducer
  }
});
