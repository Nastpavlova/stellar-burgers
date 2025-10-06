import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '../../../utils/types';
import { RootState } from 'src/services/store';
import { TNewOrderResponse } from '../../../utils/api-types';
import {
  orderBurgerApi,
  getOrderByNumberApi
} from '../../../utils/api/order-api';

interface orderState {
  // для создания заказа
  orderRequest: boolean;
  orderModalData: TOrder | null;
  orderError: string | null;

  // для просмотра заказа
  order: TOrder | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: orderState = {
  // для создания заказа
  orderRequest: false,
  orderModalData: null,
  orderError: null,

  // для просмотра заказа
  order: null,
  isLoading: false,
  error: null
};

// сделать заказ на сервер
export const fetchMakeOrder = createAsyncThunk<
  TNewOrderResponse,
  string[],
  { rejectValue: string }
>('orders/makeOrder', async (data, { rejectWithValue }) => {
  try {
    return await orderBurgerApi(data);
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

// получить конкретный заказ
export const fetchOrderByNumber = createAsyncThunk<
  TOrder,
  number,
  { rejectValue: string }
>('orders/orderByNumber', async (data, { rejectWithValue }) => {
  try {
    const response = await getOrderByNumberApi(data);
    return response.orders[0];
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderModal: (state) => {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder

      // сделать заказ на сервер
      .addCase(fetchMakeOrder.pending, (state) => {
        state.orderRequest = true;
        state.orderError = null;
      })

      .addCase(fetchMakeOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })

      .addCase(fetchMakeOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.orderError = action.payload as string;
      })

      // получить конкретный заказ
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
      })

      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

//селекторы
export const selectorOrderRequest = (state: RootState) =>
  state.order.orderRequest;
export const selectorModalData = (state: RootState) =>
  state.order.orderModalData;
export const selectorOrderError = (state: RootState) => state.order.orderError;
export const selectorOrder = (state: RootState) => state.order.order;
export const selectorIsLoading = (state: RootState) => state.order.isLoading;
export const selectorError = (state: RootState) => state.order.error;

//экшены
export const { clearOrderModal } = orderSlice.actions;

export default orderSlice.reducer;
