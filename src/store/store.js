import { configureStore } from '@reduxjs/toolkit';
import milestonesReducer from './milestonesSlice';

const store = configureStore({
  reducer: {
    milestones: milestonesReducer
  }
});

export default store;
