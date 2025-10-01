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

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder;
    // Здесь будут async thunks
  }
});

export const selectorIngredients = (state: RootState) => state.constructor;

export default constructorSlice.reducer;
