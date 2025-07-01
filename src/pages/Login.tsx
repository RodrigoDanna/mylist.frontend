import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm/AuthForm';
import { isAuthenticated } from '../utils/auth';

export function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/list', { replace: true });
    }
  }, []);

  return <AuthForm type="login" onSubmit={(data) => console.log(data)} />;
}