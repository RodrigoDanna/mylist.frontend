import './Button.less'

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className = '', ...rest } = props
  return <button className={`custom-button${className ? ' ' + className : ''}`} {...rest} />
}
