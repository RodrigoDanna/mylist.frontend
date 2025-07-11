import React from 'react'
import './PlusButton.less'

const PlusButton: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  return (
    <div className="plus-button" onClick={onClick} title="Adicionar Tarefa">
      <div className="plus-icon" />
    </div>
  )
}

export default PlusButton
