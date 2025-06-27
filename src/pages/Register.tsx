import AuthForm from '../components/AuthForm/AuthForm'

export function Register() {
  ;<AuthForm type="register" onSubmit={(data) => console.log(data)} />
}
