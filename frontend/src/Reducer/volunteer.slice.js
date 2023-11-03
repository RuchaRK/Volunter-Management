import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchVolunteers = createAsyncThunk('volunteers/fetchVolunteers', async () => {
  const response = await axios.get('/api/volunteers');
  return response.data?.allVolunteers;
});

export const fetchAVolunteer = createAsyncThunk('volunteers/fetchAVolunteer', async (id) => {
  const response = await axios.get(`/api/volunteers/${id}`);
  return response.data?.volunteer;
});

export const addVolunteer = createAsyncThunk('volunteers/addVolunteer', async (newVolunteer) => {
  const response = await axios.post('/api/volunteers', newVolunteer);
  return response.data?.allVolunteers;
});

export const deleteVolunteer = createAsyncThunk('volunteers/deleteVolunteer', async (id) => {
  const response = await axios.delete(`/api/volunteers/${id}`);
  return response.data?.allVolunteers;
});

export const updateVolunteer = createAsyncThunk(
  'volunteers/updateVolunteer',
  async ({ id, updateData }) => {
    const response = await axios.post(`/api/volunteers/${id}`, updateData);
    return response.data?.allVolunteers;
  }
);

export const volunteerSlice = createSlice({
  name: 'volunteers',
  initialState: {
    status: 'idle',
    error: null,
    volunteers: [],
    volunteer: null,
    wizardStatus: 'idle',
    wizardError: 'idle'
  },
  reducers: {},
  extraReducers: {
    [fetchVolunteers.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchVolunteers.fulfilled]: (state, action) => {
      console.log(action);
      state.status = 'success';
      state.volunteers = action.payload;
    },
    [fetchVolunteers.rejected]: (state, action) => {
      state.status = 'error';
      console.log(action.error.message);
      state.error = action.error.message;
    },
    [fetchAVolunteer.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchAVolunteer.fulfilled]: (state, action) => {
      state.status = 'success';
      state.volunteer = action.payload;
    },
    [fetchAVolunteer.rejected]: (state, action) => {
      state.status = 'error';
      console.log(action.error.message);
      state.error = action.error.message;
    },
    [addVolunteer.pending]: (state) => {
      state.wizardStatus = 'loading';
    },
    [addVolunteer.fulfilled]: (state, action) => {
      state.wizardStatus = 'success';
      state.volunteers = action.payload;
    },
    [addVolunteer.rejected]: (state, action) => {
      (state.wizardError = 'error'), (state.error = action.error.message);
    },
    [deleteVolunteer.pending]: (state) => {
      state.wizardStatus = 'loading';
    },
    [deleteVolunteer.fulfilled]: (state, action) => {
      state.wizardStatus = 'success';
      state.volunteers = action.payload;
    },
    [deleteVolunteer.rejected]: (state, action) => {
      (state.wizardError = 'error'), (state.error = action.error.message);
    },
    [updateVolunteer.pending]: (state) => {
      state.wizardStatus = 'loading';
    },
    [updateVolunteer.fulfilled]: (state, action) => {
      state.wizardStatus = 'success';
      state.volunteers = action.payload;
    },
    [updateVolunteer.rejected]: (state, action) => {
      (state.wizardError = 'error'), (state.error = action.error.message);
    }
  }
});

export const volunteerReducer = volunteerSlice.reducer;
