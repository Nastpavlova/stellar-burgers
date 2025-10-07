import { TIngredient, TOrder, TOrdersData, TUser } from './types';

export type TServerResponse<T> = {
  success: boolean;
} & T;

export type TUserResponse = TServerResponse<{ user: TUser }>;

export type TLogoutResponse = TServerResponse<{}>;

export type TRefreshResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
}>;

export type TIngredientsResponse = TServerResponse<{
  data: TIngredient[];
}>;

export type TFeedsResponse = TServerResponse<{
  orders: TOrder[];
  total: number;
  totalToday: number;
}>;

export type TOrdersResponse = TServerResponse<{
  data: TOrder[];
}>;

export type TNewOrderResponse = TServerResponse<{
  order: TOrder;
  name: string;
}>;

export type TOrderResponse = TServerResponse<{
  orders: TOrder[];
}>;

export type TRegisterData = {
  email: string;
  name: string;
  password: string;
};

export type TAuthResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
  user: TUser;
}>;

export type TLoginData = {
  email: string;
  password: string;
};
