import { EventModel } from '@/models';
import { createSlice } from '@reduxjs/toolkit';

export const reportSlice = createSlice({
  name: 'report',
  initialState: {
    dashboard: null as any,
    reportData: [] as EventModel[],
  },
  reducers: {
    setDashboard: (state, action) => {
      state.dashboard = action.payload.dashboard;
    },
    setReportdata: (state, action) => {
      state.reportData = action.payload.reportData;
    },
  }
});


// Action creators are generated for each case reducer function
export const { setDashboard, setReportdata } = reportSlice.actions;