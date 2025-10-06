import { FC, useMemo, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { fetchOrderByNumber } from '../../services/slices/orderSlice/orderSlice';
import { selectorIngredients } from '../../services/slices/ingredientSlice/ingredientSlice';
import { selectorOrders } from '../../services/slices/feedSlice/feedSlice';
import { selectorOrder } from '../../services/slices/orderSlice/orderSlice';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const ingredients: TIngredient[] = useSelector(selectorIngredients);

  const { number } = useParams<{ number: string }>();

  const orderData = useSelector(
    (state) =>
      selectorOrders(state).find(
        (currentOrder) => currentOrder.number === Number(number)
      ) || selectorOrder(state)
  );

  useEffect(() => {
    if (!orderData) {
      dispatch(fetchOrderByNumber(Number(number)));
    }
  }, [dispatch, number, orderData]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
