import AuthForm from '../components/AuthForm/AuthForm'

export function Login() {
  return <AuthForm type="login" onSubmit={(data) => console.log(data)} />
}
