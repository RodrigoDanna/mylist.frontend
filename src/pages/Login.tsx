import AuthForm from '../components/Auth/Auth'

export function Login() {
  return <AuthForm type="login" onSubmit={(data) => console.log(data)} />
}
