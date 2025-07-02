import './Input.less'
import React, { useState, useRef, useEffect } from 'react'
import { ReactComponent as EyeIcon } from '../../assets/eye.svg'
import { ReactComponent as EyeOffIcon } from '../../assets/eye-off.svg'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

function formatDate(value: string) {
  if (!value) return 'dd/mm/aaaa'
  const [year, month, day] = value.split('-')
  if (!year || !month || !day) return 'dd/mm/aaaa'
  return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`
}

export function Input({ label, className = '', type, ...props }: InputProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [dateValue, setDateValue] = useState(props.value?.toString() || '')
  const inputRef = useRef<HTMLInputElement>(null)
  const isPassword = type === 'password'
  const isDate = type === 'date'
  const inputType = isPassword && showPassword ? 'text' : type
  const inputClass = label
    ? `custom-input align-left ${className}`.trim()
    : `custom-input ${className}`.trim()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isDate) {
      setDateValue(e.target.value)
    }
    props.onChange?.(e)
  }

  useEffect(() => {
    if (isDate) {
      setDateValue(props.value?.toString() || '')
    }
  }, [props.value, isDate])

  return (
    <div className="custom-input-wrapper" style={isDate ? { cursor: 'pointer' } : undefined}>
      {label && <label className="custom-input-label">{label}</label>}
      <input
        ref={inputRef}
        className={inputClass}
        type={inputType}
        {...props}
        value={isDate ? dateValue : props.value}
        onChange={handleChange}
        readOnly={isDate && !!props.readOnly}
        onClick={(e) => {
          e.stopPropagation()
          if (isDate && inputRef.current) {
            inputRef.current.focus()
            inputRef.current.showPicker?.()
          }
        }}
      />
      {isDate && <span className="date-overlay">{formatDate(dateValue)}</span>}
      {isPassword && (
        <button
          type="button"
          className="toggle-password-visibility"
          onClick={(e) => {
            e.stopPropagation()
            setShowPassword((v) => !v)
          }}
          tabIndex={-1}
        >
          {showPassword ? <EyeIcon className="eye-icon" /> : <EyeOffIcon className="eye-icon" />}
        </button>
      )}
    </div>
  )
}
