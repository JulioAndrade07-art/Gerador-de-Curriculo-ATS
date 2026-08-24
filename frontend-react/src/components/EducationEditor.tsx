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

interface SortableEduItemProps {
    edu: any;
    idx: number;
    removeEdu: (index: number) => void;
    handleChange: (index: number, field: string, value: string) => void;
}

const SortableEduItem = ({ edu, idx, removeEdu, handleChange }: SortableEduItemProps) => {
    const itemId = edu.id || `edu-${idx}`;
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
                    title="Arraste para reordenar esta formação"
                >
                    ⠿ Arrastar ordem
                </div>
                <button
                    className="remove-btn"
                    style={{ position: 'static' }}
                    onClick={() => removeEdu(idx)}
                    title="Remover formação"
                >
                    ✕
                </button>
            </div>

            <div className="field">
                <label>Curso / Grau</label>
                <input
                    value={edu.curso}
                    onChange={(e) => handleChange(idx, 'curso', e.target.value)}
                    placeholder="Ex: Bacharelado em Administração"
                />
            </div>
            <div className="field">
                <label>Instituição</label>
                <input
                    value={edu.instituicao}
                    onChange={(e) => handleChange(idx, 'instituicao', e.target.value)}
                    placeholder="Ex: Universidade de São Paulo (USP)"
                />
            </div>
            <PeriodPicker
                label="Período do Curso"
                value={edu.periodo}
                onChange={(val) => handleChange(idx, 'periodo', val)}
                presentOptionLabel="Cursando Atualmente (Presente)"
            />
            <div className="field">
                <label>Status</label>
                <select value={edu.status} onChange={(e) => handleChange(idx, 'status', e.target.value)}>
                    <option value="Concluído">Concluído</option>
                    <option value="Em andamento">Em andamento</option>
                    <option value="Curso em pausa">Curso em pausa</option>
                    <option value="Trancado">Trancado</option>
                </select>
            </div>
        </div>
    );
};

export const EducationEditor = () => {
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

    const addEdu = () => {
        const newId = `edu_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
        updateData({
            formacoes: [...(data.formacoes || []), { id: newId, curso: '', instituicao: '', periodo: '', status: 'Em andamento' }]
        });
    };

    const removeEdu = (index: number) => {
        const newEdu = [...data.formacoes];
        newEdu.splice(index, 1);
        updateData({ formacoes: newEdu });
    };

    const handleChange = (index: number, field: string, value: string) => {
        const newEdu = [...data.formacoes];
        newEdu[index] = { ...newEdu[index], [field]: value };
        updateData({ formacoes: newEdu });
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const items = data.formacoes || [];
            const oldIndex = items.findIndex((item, idx) => (item.id || `edu-${idx}`) === active.id);
            const newIndex = items.findIndex((item, idx) => (item.id || `edu-${idx}`) === over.id);
            if (oldIndex !== -1 && newIndex !== -1) {
                const reordered = arrayMove(items, oldIndex, newIndex);
                updateData({ formacoes: reordered });
            }
        }
    };

    const formacoesList = (data.formacoes || []).map((edu, idx) => ({
        ...edu,
        id: edu.id || `edu-${idx}`
    }));

    return (
        <>
            <h3 className="section-tab" style={{ marginTop: '20px', cursor: 'pointer' }} onClick={() => setAberto(!aberto)}>
                Formação Acadêmica
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
                        items={formacoesList.map(edu => edu.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        {formacoesList.map((edu, idx) => (
                            <SortableEduItem
                                key={edu.id}
                                edu={edu}
                                idx={idx}
                                removeEdu={removeEdu}
                                handleChange={handleChange}
                            />
                        ))}
                    </SortableContext>
                </DndContext>
                <button className="add-btn" onClick={addEdu}>+ Adicionar Formação</button>
            </div>
        </>
    );
};
