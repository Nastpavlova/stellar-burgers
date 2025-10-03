import { TUser } from '../../../utils/types';
import { AppDispatch, RootState } from '../../store';
import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  isPending,
  isRejected
} from '@reduxjs/toolkit';
import { setCookie } from '../../../utils/cookie';
import {
  registerUserApi,
  loginUserApi,
  getUserApi,
  logoutApi,
  updateUserApi
} from '../../../utils/burger-api';
import {
  TAuthResponse,
  TLoginData,
  TLogoutResponse,
  TUserResponse,
  TRegisterData
} from '../../../utils/api-types';

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
export const fetchAuthUser = createAsyncThunk<
  TAuthResponse,
  TRegisterData,
  { rejectValue: string }
>('user/auth', async (data, { rejectWithValue }) => {
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
  void,
  void,
  { dispatch: AppDispatch }
>('user/checkUserAuth', async (_, { dispatch }) => {
  if (localStorage.getItem('refreshToken')) {
    try {
      const res = await getUserApi();
      if (res.success) {
        dispatch(setUser(res.user));
      } else {
        dispatch(setUser(null));
      }
    } catch {
      dispatch(setUser(null));
      localStorage.removeItem('refreshToken');
      setCookie('accessToken', '', { expires: -1 });
    }
  } else {
    dispatch(setUser(null));
  }
  dispatch(setAuthChecked(true));
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
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })

      // разлогиниться
      .addCase(fetchLogout.fulfilled, (state) => {
        state.user = null;
        state.isAuthChecked = false;
      })

      // обновить данные пользователя
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })

      // регистрация нового юзера
      .addCase(fetchAuthUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })

      // pending
      .addMatcher(isPending, (state) => {
        state.error = null;
      })

      // rejected
      .addMatcher(isRejected, (state, action) => {
        state.error = action.error.message as string;
      });
  }
});

// селекторы
export const selectorUser = (state: RootState) => state.user.user;
export const selectorUserError = (state: RootState) => state.user.error;
export const selectorAuthChecked = (state: RootState) =>
  state.user.isAuthChecked;

// экшены
export const { setAuthChecked, setUser } = userSlice.actions;

export default userSlice.reducer;
