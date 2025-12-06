// мок для fetchMakeOrder.pending
export const mockOrder = {
  _id: '1',
  status: 'done',
  name: 'name',
  createdAt: '2025-12-07',
  updatedAt: '2025-12-07',
  number: 1,
  ingredients: ['bun', 'main']
};

// мок для fetchMakeOrder.fulfilled
export const mockOrderResponse = {
  success: true,
  order: mockOrder,
  name: 'name'
};
