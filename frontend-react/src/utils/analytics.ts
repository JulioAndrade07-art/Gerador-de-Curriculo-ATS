/**
 * Privacy-friendly Analytics Helper
 * Coleta apenas eventos agregados de uso da interface (ex: exportação, uso do ATS),
 * sem armazenar cookies nem coletar nome, telefone, e-mail ou dados do currículo.
 */
export const trackEvent = (eventName: string, props?: Record<string, any>) => {
    try {
        console.log(`[Analytics Event]: ${eventName}`, props || '');

        if ((window as any).umami && typeof (window as any).umami.track === 'function') {
            (window as any).umami.track(eventName, props);
        }
        if ((window as any).plausible && typeof (window as any).plausible === 'function') {
            (window as any).plausible(eventName, { props });
        }
    } catch (e) {
        // Silencioso
    }
};
