import { TIngredient } from 'src/utils/types/types';

export type TIngredientsCategoryProps = {
  title: string;
  titleRef: React.RefObject<HTMLHeadingElement>;
  ingredients: TIngredient[];
};
