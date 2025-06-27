import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './AuthForm.less'
import { Input } from '../Input/Input'
import { Button } from '../Button/Button'
import { Logo } from '../Logo/Logo'

interface AuthFormProps {
  type: 'login' | 'register' | 'recover'
  onSubmit: (data: any) => void
}

export default function AuthForm({ type, onSubmit }: AuthFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const isRegister = type === 'register'
  const isRecover = type === 'recover'
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ email, password, confirmPassword })
  }

  const goTo = (path: string) => () => navigate(path)

  return (
    <div className="auth-container">
      <Logo />

      <form className="auth-form" key={type} onSubmit={handleSubmit}>
        {isRecover && (
          <div className="help-text">Informe seu e-mail que enviaremos uma nova senha!</div>
        )}
        <Input
          type="email"
          name="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete={!isRecover ? 'username' : undefined}
        />
        {!isRecover && (
          <Input
            type="password"
            name="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete={type === 'login' ? 'current-password' : 'new-password'}
          />
        )}
        {isRegister && (
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Repetir Senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
        )}
        <Button type="submit">
          {type === 'login' && 'Entrar'}
          {type === 'register' && 'Registrar'}
          {type === 'recover' && 'Enviar'}
        </Button>
      </form>

      {(isRegister || isRecover) && (
        <button className="back-button" onClick={goTo('/login')} type="button">
          ← Voltar para login
        </button>
      )}

      {type === 'login' && (
        <div className="links">
          <Link to="/recover">Esqueceu sua senha?</Link>
          <Link to="/register">Ainda não tem conta?</Link>
        </div>
      )}
    </div>
  )
}
