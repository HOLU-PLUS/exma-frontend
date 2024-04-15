import { EventModel } from '@/models';
import { createSlice } from '@reduxjs/toolkit';

export const eventSlice = createSlice({
  name: 'event',
  initialState: {
    events: [] as EventModel[],
    event: null as EventModel | null,
  },
  reducers: {
    //events
    setEvents: (state, action) => {
      state.events = action.payload.events;
    },
    setAddEvent: (state, action) => {
      state.events = [...state.events, action.payload.event];
    },
    setUpdateEvent: (state, action) => {
      state.events = [
        ...state.events.map((e) => {
          if (e.id === action.payload.event.id) {
            return {
              ...action.payload.event,
            };
          }
          return e;
        }),
      ];
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
    //event
    setResetEvent: (state,action)=>{
      state.event = action.payload.event;
    },
    setEvent: (state, action) => {
      state.event = state.event
        ? { ...action.payload.event, activities: state.event.activities }
        : action.payload.event;
    },
    setAddActivity: (state, action) => {
      if (!state.event) return;
      const existingActivityIndex = state.event?.activities.findIndex(
        (activity) => activity.id === action.payload.activity.id
      );

      if (existingActivityIndex !== -1) {
        // Si el activity ya existe, actualiza el activity existente en la lista
        state.event.activities[existingActivityIndex] = action.payload.activity;
      } else {
        // Si el activity no existe, agrégalo a la lista
        state.event = {
          ...(state.event as EventModel),
          activities: [...(state.event.activities ?? []), action.payload.activity],
        };
      }
    },
    setRemoveActivity: (state, action) => {
      if (!state.event) return;
      state.event = {
        ...state.event,
        activities: state.event.activities.filter((activity) => activity.id !== action.payload.id),
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setEvents,
  setAddEvent,
  setUpdateEvent,
  setRegisterPayment,
  setResetEvent,
  setEvent,
  setAddActivity,
  setRemoveActivity,
} = eventSlice.actions;
