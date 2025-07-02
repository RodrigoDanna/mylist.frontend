import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './AuthForm.less'
import { Input } from '../Input/Input'
import { Button } from '../Button/Button'
import Logo from '../../assets/logo.png'

interface AuthFormProps {
  type: 'login' | 'register' | 'recover'
  onSubmit: (data: any) => Promise<void> | void // <-- Make onSubmit async-compatible
  error?: string
  message?: string
}

export default function AuthForm({ type, onSubmit, error, message }: AuthFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setrepeatPassword] = useState('')
  const [loading, setLoading] = useState(false) // <-- Loader state

  const isRegister = type === 'register'
  const isRecover = type === 'recover'
  const isLogin = type === 'login'
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const data: any = { email }
    if (!isRecover) data.password = password
    if (isRegister) data.repeatPassword = repeatPassword
    try {
      await onSubmit(data)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <img src={Logo} alt="MyList" className="logo" />

      <div className="form-wrapper">
        
        <form className="auth-form" key={type} onSubmit={handleSubmit}>
          {isLogin && <div className="help-text">Para entrar, informe seu e-mail e senha!</div>}
          {isRecover && (
            <div className="help-text">Informe seu e-mail e enviaremos uma nova senha!</div>
          )}
          {isRegister && (
            <div className="help-text">Registre-se abaixo para começar a usar o MyList!</div>
          )}
          <Input
            type="email"
            name="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete={!isRecover ? 'username' : undefined}
            disabled={loading}
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
              disabled={loading}
            />
          )}
          {isRegister && (
            <Input
              type="password"
              name="repeatPassword"
              placeholder="Confirmar Senha"
              value={repeatPassword}
              onChange={(e) => setrepeatPassword(e.target.value)}
              required
              autoComplete="new-password"
              disabled={loading}
            />
          )}
          <Button type="submit" disabled={loading}>
            {loading ? 'Aguarde...' : (
              <>
                {type === 'login' && 'Entrar'}
                {type === 'register' && 'Registrar'}
                {type === 'recover' && 'Enviar'}
              </>
            )}
          </Button>
          {error && <div className="auth-error">{error}</div>}
          {message && <div className="auth-message">{message}</div>}
        </form>

        {(isRegister || isRecover) && (
          <button className="back-button" onClick={() => navigate('/login')} type="button" disabled={loading}>
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
    </div>
  )
}
