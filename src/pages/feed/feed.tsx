import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchGetFeeds,
  selectorOrders,
  selectIsLoading
} from '../../services/slices/feedSlice/feedSlice';


// ИСПРАВИТЬ // ИСПРАВИТЬ
// ИСПРАВИТЬ // ИСПРАВИТЬ
// ИСПРАВИТЬ // ИСПРАВИТЬ
// ИСПРАВИТЬ // ИСПРАВИТЬ
// ИСПРАВИТЬ // ИСПРАВИТЬ
// ИСПРАВИТЬ // ИСПРАВИТЬ
// ИСПРАВИТЬ // ИСПРАВИТЬ
// ИСПРАВИТЬ // ИСПРАВИТЬ
export const Feed: FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const feedOrders: TOrder[] = useSelector(selectorOrders);

  console.log('feedOrders:', feedOrders); // ИСПРАВИТЬ// ИСПРАВИТЬ// ИСПРАВИТЬ// ИСПРАВИТЬ// ИСПРАВИТЬ// ИСПРАВИТЬ// ИСПРАВИТЬ


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
