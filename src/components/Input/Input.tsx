import './Input.less'
import React, { useState } from 'react'
import { ReactComponent as EyeIcon } from '../../assets/eye.svg'
import { ReactComponent as EyeOffIcon } from '../../assets/eye-off.svg'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export function Input({ label, className = '', type, ...props }: InputProps) {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword && showPassword ? 'text' : type
  const inputClass = label ? `custom-input align-left ${className}`.trim() : `custom-input ${className}`.trim()

  return (
    <div className="custom-input-wrapper">
      {label && <label className="custom-input-label">{label}</label>}
      <input className={inputClass} type={inputType} {...props} />
      {isPassword && (
        <button
          type="button"
          className="toggle-password-visibility"
          onClick={() => setShowPassword((v) => !v)}
          tabIndex={-1}
        >
          {showPassword ? <EyeIcon className="eye-icon" /> : <EyeOffIcon className="eye-icon" />}
        </button>
      )}
    </div>
  )
}
