import { Location } from 'react-router-dom';
import { TIngredient } from 'src/utils/types/types';

export type TBurgerIngredientUIProps = {
  ingredient: TIngredient;
  count: number;
  locationState: { background: Location };
  handleAdd: () => void;
};
