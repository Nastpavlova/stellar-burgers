import { ConstructorPage } from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { AppHeader } from '@components';
import { ProtectedRoute } from '../index';
import {
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '../../pages/index';
import { Routes, Route, Outlet } from 'react-router-dom';
import { useDispatch, useSelector, RootState } from '../../services/store';
import { useEffect } from 'react';
import { fetchIngredients } from '../../services/slices/ingredientSlice/ingredientSlice';

function MainPage() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <Outlet />
    </div>
  );
}

function App() {
  const dispatch = useDispatch();
  const ingredients = useSelector(
    (state: RootState) => state.ingredients.ingredients
  );
  const isLoading = useSelector(
    (state: RootState) => state.ingredients.isLoading
  );

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  useEffect(() => {}, [ingredients, isLoading]);

  return (
    <Routes>
      <Route element={<MainPage />}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Route>
    </Routes>
  );
}

export default App;

// {state?.background && (
//   <Routes>
//     <Route
//       path='/profile/orders/:number'
//       element={
//         <Modal title={''} onClose={handleModalClose}>
//           <OrderInfo />
//         </Modal>
//       }
//     />
//   </Routes>

// Также нужно добавить модалки с дополнительной информацией:
// по роуту /feed/:number расположите компонент Modal с компонентом OrderInfo;
// по роуту /ingredients/:id расположите компонент Modal с компонентом IngredientDetails;
// по защищённому роуту /profile/orders/:number расположите компонент Modal с компонентом OrderInfo .
// Теперь на главном экране появились компоненты, но пока без данных:
