import { rootReducer } from './store';
import { configureStore } from '@reduxjs/toolkit';

import { initialState as ingredientInitialState } from './slices/ingredientSlice/ingredientSlice';
import { initialState as constructorBurgerInitialState } from './slices/constructorSlice/constructorSlice';
import { initialState as feedInitialState } from './slices/feedSlice/feedSlice';
import { initialState as orderInitialState } from './slices/orderSlice/orderSlice';
import { initialState as ordersInitialState } from './slices/ordersSlice/ordersSlice';
import { initialState as userInitialState } from './slices/userSlice/userSlice';

describe('rootReducer tests', () => {
    it('rootReducer: test of the correct initialization', () => {
        const store = configureStore({
            reducer: rootReducer
        });

        const state = store.getState();

        expect(state).toEqual({
            ingredients: ingredientInitialState,
            constructorBurger: constructorBurgerInitialState,
            feed: feedInitialState,
            order: orderInitialState,
            orders: ordersInitialState,
            user: userInitialState
        });
    });
});
