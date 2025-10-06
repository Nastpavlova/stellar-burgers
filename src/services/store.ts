import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice/userSlice';
import ingredientsReducer from './slices/ingredientSlice/ingredientSlice';
import constructorReducer from './slices/constructorSlice/constructorSlice';
import orderReducer from './slices/orderSlice/orderSlice';
import feedReducer from './slices/feedSlice/feedSlice';
import ordersReducer from './slices/ordersSlice/ordersSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorBurger: constructorReducer,
  feed: feedReducer,
  order: orderReducer,
  orders: ordersReducer,
  user: userReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
