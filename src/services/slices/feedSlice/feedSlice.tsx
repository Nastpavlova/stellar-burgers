import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { RootState } from 'src/services/store';

interface TfeedState {
  orders: TOrder[];
  feed: {};
}

const initialState: TfeedState = {
  orders: [],
  feed: {}
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //тут будут async thunk
  }
});

//селекторы
export const selectorOrders = (state: RootState) => state.feed.orders;
export const selectorFeed = (state: RootState) => state.feed.feed;

export default feedSlice.reducer;
