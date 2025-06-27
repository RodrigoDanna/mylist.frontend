import { useState } from 'react'
import './Auth.less'
import { Input } from '../Input/Input'
import { Button } from '../Button/Button'

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ email, password, confirmPassword })
  }

  return (
    <div className="auth-container">
      <div className="logo">MyList</div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="username"
        />
        {!isRecover && (
          <Input
            type="password"
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
      {type === 'login' && (
        <div className="links">
          <a href="#">
            Esqueceu sua senha? <span>Clique aqui</span>
          </a>
          <a href="#">
            Ainda não tem conta? <span>Clique aqui</span>
          </a>
        </div>
      )}
    </div>
  )
}
