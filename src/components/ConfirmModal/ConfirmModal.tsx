import React from 'react'
import './ConfirmModal.less'

interface ConfirmModalProps {
  open: boolean
  title?: string
  message: string
  onConfirm: () => void
  onCancel: () => void
  confirmText?: string
  cancelText?: string
  loading?: boolean
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  loading = false
}) => {
  if (!open) return null
  return (
    <div className="confirm-modal-backdrop">
      <div className="confirm-modal">
        {title && <div className="confirm-modal-title">{title}</div>}
        <div className="confirm-modal-message">{message}</div>
        <div className="confirm-modal-actions">
          <button className="modal-btn cancel" onClick={onCancel} disabled={loading}>
            {cancelText}
          </button>
          <button className="modal-btn confirm" onClick={onConfirm} disabled={loading}>
            {loading ? 'Excluindo...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
