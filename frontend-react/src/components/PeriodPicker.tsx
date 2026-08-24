import React, { useState, useEffect } from 'react';
import { MESES_OPCOES, getYearsList } from '../utils/formatters';

interface PeriodPickerProps {
    value: string;
    onChange: (newValue: string) => void;
    label?: string;
    presentOptionLabel?: string;
}

export const PeriodPicker: React.FC<PeriodPickerProps> = ({
    value,
    onChange,
    label = 'Período',
    presentOptionLabel = 'Atual / Em andamento'
}) => {
    const years = getYearsList();

    const [mesInicio, setMesInicio] = useState('');
    const [anoInicio, setAnoInicio] = useState('');
    const [mesFim, setMesFim] = useState('');
    const [anoFim, setAnoFim] = useState('');
    const [isAtual, setIsAtual] = useState(false);

    useEffect(() => {
        if (!value) return;

        const isPresent = /atual|presente|momento|cursando/i.test(value);
        setIsAtual(isPresent);

        const parts = value.split(/\s*[-–—aA]\s*/);
        const startPart = parts[0] || '';
        const endPart = parts[1] || '';

        const startYearMatch = startPart.match(/\b(19\d\d|20\d\d)\b/);
        if (startYearMatch) setAnoInicio(startYearMatch[1]);

        const startMonthMatch = startPart.match(/\b(0[1-9]|1[0-2])\b/);
        if (startMonthMatch) {
            setMesInicio(startMonthMatch[1]);
        } else {
            const monthObj = MESES_OPCOES.find(m => new RegExp(m.label.slice(0, 3), 'i').test(startPart));
            if (monthObj) setMesInicio(monthObj.value);
        }

        if (!isPresent && endPart) {
            const endYearMatch = endPart.match(/\b(19\d\d|20\d\d)\b/);
            if (endYearMatch) setAnoFim(endYearMatch[1]);

            const endMonthMatch = endPart.match(/\b(0[1-9]|1[0-2])\b/);
            if (endMonthMatch) {
                setMesFim(endMonthMatch[1]);
            } else {
                const monthObj = MESES_OPCOES.find(m => new RegExp(m.label.slice(0, 3), 'i').test(endPart));
                if (monthObj) setMesFim(monthObj.value);
            }
        }
    }, []);

    const updatePeriodString = (
        mInicio: string,
        aInicio: string,
        mFim: string,
        aFim: string,
        atual: boolean
    ) => {
        let strStart = '';
        if (mInicio && aInicio) strStart = `${mInicio}/${aInicio}`;
        else if (aInicio) strStart = aInicio;
        else if (mInicio) strStart = mInicio;

        let strEnd = '';
        if (atual) {
            strEnd = 'Presente';
        } else {
            if (mFim && aFim) strEnd = `${mFim}/${aFim}`;
            else if (aFim) strEnd = aFim;
            else if (mFim) strEnd = mFim;
        }

        if (strStart && strEnd) {
            onChange(`${strStart} - ${strEnd}`);
        } else if (strStart) {
            onChange(strStart);
        } else if (strEnd) {
            onChange(strEnd);
        } else {
            onChange('');
        }
    };

    const handleMesInicioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        setMesInicio(val);
        updatePeriodString(val, anoInicio, mesFim, anoFim, isAtual);
    };

    const handleAnoInicioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        setAnoInicio(val);
        updatePeriodString(mesInicio, val, mesFim, anoFim, isAtual);
    };

    const handleMesFimChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        setMesFim(val);
        updatePeriodString(mesInicio, anoInicio, val, anoFim, isAtual);
    };

    const handleAnoFimChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        setAnoFim(val);
        updatePeriodString(mesInicio, anoInicio, mesFim, val, isAtual);
    };

    const handleAtualToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setIsAtual(checked);
        updatePeriodString(mesInicio, anoInicio, mesFim, anoFim, checked);
    };

    const selectStyle: React.CSSProperties = {
        width: '100%',
        padding: '7px 9px',
        fontSize: '12px',
        borderRadius: '6px',
        border: '1.5px solid var(--borda)',
        background: 'var(--cinza)',
        color: 'var(--texto)',
        outline: 'none',
        fontFamily: 'inherit'
    };

    return (
        <div style={{
            background: '#ffffff',
            border: '1.5px solid var(--borda)',
            borderRadius: '8px',
            padding: '10px 12px',
            marginBottom: '12px'
        }}>
            <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, color: 'var(--azul)', marginBottom: '8px' }}>
                {label}
            </label>

            {/* INÍCIO */}
            <div style={{ marginBottom: '10px' }}>
                <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--muted)', marginBottom: '4px' }}>
                    📅 Data de Início
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                    <select value={mesInicio} onChange={handleMesInicioChange} style={selectStyle}>
                        <option value="">Mês...</option>
                        {MESES_OPCOES.map(m => (
                            <option key={m.value} value={m.value}>{m.label}</option>
                        ))}
                    </select>
                    <select value={anoInicio} onChange={handleAnoInicioChange} style={selectStyle}>
                        <option value="">Ano...</option>
                        {years.map(y => (
                            <option key={y} value={y}>{y}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* TÉRMINO */}
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px', flexWrap: 'wrap', gap: '4px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--muted)' }}>
                        🏁 Data de Término
                    </span>
                    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: 'var(--azul)', fontWeight: 600, cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            checked={isAtual}
                            onChange={handleAtualToggle}
                            style={{ cursor: 'pointer', width: 'auto' }}
                        />
                        {presentOptionLabel}
                    </label>
                </div>

                {!isAtual ? (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                        <select value={mesFim} onChange={handleMesFimChange} style={selectStyle}>
                            <option value="">Mês...</option>
                            {MESES_OPCOES.map(m => (
                                <option key={m.value} value={m.value}>{m.label}</option>
                            ))}
                        </select>
                        <select value={anoFim} onChange={handleAnoFimChange} style={selectStyle}>
                            <option value="">Ano...</option>
                            {years.map(y => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>
                    </div>
                ) : (
                    <div style={{ padding: '6px 10px', background: '#dcfce7', color: '#166534', borderRadius: '6px', fontSize: '11.5px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                        ✓ {presentOptionLabel}
                    </div>
                )}
            </div>

            {value && (
                <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '8px', paddingTop: '6px', borderTop: '1px dashed var(--borda)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Período gerado:</span>
                    <strong style={{ color: 'var(--azul)' }}>{value}</strong>
                </div>
            )}
        </div>
    );
};
