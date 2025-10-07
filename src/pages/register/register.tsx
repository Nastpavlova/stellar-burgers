import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import {
  fetchRegistrationhUser,
  selectorUserError
} from '../../services/slices/userSlice';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(selectorUserError);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const dataRegistration = {
      email: email,
      name: userName,
      password: password
    };

    dispatch(fetchRegistrationhUser(dataRegistration));
    navigate('/profile');
  };

  return (
    <RegisterUI
      errorText={error || ''}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
