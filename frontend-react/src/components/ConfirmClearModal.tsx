interface ConfirmClearModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export const ConfirmClearModal = ({ isOpen, onClose, onConfirm }: ConfirmClearModalProps) => {
    if (!isOpen) return null;

    return (
        <div className={`modal-overlay ${isOpen ? 'show' : ''}`} onClick={onClose}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '400px' }}>
                <button className="modal-close" onClick={onClose}>✕</button>

                <div className="modal-header" style={{ marginBottom: '12px' }}>
                    <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: '#fee2e2',
                        color: '#dc2626',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        flexShrink: 0
                    }}>
                        🗑
                    </div>
                    <div>
                        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#111827' }}>
                            Limpar todo o formulário?
                        </h3>
                        <span style={{ fontSize: '11.5px', color: '#6b7280' }}>
                            Esta ação é irreversível
                        </span>
                    </div>
                </div>

                <p className="modal-text" style={{ fontSize: '13px', color: '#4b5563', lineHeight: '1.5', marginBottom: '20px' }}>
                    Tem certeza que deseja limpar todas as informações do formulário? Todos os dados digitados e salvos serão apagados permanentemente.
                </p>

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                    <button
                        onClick={onClose}
                        style={{
                            padding: '8px 14px',
                            borderRadius: '7px',
                            border: '1px solid #d1d5db',
                            background: '#ffffff',
                            color: '#374151',
                            fontSize: '12.5px',
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '7px',
                            border: 'none',
                            background: '#dc2626',
                            color: '#ffffff',
                            fontSize: '12.5px',
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}
                    >
                        Sim, limpar tudo
                    </button>
                </div>
            </div>
        </div>
    );
};
