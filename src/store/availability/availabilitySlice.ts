import { AvailabilityModel } from '@/models/availability';
import { createSlice } from '@reduxjs/toolkit';

export const availabilitySlice = createSlice({
  name: 'availability',
  initialState: {
    availabilities: [] as AvailabilityModel[],
  },
  reducers: {
    setAvailabilities: (state, action) => {
      state.availabilities = action.payload.availabilities;
    },
    setAddAvailability: (state, action) => {
      state.availabilities = [...state.availabilities, action.payload.availability];
    },
    setUpdateAvailability: (state, action) => {
      state.availabilities = [
        ...state.availabilities.map((e) => {
          if (e.id === action.payload.availability.id) {
            return {
              ...action.payload.availability,
            };
          }
          return e;
        }),
      ];
    },
    setDeleteAvailability: (state, action) => {
      state.availabilities = [...state.availabilities.filter((e) => e.id != action.payload.id)];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setAvailabilities,
  setAddAvailability,
  setUpdateAvailability,
  setDeleteAvailability,
} = availabilitySlice.actions;
