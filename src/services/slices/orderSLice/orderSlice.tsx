import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '../../../utils/types';
import { RootState } from 'src/services/store';

interface orderState {
  orders: TOrder[];
  orderRequest: boolean;
  orderModalData: TOrder | null;
}

const initialState: orderState = {
  orders: [],
  orderRequest: false,
  orderModalData: null
};

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder;
    // Здесь будут async thunks
  }
});

//селекторы
export const selectorOrderRequest = (state: RootState) =>
  state.orders.orderRequest;
export const selectorModalData = (state: RootState) =>
  state.orders.orderModalData;

export default orderSlice.reducer;
