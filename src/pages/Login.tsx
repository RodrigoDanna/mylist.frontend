import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthForm from '../components/AuthForm/AuthForm'
import { isAuthenticated } from '../utils/auth'

export function Login() {
  const navigate = useNavigate()
  const [error, setError] = useState<string | undefined>(undefined)
  const [message, setMessage] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/list', { replace: true })
    }
  }, [navigate])

  async function handleLogin(data: any) {
    setError(undefined)
    setMessage(undefined)

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (!response.ok) {
        const result = await response.json()
        setError(result.message)
      } else {
        const token = await response.text()
        localStorage.setItem('token', token)
        setMessage('Login realizado com sucesso! Redirecionando...')
        navigate('/list')
      }
    } catch (error) {
      console.error('Login failed:', error)
      setError('Ocorreu um erro ao realizar o login. Por favor, tente novamente mais tarde')
    }
  }

  return <AuthForm type="login" onSubmit={handleLogin} error={error} message={message} />
}
