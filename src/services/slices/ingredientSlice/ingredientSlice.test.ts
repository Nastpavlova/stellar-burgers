import { mockIngredients } from './ingredients.mock';

import {
  ingredientsReducer,
  fetchIngredients,
  initialState
} from '../ingredientSlice';

describe('ingredientSlice: all tests', () => {
  it('isLoading = true when fetchIngredients.pending', () => {
    const action = {
      type: fetchIngredients.pending.type
    };
    const state = ingredientsReducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
    expect(state.ingredients).toEqual([]);
  });

  it('isLoading = false when fetchIngredients.fulfilled and get ingredients', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const state = ingredientsReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toEqual(mockIngredients);
    expect(state.error).toBeNull();
  });

  it('isLoading = false when fetchIngredients.rejected and error', () => {
    const action = {
      type: fetchIngredients.rejected.type,
      payload: 'Error'
    };
    const state = ingredientsReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toEqual([]);
    expect(state.error).toBe('Error');
  });
});
