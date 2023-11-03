import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  const response = await axios.get('/api/events');
  return response.data?.allEvents;
});

export const fetchAEvent = createAsyncThunk('events/fetchAEvent', async (id) => {
  const response = await axios.get(`/api/events/${id}`);
  return response.data?.event;
});

export const addEvent = createAsyncThunk('events/addEvent', async (newEvent) => {
  const response = await axios.post('/api/events', newEvent);
  return response.data?.allEvents;
});

export const deleteEvent = createAsyncThunk('events/deleteEvent', async (id) => {
  const response = await axios.delete(`/api/events/${id}`);
  return response.data?.allEvents;
});

export const updateEvent = createAsyncThunk('events/updateEvent', async ({ id, updateData }) => {
  const response = await axios.post(`/api/events/${id}`, updateData);
  return response.data?.allEvents;
});

export const eventSlice = createSlice({
  name: 'events',
  initialState: {
    status: 'idle',
    error: null,
    events: [],
    event: null,
    wizardStatus: 'idle',
    wizardError: 'idle'
  },
  reducers: {},
  extraReducers: {
    [fetchEvents.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchEvents.fulfilled]: (state, action) => {
      console.log(action);
      state.status = 'success';
      state.events = action.payload;
    },
    [fetchEvents.rejected]: (state, action) => {
      state.status = 'error';
      console.log(action.error.message);
      state.error = action.error.message;
    },
    [fetchAEvent.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchAEvent.fulfilled]: (state, action) => {
      state.status = 'success';
      state.event = action.payload;
    },
    [fetchAEvent.rejected]: (state, action) => {
      state.status = 'error';
      console.log(action.error.message);
      state.error = action.error.message;
    },
    [addEvent.pending]: (state) => {
      state.wizardStatus = 'loading';
    },
    [addEvent.fulfilled]: (state, action) => {
      state.wizardStatus = 'success';
      state.events = action.payload;
    },
    [addEvent.rejected]: (state, action) => {
      (state.wizardError = 'error'), (state.error = action.error.message);
    },
    [deleteEvent.pending]: (state) => {
      state.wizardStatus = 'loading';
    },
    [deleteEvent.fulfilled]: (state, action) => {
      state.wizardStatus = 'success';
      state.events = action.payload;
    },
    [deleteEvent.rejected]: (state, action) => {
      (state.wizardError = 'error'), (state.error = action.error.message);
    },
    [updateEvent.pending]: (state) => {
      state.wizardStatus = 'loading';
    },
    [updateEvent.fulfilled]: (state, action) => {
      state.wizardStatus = 'success';
      state.events = action.payload;
    },
    [updateEvent.rejected]: (state, action) => {
      (state.wizardError = 'error'), (state.error = action.error.message);
    }
  }
});

export const eventReducer = eventSlice.reducer;
