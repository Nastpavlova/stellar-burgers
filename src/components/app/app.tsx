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

function MainPage() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <Outlet />
    </div>
  );
}

function App() {
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

// по роуту / расположите компонент ConstructorPage;
// по роуту /feed расположите компонент Feed;
// по защищённому роуту /login расположите компонент Login;
// по защищённому роуту /register расположите компонент Register;
// по защищённому роуту /forgot-password расположите компонент ForgotPassword;
// по защищённому роуту /reset-password расположите компонент ResetPassword;
// по защищённому роуту /profile расположите компонент Profile;
// по защищённому роуту /profile/orders расположите компонент ProfileOrders;
// по роуту * расположите компонент NotFound404 .

// Также нужно добавить модалки с дополнительной информацией:
// по роуту /feed/:number расположите компонент Modal с компонентом OrderInfo;
// по роуту /ingredients/:id расположите компонент Modal с компонентом IngredientDetails;
// по защищённому роуту /profile/orders/:number расположите компонент Modal с компонентом OrderInfo .
// Теперь на главном экране появились компоненты, но пока без данных:
