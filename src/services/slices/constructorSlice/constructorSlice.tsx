import { createSlice, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '../../../utils/types';
import { RootState } from '../../store';
import { PayloadAction } from '@reduxjs/toolkit';
import { fetchMakeOrder } from '../orderSlice';

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
  reducers: {
    addBun: (state, action: PayloadAction<TIngredient>) => {
      state.bun = action.payload;
    },

    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      state.ingredients.push({
        ...action.payload,
        id: nanoid()
      });
    },

    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },

    moveIngredientUp: (state, action: PayloadAction<number>) => {
      if (action.payload > 0) {
        [
          state.ingredients[action.payload],
          state.ingredients[action.payload - 1]
        ] = [
          state.ingredients[action.payload - 1],
          state.ingredients[action.payload]
        ];
      }
    },

    moveIngredientDown: (state, action: PayloadAction<number>) => {
      if (action.payload < state.ingredients.length - 1) {
        [
          state.ingredients[action.payload],
          state.ingredients[action.payload + 1]
        ] = [
          state.ingredients[action.payload + 1],
          state.ingredients[action.payload]
        ];
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMakeOrder.fulfilled, (state) => {
      state.bun = null;
      state.ingredients = [];
    });
  }
});

// селекторы
export const selectorBun = (state: RootState) => state.constructorBurger.bun;
export const selectorIngredients = (state: RootState) =>
  state.constructorBurger.ingredients;

// экшены
export const {
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown
} = constructorBurgerSlice.actions;

export const constructorReducer = constructorBurgerSlice.reducer;
