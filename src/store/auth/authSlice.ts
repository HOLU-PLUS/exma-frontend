import { RoleModel } from '@/models';
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'not-authenticated',
    user: {},
    roleUser: null as RoleModel | null,
  },
  reducers: {
    onLogin: (state, { payload }) => {
      state.status = 'authenticated';
      state.user = payload;
    },
    onLoginCustomer: (state, { payload }) => {
      state.status = 'authenticatedCustomer';
      state.user = payload;
    },
    onLogout: (state) => {
      state.status = 'not-authenticated';
      state.user = {};
    },
    setRoleUser: (state, { payload }) => {
      state.roleUser = payload.role;
    }
  }
});


// Action creators are generated for each case reducer function
export const { onLogin, onLoginCustomer, onLogout, setRoleUser } = authSlice.actions;