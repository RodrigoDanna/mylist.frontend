import './Button.less';

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className="custom-button" {...props} />;
}
