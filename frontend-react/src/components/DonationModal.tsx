import { useState } from 'react';

export const DonationModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const pixChave = "fb4818bf-aaec-43b9-9fcc-e58515009426";
    const [copied, setCopied] = useState(false);
    const [isCloseHovered, setIsCloseHovered] = useState(false);

    const copiarChave = () => {
        navigator.clipboard.writeText(pixChave).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }).catch(() => {
            alert("❌ Erro ao copiar chave.");
        });
    };

    return (
        <div
            className={`modal-overlay ${isOpen ? 'show' : ''}`}
            onClick={onClose}
            style={{
                transition: "opacity 250ms ease",
                opacity: isOpen ? 1 : 0,
                pointerEvents: isOpen ? 'all' : 'none'
            }}
        >
            <div
                className="modal-box"
                onClick={e => e.stopPropagation()}
                style={{
                    transition: "transform 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 300ms ease",
                    transform: isOpen ? "translateY(0) scale(1)" : "translateY(24px) scale(0.97)",
                    opacity: isOpen ? 1 : 0
                }}
            >
                <button
                    className="modal-close"
                    onClick={onClose}
                    onMouseEnter={() => setIsCloseHovered(true)}
                    onMouseLeave={() => setIsCloseHovered(false)}
                    style={{
                        transition: "transform 200ms ease",
                        transform: isCloseHovered ? "rotate(90deg)" : "none"
                    }}
                >
                    ✕
                </button>
                <div className="modal-header" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg viewBox="0 0 24 24" width="26" height="26" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#0d9488' }}>
                        <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                        <line x1="6" y1="1" x2="6" y2="4"></line>
                        <line x1="10" y1="1" x2="10" y2="4"></line>
                        <line x1="14" y1="1" x2="14" y2="4"></line>
                    </svg>
                    <h3 style={{ margin: 0 }}>Pagar um Café</h3>
                </div>
                <p className="modal-text">
                    Este gerador open-source com IA te ajudou a conseguir aquela entrevista? Considere apoiar o desenvolvimento com qualquer valor!
                </p>

                <div className="pix-qrcode-container">
                    <img src="/qrcodePIX.jpeg" alt="QR Code PIX" className="pix-img" />
                </div>

                <div className="pix-copiacola">
                    <label>Chave PIX (Aleatória):</label>
                    <div className="pix-input-group">
                        <input type="text" readOnly value={pixChave} />
                        <button className="btn-copiar-pix" onClick={copiarChave} title="Copiar Chave">
                            {copied ? (
                                <span style={{ color: '#22c55e', fontWeight: 'bold' }}>✓</span>
                            ) : (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                <p style={{ fontSize: '11px', color: '#999', marginTop: '15px', textAlign: 'center' }}>
                    Desenvolvido com ❤️ por Julio Andrade
                </p>
            </div>
        </div>
    );
};
