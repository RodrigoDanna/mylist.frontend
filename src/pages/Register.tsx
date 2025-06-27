import AuthForm from '../components/Auth/Auth'

export function Register() {
  ;<AuthForm type="register" onSubmit={(data) => console.log(data)} />
}
