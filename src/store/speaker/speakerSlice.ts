import { SpeakerModel } from '@/models/speaker';
import { createSlice } from '@reduxjs/toolkit';

export const speakerSlice = createSlice({
  name: 'speaker',
  initialState: {
    speakers: [] as SpeakerModel[],
  },
  reducers: {
    setSpeakers: (state, action) => {
      state.speakers = action.payload.speakers;
    },
    setAddSpeaker: (state, action) => {
      state.speakers = [...state.speakers, action.payload.speaker];
    },
    setUpdateSpeaker: (state, action) => {
      state.speakers = [...state.speakers.map((e) => {
        if (e.id === action.payload.speaker.id) {
          return {
            ...action.payload.speaker
          }
        }
        return e
      })];
    },
    setDeleteSpeaker: (state, action) => {
      state.speakers = [...state.speakers.filter(e => e.id != action.payload.id)];
    },
  }
});


// Action creators are generated for each case reducer function
export const { setSpeakers, setAddSpeaker, setUpdateSpeaker, setDeleteSpeaker } = speakerSlice.actions;