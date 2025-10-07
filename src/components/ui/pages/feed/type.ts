import { TOrder } from 'src/utils/types/types';

export type FeedUIProps = {
  orders: TOrder[];
  handleGetFeeds: () => void;
};
