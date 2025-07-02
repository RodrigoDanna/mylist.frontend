import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import { Input } from '../../components/Input/Input'
import { Button } from '../../components/Button/Button'
import './ChangePassword.less'
import { useNavigate } from 'react-router-dom'

const ChangePasswordPage: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [error, setError] = useState<string | undefined>(undefined)
  const [message, setMessage] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(undefined)
    setMessage(undefined)

    setLoading(true)
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/user/change-password`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            currentPassword,
            password, // use 'password' not 'newPassword'
            repeatPassword,
          }),
        }
      )
      if (!response.ok) {
        const result = await response.json()
        setError(result.message || 'Erro ao alterar senha.')
      } else {
        setMessage('Senha alterada com sucesso!')
      }
    } catch (err) {
      setError('Erro de conexão.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header type="return" />

      <form className="change-password-form" onSubmit={handleSubmit}>
        <div className="form-inputs">
          <Input
            type="password"
            label="Senha Atual"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            autoComplete="current-password"
          />
          <Input
            type="password"
            label="Nova Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
          <Input
            type="password"
            label="Repetir Nova Senha"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            autoComplete="new-password"
          />
        </div>
        {error && <div className="form-error">{error}</div>}
        {message && <div className="form-message">{message}</div>}
        <div className="form-buttons">
          <Button className="cancel" type="button" onClick={() => navigate('/list')}>
            Cancelar
          </Button>
          <Button className="apply" type="submit" disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar'}
          </Button>
        </div>
      </form>
    </>
  )
}

export default ChangePasswordPage
