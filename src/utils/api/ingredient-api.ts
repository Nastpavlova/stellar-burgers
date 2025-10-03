import { checkResponse, URL } from '../api/base-api';
import { TIngredientsResponse } from '../api-types';

// получение ингредиентов (ingredientSlice -> fetchIngredients)
export const getIngredientsApi = () =>
  fetch(`${URL}/ingredients`)
    .then((res) => checkResponse<TIngredientsResponse>(res))
    .then((data) => {
      if (data?.success) return data.data;
      return Promise.reject(data);
    });
