import { 
    mockBun, 
    mockMainIngredient, 
    mockSauce,  
    mockIngredientsWithID,
    afterDeleteMockIngredientsWithID,
    afterMoveMockIngredientsWithID
} from './ingredients.mock';
import { fetchMakeOrder } from '../orderSlice';
import {
    constructorReducer,
    initialState,
    addBun,
    addIngredient,
    removeIngredient,
    moveIngredientDown,
    moveIngredientUp,
} from './constructorSlice';

// мокаем nanoid
jest.mock('@reduxjs/toolkit', () => {
    const original = jest.requireActual('@reduxjs/toolkit');
    return {
        ...original,
        nanoid: jest.fn(() => 'mockedId-0')
    };
});

describe('constructorSlice: all tests', () => {
    describe('constructorSlice: add ingredient', () => {
        it('add bun ingredient', () => {
            const state = constructorReducer(
                initialState,
                addBun(mockBun)
            );
            expect(state.bun).toEqual(mockBun);
        })

        it('add main ingredient', () => {
            const ingredientWithId = {
                ...mockMainIngredient,
                id: 'mockedId-0'
            };
            const state = constructorReducer(
                initialState,
                addIngredient(ingredientWithId)
            );
            expect(state.ingredients).toEqual([ingredientWithId]);
        })

        it('add sauce ingredient', () => {
            const ingredientWithId = {
                ...mockSauce,
                id: 'mockedId-0'
            };
            const state = constructorReducer(
                initialState,
                addIngredient(ingredientWithId)
            );
            expect(state.ingredients).toEqual([ingredientWithId]);
        })
    });

    it('constructorSlice: delete ingredient', () => {
        const initialIngredientsState = {
            ...initialState,
            ingredients: mockIngredientsWithID
        };
        const firstIngredientId = mockIngredientsWithID[0].id;
        const stateAfterDelete = constructorReducer(
            initialIngredientsState,
            removeIngredient(firstIngredientId)
        );
        expect(stateAfterDelete.ingredients).toEqual(afterDeleteMockIngredientsWithID);
    });

    describe('constructorSlice: move ingredients', () => {
        it('should move second ingredient to first position when moving up', () => {
            const initialIngredientsState = {
                ...initialState,
                ingredients: mockIngredientsWithID
            };
            const stateAfterMove = constructorReducer(
                initialIngredientsState, 
                moveIngredientUp(1)
            );
            expect(stateAfterMove.ingredients).toEqual(afterMoveMockIngredientsWithID);
        });

        it('should not move first ingredient up', () => {
            const initialIngredientsState = {
                ...initialState,
                ingredients: mockIngredientsWithID
            };
            const state = constructorReducer(
                initialIngredientsState,
                moveIngredientUp(0)
            );
            expect(state.ingredients).toEqual(mockIngredientsWithID);
        });

        it('should move first ingredient to second position when moving down', () => {
            const initialIngredientsState = {
                ...initialState,
                ingredients: mockIngredientsWithID
            };
            const stateAfterMove = constructorReducer(
                initialIngredientsState, 
                moveIngredientDown(0)
            );
            expect(stateAfterMove.ingredients).toEqual(afterMoveMockIngredientsWithID);
        });

        it('should not move last ingredient down', () => {
            const initialIngredientsState = {
                ...initialState,
                ingredients: mockIngredientsWithID
            };
            const state = constructorReducer(
                initialIngredientsState,
                moveIngredientDown(1)
            );
            expect(state.ingredients).toEqual(mockIngredientsWithID);
        });
    });

    it('constructorSlice: should clear constructor when order is successfully created', () => {
        const filledConstructor = {
            bun: mockBun,
            ingredients: mockIngredientsWithID
        };
        const action = {
            type: fetchMakeOrder.fulfilled.type
        };
        const state = constructorReducer(filledConstructor, action);
        expect(state.ingredients).toEqual([]);
        expect(state.bun).toBeNull();
    }); 
});