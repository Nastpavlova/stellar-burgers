import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from 'src/utils/types/types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchGetOrders,
  selectorOrders
} from '../../services/slices/ordersSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(selectorOrders);

  useEffect(() => {
    dispatch(fetchGetOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders || []} />;
};
