import { ordersReducer, fetchGetOrders, initialState } from '../ordersSlice';
import { mockOrders } from './orders.mock';

describe('ordersSlice: all tests', () => {
  describe('fetchGetOrders: tests', () => {
    it('isLoading = true when fetchGetOrders.pending', () => {
      const action = {
        type: fetchGetOrders.pending.type
      };
      const state = ordersReducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
      expect(state.orders).toEqual([]);
    });

    it('isLoading = false when fetchGetOrders.fulfilled and get orders', () => {
      const action = {
        type: fetchGetOrders.fulfilled.type,
        payload: mockOrders
      };
      const state = ordersReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.orders).toEqual(mockOrders);
      expect(state.error).toBeNull();
    });

    it('isLoading = false when fetchGetOrders.rejected and error', () => {
      const action = {
        type: fetchGetOrders.rejected.type,
        payload: 'Error'
      };
      const state = ordersReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.orders).toEqual([]);
      expect(state.error).toBe('Error');
    });
  });
});
