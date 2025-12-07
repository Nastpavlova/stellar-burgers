import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '../../../utils/types/types';
import { RootState } from 'src/services/store';
import { getOrdersApi } from '../../../utils/api/order-api';

interface orderState {
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
}

export const initialState: orderState = {
  orders: [],
  isLoading: false,
  error: null
};

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

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchGetOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchGetOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })

      .addCase(fetchGetOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

//селекторы
export const selectorOrdersIsLoading = (state: RootState) =>
  state.orders.isLoading;
export const selectorOrders = (state: RootState) => state.orders.orders;
export const selectorError = (state: RootState) => state.orders.error;

export const ordersReducer = ordersSlice.reducer;
