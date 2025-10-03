import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '../../../utils/types';
import { RootState } from 'src/services/store';
import { TNewOrderResponse } from '../../../utils/api-types';
import {
  orderBurgerApi,
  getOrdersApi,
  getOrderByNumberApi
} from '../../../utils/api/order-api';

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

// получить список текущих заказов
export const fetchGetOrders = createAsyncThunk<
  TOrder[],
  void,
  { rejectValue: string }
>('orders/getOrders', async (_, { rejectWithValue }) => {
  try {
    return await getOrdersApi();
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
