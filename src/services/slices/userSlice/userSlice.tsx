import { TUser } from '../../../utils/types';
import { AppDispatch, RootState } from '../../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  registerUserApi,
  loginUserApi,
  getUserApi,
  logoutApi,
  updateUserApi
} from '../../../utils/burger-api';

interface TUserState {
  isAuthChecked: boolean;
  user: TUser | null;
  error: string | null;
}

const initialState: TUserState = {
  isAuthChecked: false,
  user: null,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },

    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    // builder;
    // Здесь будут async thunks
  }
});

// селекторы
export const selectorUser = (state: RootState) => state.user.user;
export const selectorAuthChecked = (state: RootState) =>
  state.user.isAuthChecked;

// экшены
export const { authChecked, setUser } = userSlice.actions;

export default userSlice.reducer;
