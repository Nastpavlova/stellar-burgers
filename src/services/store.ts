import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice/userSlice';

// import {
//   userReducer,
//   ingredientsReducer,
//   burgerConstructorReducer,
//   feedReducer,
//   orderReducer,
// } from '../../pages/index';


import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  // ingredients: ingredientsReducer,
  // burgerConstructor: burgerConstructorReducer,
  // feed: feedReducer,
  // orders: orderReducer,
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
