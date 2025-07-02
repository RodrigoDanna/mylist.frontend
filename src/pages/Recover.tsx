import { useState } from 'react'
import AuthForm from '../components/AuthForm/AuthForm'

export function Recover() {
  const [error, setError] = useState<string | undefined>(undefined)
  const [message, setMessage] = useState<string | undefined>(undefined)

  async function handleRecover(data: any) {
    setError(undefined)
    setMessage(undefined)

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/user/recover/${data.email}`, {
        method: 'POST'
      })

      const result = await response.json()

      if (!response.ok) {
        setError(result.message)
        return
      }

      setMessage(result.message)
    } catch (error) {
      console.error('Recover password failed:', error)
      setError('Erro ao recuperar senha')
    }
  }

  return <AuthForm type="recover" onSubmit={handleRecover} error={error} message={message} />
}
