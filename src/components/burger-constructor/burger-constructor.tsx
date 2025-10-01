import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { selectorConstructorIngredients } from '../../services/slices/constructorSlice/constructorSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectorOrderRequest,
  selectorModalData
} from '../../services/slices/orderSLice/orderSlice';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(selectorConstructorIngredients);
  const orderRequest = useSelector(selectorOrderRequest);
  const orderModalData = useSelector(selectorModalData);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
  };
  const closeOrderModal = () => {};

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
