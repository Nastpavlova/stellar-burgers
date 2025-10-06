import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import {
  fetchLogin,
  selectorUserError,
  selectorUser
} from '../../services/slices/userSlice/userSlice';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(selectorUserError);
  const user = useSelector(selectorUser);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const dataLogin = {
      email,
      password
    };

    dispatch(fetchLogin(dataLogin));
  };

  useEffect(() => {
    if (user) {
      navigate(-1);
    }
  }, [user, navigate]);

  return (
    <LoginUI
      errorText={error || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
