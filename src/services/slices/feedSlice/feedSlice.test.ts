import { 
    feedReducer,
    fetchGetFeeds,
    initialState
} from '../feedSlice';

import { mockFeed } from './orders.mock';

describe('feedSlice: all tests', () => {

    it('isLoading = true when fetchGetFeeds.pending ', () => {
        const action = { 
            type: fetchGetFeeds.pending.type 
        };
        const state = feedReducer(
            initialState, 
            action
        );
        expect(state.isLoading).toBe(true);
        expect(state.error).toBeNull();
    });

    it('isLoading = false when fetchGetFeeds.fulfilled and get orders', () => {
        const action = {
            type: fetchGetFeeds.fulfilled.type,
            payload: mockFeed
        };
        const state = feedReducer(
            initialState, 
            action
        );
        expect(state.isLoading).toBe(false);
        expect(state.ordersData).toEqual({
            orders: mockFeed.orders,
            total: mockFeed.total,
            totalToday: mockFeed.totalToday
        });
        expect(state.error).toBeNull();
    });

    it('isLoading = false when fetchGetFeeds.rejected and error', () => {
        const action = {
            type: fetchGetFeeds.rejected.type,
            payload: 'Error' 
        };
        const state = feedReducer(initialState, action);
        expect(state.isLoading).toBe(false);
        expect(state.ordersData).toEqual(initialState.ordersData);
        expect(state.error).toBe('Error');
    });
});