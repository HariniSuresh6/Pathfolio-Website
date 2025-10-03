import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = process.env.REACT_APP_API || 'http://localhost:5000/api';

export const fetchMilestones = createAsyncThunk('milestones/fetch', async () => {
  const res = await axios.get(`${API}/milestones`);
  return res.data;
});

export const createMilestone = createAsyncThunk('milestones/create', async (payload) => {
  const res = await axios.post(`${API}/milestones`, payload);
  return res.data;
});

export const updateMilestone = createAsyncThunk('milestones/update', async ({ id, data }) => {
  const res = await axios.put(`${API}/milestones/${id}`, data);
  return res.data;
});

export const deleteMilestone = createAsyncThunk('milestones/delete', async (id) => {
  await axios.delete(`${API}/milestones/${id}`);
  return id;
});

const slice = createSlice({
  name: 'milestones',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMilestones.pending, (s)=> { s.status = 'loading'; })
      .addCase(fetchMilestones.fulfilled, (s, a)=> { s.status = 'succeeded'; s.items = a.payload; })
      .addCase(fetchMilestones.rejected, (s, a)=> { s.status = 'failed'; s.error = a.error.message; })

      .addCase(createMilestone.fulfilled, (s, a)=> { s.items.unshift(a.payload); })
      .addCase(updateMilestone.fulfilled, (s, a)=> {
         s.items = s.items.map(i => i._id === a.payload._id ? a.payload : i);
      })
      .addCase(deleteMilestone.fulfilled, (s, a)=> {
         s.items = s.items.filter(i => i._id !== a.payload);
      });
  }
});

export default slice.reducer;
