import { SpeakerModel } from '@/models/speaker';
import { createSlice } from '@reduxjs/toolkit';

export const speakerSlice = createSlice({
  name: 'speaker',
  initialState: {
    speaker: [] as SpeakerModel[],
  },
  reducers: {
    setSpeakers: (state, action) => {
      state.speaker = action.payload.speakers;
    },
    setAddSpeaker: (state, action) => {
      state.speaker = [...state.speaker, action.payload.speaker];
    },
    setUpdateSpeaker: (state, action) => {
      state.speaker = [...state.speaker.map((e) => {
        if (e.id === action.payload.speaker.id) {
          return {
            ...action.payload.speaker
          }
        }
        return e
      })];
    },
    setDeleteSpeaker: (state, action) => {
      state.speaker = [...state.speaker.filter(e => e.id != action.payload.id)];
    },
  }
});


// Action creators are generated for each case reducer function
export const { setSpeakers, setAddSpeaker, setUpdateSpeaker, setDeleteSpeaker } = speakerSlice.actions;