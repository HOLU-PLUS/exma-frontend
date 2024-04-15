import { AttendanceModel } from '@/models';
import { createSlice } from '@reduxjs/toolkit';

export const attendanceSlice = createSlice({
  name: 'attendance',
  initialState: {
    attendances: [] as AttendanceModel[],
  },
  reducers: {
    setAttendances: (state, action) => {
      state.attendances = action.payload.attendances;
    },
  },
});

export const { setAttendances } = attendanceSlice.actions;
