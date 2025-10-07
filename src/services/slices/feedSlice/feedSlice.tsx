import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrdersData } from 'src/utils/types/types';
import { RootState } from 'src/services/store';
import { getFeedsApi } from '../../../utils/api/feed-api';
import { TFeedsResponse } from '../../../utils/types/api-types';

interface TfeedState {
  ordersData: TOrdersData;
  isLoading: boolean;
  error: string | null;
}

const initialState: TfeedState = {
  ordersData: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  isLoading: false,
  error: null
};

export const fetchGetFeeds = createAsyncThunk<
  TFeedsResponse,
  void,
  { rejectValue: string }
>('feed/fetchGetFeeds', async (_, { rejectWithValue }) => {
  try {
    return await getFeedsApi();
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchGetFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.ordersData = {
          orders: action.payload.orders,
          total: action.payload.total,
          totalToday: action.payload.totalToday
        };
      })

      .addCase(fetchGetFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

//селекторы
export const selectIsLoading = (state: RootState) => state.feed.isLoading;
export const selectorFeed = (state: RootState) => state.feed.ordersData;
export const selectorOrders = (state: RootState) =>
  state.feed.ordersData.orders;

export const feedReducer = feedSlice.reducer;
