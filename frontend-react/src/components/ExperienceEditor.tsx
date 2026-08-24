import { useContext, useState } from 'react';
import { ResumeContext } from '../contexts/ResumeContext';
import { PeriodPicker } from './PeriodPicker';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableExpItemProps {
    exp: any;
    idx: number;
    removeExp: (index: number) => void;
    handleChange: (index: number, field: string, value: string) => void;
}

const SortableExpItem = ({ exp, idx, removeExp, handleChange }: SortableExpItemProps) => {
    const itemId = exp.id || `exp-${idx}`;
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: itemId });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.6 : 1,
        position: 'relative' as const,
        zIndex: isDragging ? 99 : 1
    };

    return (
        <div ref={setNodeRef} style={style} className="item-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div
                    {...attributes}
                    {...listeners}
                    style={{
                        cursor: 'grab',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '3px 8px',
                        background: 'var(--azul-claro)',
                        border: '1px solid var(--azul-borda)',
                        borderRadius: '5px',
                        fontSize: '11px',
                        fontWeight: 600,
                        color: 'var(--azul)',
                        userSelect: 'none',
                        touchAction: 'none'
                    }}
                    title="Arraste para reordenar esta experiência"
                >
                    ⠿ Arrastar ordem
                </div>
                <button
                    className="remove-btn"
                    style={{ position: 'static' }}
                    onClick={() => removeExp(idx)}
                    title="Remover experiência"
                >
                    ✕
                </button>
            </div>

            <div className="field">
                <label>Cargo</label>
                <input
                    value={exp.cargo}
                    onChange={(e) => handleChange(idx, 'cargo', e.target.value)}
                    placeholder="Ex: Analista Financeiro"
                />
            </div>
            <div className="field">
                <label>Empresa</label>
                <input
                    value={exp.empresa}
                    onChange={(e) => handleChange(idx, 'empresa', e.target.value)}
                    placeholder="Ex: Nome da Empresa"
                />
            </div>
            <PeriodPicker
                label="Período de Atuação"
                value={exp.periodo}
                onChange={(val) => handleChange(idx, 'periodo', val)}
                presentOptionLabel="Emprego Atual / Presente"
            />
            <div className="field">
                <label>Atividades (uma por linha)</label>
                <textarea
                    rows={3}
                    value={exp.bullets}
                    onChange={(e) => handleChange(idx, 'bullets', e.target.value)}
                />
            </div>
        </div>
    );
};

export const ExperienceEditor = () => {
    const context = useContext(ResumeContext);
    if (!context) return null;
    const { data, updateData } = context;

    const [aberto, setAberto] = useState(true);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const addExp = () => {
        const newId = `exp_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
        updateData({
            experiencias: [...(data.experiencias || []), { id: newId, cargo: '', empresa: '', periodo: '', bullets: '' }]
        });
    };

    const removeExp = (index: number) => {
        const newExp = [...data.experiencias];
        newExp.splice(index, 1);
        updateData({ experiencias: newExp });
    };

    const handleChange = (index: number, field: string, value: string) => {
        const newExp = [...data.experiencias];
        newExp[index] = { ...newExp[index], [field]: value };
        updateData({ experiencias: newExp });
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const items = data.experiencias || [];
            const oldIndex = items.findIndex((item, idx) => (item.id || `exp-${idx}`) === active.id);
            const newIndex = items.findIndex((item, idx) => (item.id || `exp-${idx}`) === over.id);
            if (oldIndex !== -1 && newIndex !== -1) {
                const reordered = arrayMove(items, oldIndex, newIndex);
                updateData({ experiencias: reordered });
            }
        }
    };

    const experienciasList = (data.experiencias || []).map((exp, idx) => ({
        ...exp,
        id: exp.id || `exp-${idx}`
    }));

    return (
        <>
            <h3 className="section-tab" style={{ marginTop: '20px', cursor: 'pointer' }} onClick={() => setAberto(!aberto)}>
                Experiência Profissional
                <span style={{ marginLeft: 'auto', fontSize: 10, opacity: 0.5, transition: 'transform 0.2s', transform: aberto ? 'rotate(0deg)' : 'rotate(-90deg)', display: 'inline-block' }}>▼</span>
            </h3>
            <div
                className="section-body"
                style={{
                    overflow: 'hidden',
                    maxHeight: aberto ? '3000px' : '0px',
                    opacity: aberto ? 1 : 0,
                    transition: 'max-height 0.3s ease, opacity 0.2s ease',
                    padding: aberto ? undefined : '0 16px',
                }}
            >
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={experienciasList.map(exp => exp.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        {experienciasList.map((exp, idx) => (
                            <SortableExpItem
                                key={exp.id}
                                exp={exp}
                                idx={idx}
                                removeExp={removeExp}
                                handleChange={handleChange}
                            />
                        ))}
                    </SortableContext>
                </DndContext>
                <button className="add-btn" onClick={addExp}>+ Adicionar Experiência</button>
            </div>
        </>
    );
};
