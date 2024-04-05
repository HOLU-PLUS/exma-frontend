import { EventModel } from '@/models';
import { createSlice } from '@reduxjs/toolkit';

export const eventSlice = createSlice({
  name: 'event',
  initialState: {
    events: [] as EventModel[],
  },
  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload.events;
    },
    setAddEvent: (state, action) => {
      state.events = [...state.events, action.payload.event];
    },
    setUpdateEvent: (state, action) => {
      state.events = [...state.events.map((e) => {
        if (e.id === action.payload.event.id) {
          return {
            ...action.payload.event
          }
        }
        return e
      })];
    },
    setRegisterPayment: (state, action) => {
      // state.events = [...state.treatments.map((treatment: EventModel) => {
      //   if (treatment.id === action.payload.payment.treatmentId) {
      //     return ({
      //       ...treatment,
      //       amountDue: action.payload.amountDue,
      //       payments: [...treatment.payments, action.payload.payment]
      //     })
      //   }
      //   return treatment
      // })];
    },
  }
});


// Action creators are generated for each case reducer function
export const { setEvents, setAddEvent, setUpdateEvent, setRegisterPayment } = eventSlice.actions;