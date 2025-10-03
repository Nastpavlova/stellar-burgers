import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  selectorIngredients,
  selectorBun
} from '../../services/slices/constructorSlice/constructorSlice';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import {
  selectorOrderRequest,
  selectorModalData
} from '../../services/slices/orderSLice/orderSlice';
import { selectorUser } from '../../services/slices/userSlice/userSlice';

export const BurgerConstructor: FC = () => {
  const bun = useSelector(selectorBun);
  const ingredients = useSelector(selectorIngredients);
  const orderRequest = useSelector(selectorOrderRequest);
  const orderModalData = useSelector(selectorModalData);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectorUser);

  // дописать
  const onOrderClick = () => {
    if (!bun || orderRequest) return;
  };

  // дописать
  const closeOrderModal = () => {};

  const price = useMemo(
    () =>
      (bun ? bun.price * 2 : 0) +
      ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [bun, ingredients]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={{ bun, ingredients }}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
