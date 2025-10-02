import { createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '../../../utils/types';
import { RootState } from '../../store';

interface TconstructorState {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: TconstructorState = {
  bun: null,
  ingredients: []
};

export const constructorBurgerSlice = createSlice({
  name: 'constructorBurger',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder;
    // Здесь будут async thunks
  }
});

// селекторы
export const selectorBun = (state: RootState) => state.constructorBurger.bun;
export const selectorIngredients = (state: RootState) =>
  state.constructorBurger.ingredients;

export default constructorBurgerSlice.reducer;
