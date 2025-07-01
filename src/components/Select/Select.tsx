import React from 'react'
import './Select.less'

export interface SelectOption {
  value: string | number
  label: string
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[]
  value: string | number
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  className?: string
}

const Select: React.FC<SelectProps> = ({ options, value, onChange, className = '', ...props }) => (
  <select
    className={`custom-select${className ? ` ${className}` : ''}`}
    value={value}
    onChange={onChange}
    {...props}
  >
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
)

export default Select
