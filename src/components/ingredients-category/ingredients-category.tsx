import { forwardRef, useMemo } from 'react';
import { TIngredientsCategoryProps } from './type';
import { TIngredient } from 'src/utils/types/types';
import { IngredientsCategoryUI } from '../ui/ingredients-category';
import {
  selectorBun,
  selectorIngredients
} from '../../services/slices/constructorSlice';
import { useSelector } from '../../services/store';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
  const bunState = useSelector(selectorBun);
  const ingredientsState = useSelector(selectorIngredients);

  const ingredientsCounters = useMemo(() => {
    const counters: { [key: string]: number } = {};
    ingredientsState.forEach((ingredient: TIngredient) => {
      if (!counters[ingredient._id]) counters[ingredient._id] = 0;
      counters[ingredient._id]++;
    });
    if (bunState) counters[bunState._id] = 2;
    return counters;
  }, [bunState, ingredientsState]);

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
    />
  );
});
