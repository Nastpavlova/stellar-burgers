import { TUser } from '../../../utils/types/types';
import { AppDispatch, RootState } from '../../store';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { setCookie } from '../../../utils/types/cookie';
import {
  registerUserApi,
  loginUserApi,
  getUserApi,
  logoutApi,
  updateUserApi
} from '../../../utils/api/user-api';
import {
  TAuthResponse,
  TLoginData,
  TLogoutResponse,
  TUserResponse,
  TRegisterData
} from '../../../utils/types/api-types';

interface TUserState {
  isAuthChecked: boolean;
  user: TUser | null;
  error: string | null;
}

export const initialState: TUserState = {
  isAuthChecked: false,
  user: null,
  error: null
};

// залогиниться
export const fetchLogin = createAsyncThunk<
  TAuthResponse,
  TLoginData,
  { rejectValue: string }
>('user/login', async (data, { rejectWithValue }) => {
  try {
    const result = await loginUserApi(data);
    localStorage.setItem('refreshToken', result.refreshToken);
    setCookie('accessToken', result.accessToken);
    return result;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

// разлогиниться
export const fetchLogout = createAsyncThunk<
  TLogoutResponse,
  void,
  { rejectValue: string }
>('user/logout', async (_, { rejectWithValue }) => {
  try {
    const result = await logoutApi();
    localStorage.removeItem('refreshToken');
    setCookie('accessToken', '', { expires: -1 });
    return result;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

// обновить данные пользователя
export const fetchUpdateUser = createAsyncThunk<
  TUserResponse,
  Partial<TRegisterData>,
  { rejectValue: string }
>('user/updateUser', async (data, { rejectWithValue }) => {
  try {
    return await updateUserApi(data);
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

// регистрация нового юзера
export const fetchRegistrationUser = createAsyncThunk<
  TAuthResponse,
  TRegisterData,
  { rejectValue: string }
>('user/registration', async (data, { rejectWithValue }) => {
  try {
    const result = await registerUserApi(data);
    localStorage.setItem('refreshToken', result.refreshToken);
    setCookie('accessToken', result.accessToken);
    return result;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

// проверка авторизации
export const checkUserAuth = createAsyncThunk<
  TUser | null,
  void,
  { rejectValue: string }
>('user/checkUserAuth', async (_, { rejectWithValue }) => {
  if (!localStorage.getItem('refreshToken')) {
    return null;
  }

  try {
    const res = await getUserApi();
    if (res.success) {
      return res.user;
    } else {
      localStorage.removeItem('refreshToken');
      setCookie('accessToken', '', { expires: -1 });
      return null;
    }
  } catch (error) {
    localStorage.removeItem('refreshToken');
    setCookie('accessToken', '', { expires: -1 });
    return rejectWithValue((error as Error).message);
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },

    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder

      // залогиниться
      .addCase(fetchLogin.pending, (state) => {
        state.error = null;
      })

      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.error = null;
      })

      .addCase(
        fetchLogin.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload || 'Ошибка входа';
          state.isAuthChecked = true;
          state.user = null;
        }
      )

      // разлогиниться
      .addCase(fetchLogout.pending, (state) => {
        state.error = null;
      })

      .addCase(fetchLogout.fulfilled, (state) => {
        state.user = null;
        state.isAuthChecked = true;
        state.error = null;
      })

      .addCase(
        fetchLogout.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload || 'Ошибка выхода';
          state.isAuthChecked = true;
        }
      )

      // обновить данные пользователя
      .addCase(fetchUpdateUser.pending, (state) => {
        state.error = null;
      })

      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.error = null;
      })

      .addCase(
        fetchUpdateUser.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload || 'Ошибка обновления данных';
          state.isAuthChecked = true;
        }
      )

      // регистрация нового юзера
      .addCase(fetchRegistrationUser.pending, (state) => {
        state.error = null;
      })

      .addCase(fetchRegistrationUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.error = null;
      })

      .addCase(
        fetchRegistrationUser.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload || 'Ошибка регистрации';
          state.isAuthChecked = true;
        }
      )

      // проверка авторизации
      .addCase(checkUserAuth.pending, (state) => {
        state.error = null;
      })

      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
        state.error = null;
      })

      .addCase(
        checkUserAuth.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.user = null;
          state.isAuthChecked = true;
          state.error = action.payload || 'Ошибка авторизации';
        }
      );
  }
});

// селекторы
export const selectorUser = (state: RootState) => state.user.user;
export const selectorUserError = (state: RootState) => state.user.error;
export const selectorAuthChecked = (state: RootState) =>
  state.user.isAuthChecked;

// экшены
export const { setAuthChecked, setUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
