import { TUser } from '../../../utils/types';
import { AppDispatch, RootState } from '../../store';
import { createSlice, PayloadAction, createAsyncThunk, isRejectedWithValue} from '@reduxjs/toolkit';
import { setCookie } from '../../../utils/cookie';
import { 
  registerUserApi, 
  loginUserApi, 
  getUserApi, 
  logoutApi, 
  updateUserApi,
  TAuthResponse,
  TLoginData,
  TLogoutResponse,
  TUserResponse,
  TRegisterData
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
})

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
})

// получить пользователя
export const fetchGetUser = createAsyncThunk<
  TUserResponse,
  void,
  { rejectValue: string } 
>('user/getUser', async (_, { rejectWithValue }) => {
  try {
    return await getUserApi();
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
})

// регистрация нового юзера
export const fetchRegisterUser = createAsyncThunk<
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
})

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
