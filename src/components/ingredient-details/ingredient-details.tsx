import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
// import { useParams } from 'react-router-dom';
// import { useSelector } from '../../services/store';
// import { selectorIngredients } from '../../services/slices/ingredientSlice/ingredientSlice';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  // const { id } = useParams<{ id: string }>();
  // const ingredients = useSelector(selectorIngredients);
  const ingredientData = null;

  // console.log('ingredients = ', ingredients);
  // console.log('id = ', id);
  // console.log('ingredientData = ', ingredientData);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};

//   const ingredientData = ingredients.find((item) => item._id === id);

//   if (!ingredientData) {
//     return <Preloader />;
//   }

//   return <IngredientDetailsUI ingredientData={ingredientData} />;
// };
