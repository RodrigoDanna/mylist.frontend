import AuthForm from '../components/AuthForm/AuthForm'

export function Register() {
  return <AuthForm type="register" onSubmit={(data) => console.log(data)} />
}
