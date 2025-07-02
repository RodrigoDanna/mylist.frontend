import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm/AuthForm';
import { isAuthenticated } from '../utils/auth';

export function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | undefined>(undefined);
  const [message, setMessage] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/list', { replace: true });
    }
  }, []);

  async function handleLogin(data: any) {
    setError(undefined)
    setMessage(undefined)

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorResponse = await response.json();
        setError(errorResponse.message || 'Usuário e/ou senha inválidos');
      } else {
        const token = await response.text();
        localStorage.setItem('token', token);
        setMessage('Login realizado com sucesso! Redirecionando...');
        navigate('/list');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Usuário ou Senha inválidos');
    }
  }

  return <AuthForm type="login" onSubmit={handleLogin} error={error} message={message} />;
}