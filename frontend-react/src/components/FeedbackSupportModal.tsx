import React, { useState } from 'react';

interface FeedbackSupportModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSupport: () => void;
}

export const FeedbackSupportModal: React.FC<FeedbackSupportModalProps> = ({
    isOpen,
    onClose,
    onSupport
}) => {
    const [dontAskAgain, setDontAskAgain] = useState(false);

    if (!isOpen) return null;

    const handleClose = () => {
        if (dontAskAgain) {
            localStorage.setItem('hide_support_prompt', 'true');
        }
        onClose();
    };

    const handleSupportClick = () => {
        if (dontAskAgain) {
            localStorage.setItem('hide_support_prompt', 'true');
        }
        onClose();
        onSupport();
    };

    return (
        <div
            className={`modal-overlay ${isOpen ? 'show' : ''}`}
            onClick={handleClose}
            style={{
                transition: "opacity 250ms ease",
                opacity: isOpen ? 1 : 0,
                pointerEvents: isOpen ? 'all' : 'none',
                zIndex: 100000
            }}
        >
            <div
                className="modal-box"
                onClick={e => e.stopPropagation()}
                style={{
                    background: '#ffffff',
                    borderRadius: '12px',
                    padding: '22px 24px',
                    width: '90%',
                    maxWidth: '400px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.18)',
                    border: '1px solid var(--borda)',
                    position: 'relative',
                    transition: "transform 300ms ease, opacity 300ms ease",
                    transform: isOpen ? "translateY(0) scale(1)" : "translateY(20px) scale(0.96)",
                    opacity: isOpen ? 1 : 0
                }}
            >
                <button
                    className="modal-close"
                    onClick={handleClose}
                    style={{
                        position: 'absolute',
                        top: '14px',
                        right: '14px',
                        background: 'none',
                        border: 'none',
                        fontSize: '18px',
                        color: 'var(--muted)',
                        cursor: 'pointer',
                        lineHeight: 1
                    }}
                    title="Fechar"
                >
                    ✕
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <div style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '8px',
                        background: 'var(--azul-claro)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px',
                        color: 'var(--azul)',
                        flexShrink: 0
                    }}>
                        📄
                    </div>
                    <div>
                        <h3 style={{ margin: 0, fontSize: '15.5px', fontWeight: 700, color: 'var(--azul)' }}>
                            Gostou do gerador?
                        </h3>
                        <span style={{ fontSize: '11.5px', color: 'var(--muted)' }}>
                            O download do seu currículo começará a seguir
                        </span>
                    </div>
                </div>

                <p style={{ fontSize: '12.5px', color: 'var(--texto)', lineHeight: '1.5', marginBottom: '16px' }}>
                    Este projeto é 100% gratuito. Se a ferramenta te ajudou a economizar tempo, considere apoiar o projeto com qualquer valor!
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
                    <button
                        onClick={handleSupportClick}
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '7px',
                            border: 'none',
                            background: '#0d9488',
                            color: 'white',
                            fontWeight: 600,
                            fontSize: '12.5px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            transition: 'background 0.2s'
                        }}
                    >
                        💚 Sim, quero apoiar o projeto
                    </button>
                    <button
                        onClick={handleClose}
                        style={{
                            width: '100%',
                            padding: '8px',
                            borderRadius: '7px',
                            border: '1.5px solid var(--borda)',
                            background: 'white',
                            color: 'var(--muted)',
                            fontWeight: 500,
                            fontSize: '12px',
                            cursor: 'pointer'
                        }}
                    >
                        Não, obrigado
                    </button>
                </div>

                <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '11px',
                    color: 'var(--muted)',
                    cursor: 'pointer',
                    userSelect: 'none'
                }}>
                    <input
                        type="checkbox"
                        checked={dontAskAgain}
                        onChange={e => setDontAskAgain(e.target.checked)}
                        style={{ cursor: 'pointer', width: 'auto' }}
                    />
                    Não perguntar novamente nesta máquina
                </label>
            </div>
        </div>
    );
};
