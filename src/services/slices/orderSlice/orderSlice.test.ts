import { 
    orderReducer, 
    fetchMakeOrder, 
    fetchOrderByNumber, 
    initialState } 
from '../orderSlice';
import { mockOrder, mockOrderResponse } from './order.mock';

describe('orderSlice: all tests', () => {
    describe('fetchMakeOrder: tests', () => {
        it('orderRequest = true when fetchMakeOrder.pending', () => {
            const action = {
                type: fetchMakeOrder.pending.type
            };
            const state = orderReducer(initialState, action);
            
            expect(state.orderRequest).toBe(true);
            expect(state.orderError).toBeNull();
        });

        it('orderRequest = false when fetchMakeOrder.fulfilled and get order', () => {        
            const action = {
                type: fetchMakeOrder.fulfilled.type,
                payload: mockOrderResponse
            };


            const state = orderReducer(initialState, action);
            
            expect(state.orderRequest).toBe(false);
            expect(state.orderModalData).toEqual(mockOrder);
            expect(state.orderError).toBeNull();
        });

        it('orderRequest = false when fetchMakeOrder.rejected and error', () => {
            const action = {
                type: fetchMakeOrder.rejected.type,
                payload: 'Error'
            };
            const state = orderReducer(initialState, action);
            
            expect(state.orderRequest).toBe(false);
            expect(state.orderError).toBe('Error');
        });
    });

    describe('fetchOrderByNumber: tests', () => {
        it('isLoading = true when fetchOrderByNumber.pending', () => {
            const action = {
                type: fetchOrderByNumber.pending.type
            };
            const state = orderReducer(initialState, action);
            
            expect(state.isLoading).toBe(true);
            expect(state.error).toBeNull();
            expect(state.order).toBeNull();
        });

        it('isLoading = false when fetchOrderByNumber.fulfilled and get order', () => {
            const action = {
                type: fetchOrderByNumber.fulfilled.type,
                payload: mockOrder
            };
            const state = orderReducer(initialState, action);
            
            expect(state.isLoading).toBe(false);
            expect(state.order).toEqual(mockOrder);
            expect(state.error).toBeNull();
        });

        it('isLoading = false when fetchOrderByNumber.rejected and error', () => {
            const action = {
                type: fetchOrderByNumber.rejected.type,
                payload: 'Error'
            };
            const state = orderReducer(initialState, action);
            
            expect(state.isLoading).toBe(false);
            expect(state.order).toBeNull();
            expect(state.error).toBe('Error');
        });
    });

    it('should clear orderModalData', () => {
        const stateWithModal = {
            ...initialState,
            orderModalData: mockOrder
        };
        const action = { type: 'order/clearOrderModal' };
        const state = orderReducer(stateWithModal, action);
        
        expect(state.orderModalData).toBeNull();
    });
});