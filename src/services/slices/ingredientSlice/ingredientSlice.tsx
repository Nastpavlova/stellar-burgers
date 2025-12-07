import { TIngredient } from '../../../utils/types/types';
import { RootState } from '../../store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../../utils/api/ingredient-api';

interface TIngredientState {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null;
}

export const initialState: TIngredientState = {
  ingredients: [],
  isLoading: true,
  error: null
};

export const fetchIngredients = createAsyncThunk<
  TIngredient[],
  void,
  { rejectValue: string }
>('ingredients/fetchIngredients', async (_, { rejectWithValue }) => {
  try {
    return await getIngredientsApi();
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.ingredients = action.payload;
      })

      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.ingredients = [];
      });
  }
});

// селекторы
export const selectorIngredients = (state: RootState) =>
  state.ingredients.ingredients;
export const selectorIsLoading = (state: RootState) =>
  state.ingredients.isLoading;

export const ingredientsReducer = ingredientSlice.reducer;
