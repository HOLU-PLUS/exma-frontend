import { GuestModel } from '@/models';
import { createSlice } from '@reduxjs/toolkit';

export const guestSlice = createSlice({
  name: 'guest',
  initialState: {
    guests: [] as GuestModel[],
    guest: null as GuestModel|null,
  },
  reducers: {
    setGuest: (state, action) => {
      state.guest = action.payload.guest;
    },
    setGuests: (state, action) => {
      state.guests = action.payload.guests;
    },
    setAddGuest: (state, action) => {
      state.guests = [...state.guests, action.payload.guest];
    },
    setUpdateGuest: (state, action) => {
      state.guests = [...state.guests.map((e) => {
        if (e.id === action.payload.guest.id) {
          return {
            ...action.payload.guest
          }
        }
        return e
      })];
    },
    setDeleteGuest: (state, action) => {
      state.guests = [...state.guests.filter(e => e.id != action.payload.id)];
    },
  }
});


// Action creators are generated for each case reducer function
export const { setGuest, setGuests, setAddGuest, setUpdateGuest, setDeleteGuest } = guestSlice.actions;