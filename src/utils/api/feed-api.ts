import { URL, checkResponse } from './base-api';
import { TFeedsResponse } from '../types/api-types';

// получение ленты заказов (feedtSlice -> fetchGetFeeds)
export const getFeedsApi = () =>
  fetch(`${URL}/orders/all`)
    .then((res) => checkResponse<TFeedsResponse>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });
