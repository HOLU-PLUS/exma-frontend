import { RequestModel } from '@/models';
import { createSlice } from '@reduxjs/toolkit';

export const requestSlice = createSlice({
  name: 'request',
  initialState: {
    requests: [] as RequestModel[],
  },
  reducers: {
    setRequests: (state, action) => {
      state.requests = action.payload.requests;
    },
    setAddRequest: (state, action) => {
      state.requests = [...state.requests, action.payload.request];
    },
    setUpdateRequest: (state, action) => {
      state.requests = [...state.requests.map((e) => {
        if (e.id === action.payload.request.id) {
          return {
            ...action.payload.request
          }
        }
        return e
      })];
    },
    setDeleteRequest: (state, action) => {
      state.requests = [...state.requests.filter(e => e.id != action.payload.id)];
    },
  }
});


// Action creators are generated for each case reducer function
export const { setRequests, setAddRequest, setUpdateRequest, setDeleteRequest } = requestSlice.actions;