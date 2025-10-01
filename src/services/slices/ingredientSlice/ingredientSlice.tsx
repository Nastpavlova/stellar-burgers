import { TIngredient } from '../../../utils/types';
import { RootState } from '../../store';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

interface TIngredientState {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TIngredientState = {
  ingredients: [],
  isLoading: true,
  error: null
};

export const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder;
    // Здесь будут async thunks
  }
});

// селекторы
export const selectorIngredients = (state: RootState) =>
  state.ingredients.ingredients;
export const selectorIsLoading = (state: RootState) =>
  state.ingredients.isLoading;

export default ingredientSlice.reducer;
