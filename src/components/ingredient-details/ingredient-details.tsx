import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { selectorIngredients } from '../../services/slices/ingredientSlice/ingredientSlice';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const ingredients = useSelector(selectorIngredients);
  const ingredientData = ingredients.filter((item) => item._id === id)[0];

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
