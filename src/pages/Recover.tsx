import AuthForm from '../components/AuthForm/AuthForm'

export function Recover() {
  ;<AuthForm type="recover" onSubmit={(data) => console.log(data)} />
}
