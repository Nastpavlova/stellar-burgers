// мок списка заказов
export const mockFeed = {
    success: true,
    orders: [
        {
            _id: '1',
            status: 'done',
            name: 'name1',
            createdAt: '2024-12-07',
            updatedAt: '2024-12-07',
            number: 1,
            ingredients: ['bun', 'main', 'sause']
        },
        {
            _id: '2',
            status: 'pending',
            name: 'name2',
            createdAt: '2024-12-07',
            updatedAt: '2024-12-07',
            number: 2,
            ingredients: ['bun', 'main', 'main', 'sause']
        }
    ],
    total: 2,
    totalToday: 2
};