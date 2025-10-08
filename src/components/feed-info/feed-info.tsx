import { FC } from 'react';

import { TOrder } from 'src/utils/types/types';
import { FeedInfoUI } from '../ui/feed-info';
import { selectorFeed, selectorOrders } from '../../services/slices/feedSlice';
import { useSelector } from '../../services/store';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders = useSelector(selectorOrders);
  const feed = useSelector(selectorFeed);

  const readyOrders = getOrders(orders, 'done');
  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
