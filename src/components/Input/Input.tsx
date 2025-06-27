import './Input.less'

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className="custom-input" {...props} />
}
