import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm/AuthForm';

export function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | undefined>(undefined);
  const [message, setMessage] = useState<string | undefined>(undefined);

  async function handleRegister(data: any) {
    setError(undefined);
    setMessage(undefined);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorMsg = await response.text();
        setError(errorMsg || 'Erro ao registrar usuário');
      } else {
        setMessage('Usuário registrado com sucesso! Faça login para continuar.');
      }
    } catch (error) {
      console.error('Register failed:', error);
      setError('Erro ao registrar usuário');
    }
  }

  return <AuthForm type="register" onSubmit={handleRegister} error={error} message={message} />;
}
