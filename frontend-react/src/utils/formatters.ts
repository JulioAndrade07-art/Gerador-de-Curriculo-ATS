/**
 * Formata um número de telefone no padrão brasileiro (DDD) 00000-0000 ou (DDD) 0000-0000.
 * Ignora caracteres não numéricos.
 */
export function formatPhone(val: string): string {
    const digits = val.replace(/\D/g, '').slice(0, 11);
    if (!digits) return '';

    if (digits.length <= 2) {
        return `(${digits}`;
    }
    if (digits.length <= 6) {
        return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    }
    if (digits.length <= 10) {
        return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    }
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export const MESES_OPCOES = [
    { value: '01', label: '01 - Jan' },
    { value: '02', label: '02 - Fev' },
    { value: '03', label: '03 - Mar' },
    { value: '04', label: '04 - Abr' },
    { value: '05', label: '05 - Mai' },
    { value: '06', label: '06 - Jun' },
    { value: '07', label: '07 - Jul' },
    { value: '08', label: '08 - Ago' },
    { value: '09', label: '09 - Set' },
    { value: '10', label: '10 - Out' },
    { value: '11', label: '11 - Nov' },
    { value: '12', label: '12 - Dez' },
];

export const MESES_NOMES: Record<string, string> = {
    '01': 'Jan', '02': 'Fev', '03': 'Mar', '04': 'Abr',
    '05': 'Mai', '06': 'Jun', '07': 'Jul', '08': 'Ago',
    '09': 'Set', '10': 'Out', '11': 'Nov', '12': 'Dez'
};

export function getYearsList(): string[] {
    const currentYear = new Date().getFullYear();
    const years: string[] = [];
    for (let y = currentYear + 2; y >= 1960; y--) {
        years.push(y.toString());
    }
    return years;
}
