import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from 'src/utils/types/types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchGetFeeds,
  selectorOrders,
  selectIsLoading
} from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const feedOrders: TOrder[] = useSelector(selectorOrders);

  useEffect(() => {
    dispatch(fetchGetFeeds());
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(fetchGetFeeds());
  };

  if (isLoading) {
    return <Preloader />;
  }

  return <FeedUI orders={feedOrders} handleGetFeeds={handleGetFeeds} />;
};
