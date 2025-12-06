import {
  userReducer,
  fetchLogin,
  fetchLogout,
  fetchUpdateUser,
  fetchRegistrationUser,
  checkUserAuth,
  setAuthChecked,
  setUser,
  initialState
} from './userSlice';
import { mockUser, mockUpdatedUser, mockAuthResponse } from './user.mock';

describe('userSlice: all tests', () => {
  describe('fetchLogin: tests', () => {
    it('error = null when fetchLogin.pending', () => {
      const action = {
        type: fetchLogin.pending.type
      };
      const state = userReducer(initialState, action);

      expect(state.isAuthChecked).toBe(false);
      expect(state.error).toBeNull();
    });

    it('isAuthChecked = true when fetchLogin.fulfilled', () => {
      const action = {
        type: fetchLogin.fulfilled.type,
        payload: mockAuthResponse
      };
      const state = userReducer(initialState, action);

      expect(state.isAuthChecked).toBe(true);
      expect(state.user).toEqual(mockUser);
      expect(state.error).toBeNull();
    });

    it('isAuthChecked = true when fetchLogin.rejected', () => {
      const action = {
        type: fetchLogin.rejected.type,
        payload: 'Error'
      };
      const state = userReducer(initialState, action);

      expect(state.isAuthChecked).toBe(true);
      expect(state.user).toBeNull();
      expect(state.error).toBe('Error');
    });
  });

  describe('fetchLogout: tests', () => {
    it('error = null when fetchLogout.pending', () => {
      const action = {
        type: fetchLogout.pending.type
      };
      const state = userReducer(initialState, action);

      expect(state.error).toBeNull();
    });

    it('isAuthChecked = true when fetchLogout.fulfilled', () => {
      const action = {
        type: fetchLogout.fulfilled.type
      };
      const state = userReducer(initialState, action);

      expect(state.user).toBeNull();
      expect(state.error).toBeNull();
      expect(state.isAuthChecked).toBe(true);
    });

    it('error when fetchLogout.rejected', () => {
      const action = {
        type: fetchLogout.rejected.type,
        payload: 'Error'
      };
      const state = userReducer(initialState, action);

      expect(state.error).toBe('Error');
      expect(state.isAuthChecked).toBe(true);
    });
  });

  describe('fetchUpdateUser: tests', () => {
    it('should clear existing error when fetchUpdateUser.pending', () => {
      const stateWithError = {
        ...initialState,
        error: 'Previous error',
        user: mockUser
      };

      const action = {
        type: fetchUpdateUser.pending.type
      };
      const state = userReducer(stateWithError, action);

      expect(state.error).toBeNull();
      expect(state.user).toEqual(stateWithError.user);
      expect(state.isAuthChecked).toBe(false);
    });

    it('should update user and set isAuthChecked when fetchUpdateUser.fulfilled', () => {
      const action = {
        type: fetchUpdateUser.fulfilled.type,
        payload: { success: true, user: mockUpdatedUser }
      };
      const state = userReducer(initialState, action);

      expect(state.user).toEqual(mockUpdatedUser);
      expect(state.error).toBeNull();
      expect(state.isAuthChecked).toBe(true);
    });

    it('error when fetchUpdateUser.rejected', () => {
      const stateWithUser = {
        ...initialState,
        user: mockUser
      };

      const action = {
        type: fetchUpdateUser.rejected.type,
        payload: 'Error'
      };
      const state = userReducer(stateWithUser, action);

      expect(state.error).toBe('Error');
      expect(state.isAuthChecked).toBe(true);
      expect(state.user).toEqual(mockUser);
    });
  });

  describe('fetchRegistrationUser: tests', () => {
    it('should clear existing error when fetchRegistrationUser.pending', () => {
      const stateWithError = {
        ...initialState,
        error: 'Previous error',
        user: mockUser,
        isAuthChecked: true
      };

      const action = {
        type: fetchRegistrationUser.pending.type
      };
      const state = userReducer(stateWithError, action);

      expect(state.error).toBeNull();
      expect(state.user).toEqual(stateWithError.user);
      expect(state.isAuthChecked).toBe(true);
    });

    it('should set user and isAuthChecked when fetchRegistrationUser.fulfilled', () => {
      const action = {
        type: fetchRegistrationUser.fulfilled.type,
        payload: mockAuthResponse
      };
      const state = userReducer(initialState, action);

      expect(state.isAuthChecked).toBe(true);
      expect(state.user).toEqual(mockUser);
      expect(state.error).toBeNull();
    });

    it('error when fetchRegistrationUser.rejected', () => {
      const stateWithUser = {
        ...initialState,
        user: mockUser,
        isAuthChecked: false
      };

      const action = {
        type: fetchRegistrationUser.rejected.type,
        payload: 'Error'
      };
      const state = userReducer(stateWithUser, action);

      expect(state.error).toBe('Error');
      expect(state.isAuthChecked).toBe(true);
      expect(state.user).toEqual(stateWithUser.user);
    });
  });

  describe('checkUserAuth: tests', () => {
    let localStorageMock: Record<string, string> = {};

    beforeEach(() => {
      localStorageMock = {
        refreshToken: 'test-refresh-token'
      };

      Object.defineProperty(global, 'localStorage', {
        value: {
          getItem: jest.fn((key: string) => localStorageMock[key] || null),
          removeItem: jest.fn((key: string) => {
            delete localStorageMock[key];
          }),
          setItem: jest.fn((key: string, value: string) => {
            localStorageMock[key] = value.toString();
          }),
          clear: jest.fn(() => {
            localStorageMock = {};
          })
        },
        writable: true
      });
    });

    it('error = null when checkUserAuth.pending', () => {
      const stateWithError = {
        ...initialState,
        error: 'Previous error',
        user: mockUser,
        isAuthChecked: false
      };

      const action = {
        type: checkUserAuth.pending.type
      };
      const state = userReducer(stateWithError, action);

      expect(state.error).toBeNull();
      expect(state.user).toEqual(stateWithError.user);
      expect(state.isAuthChecked).toBe(false);
    });

    it('should set user and isAuthChecked when checkUserAuth.fulfilled', () => {
      const action = {
        type: checkUserAuth.fulfilled.type,
        payload: mockUser
      };
      const state = userReducer(initialState, action);

      expect(state.isAuthChecked).toBe(true);
      expect(state.user).toEqual(mockUser);
      expect(state.error).toBeNull();
    });

    it('error when checkUserAuth.rejected ', () => {
      const stateWithUser = {
        ...initialState,
        user: mockUser,
        isAuthChecked: false
      };

      const action = {
        type: checkUserAuth.rejected.type,
        payload: 'Error'
      };
      const state = userReducer(stateWithUser, action);

      expect(state.isAuthChecked).toBe(true);
      expect(state.error).toBe('Error');
      expect(state.user).toBeNull();
    });
  });

  describe('reducerTests', () => {
    it('setUser', () => {
      const state = userReducer(initialState, setUser(mockUser));
      expect(state.user).toEqual(mockUser);
    });

    it('setAuthChecked set isAuthChecked', () => {
      const state = userReducer(initialState, setAuthChecked(true));
      expect(state.isAuthChecked).toEqual(true);
    });
  });
});
