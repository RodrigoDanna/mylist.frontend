import AuthForm from '../components/AuthForm/AuthForm'

export function Recover() {
  return <AuthForm type="recover" onSubmit={(data) => console.log(data)} />
}
