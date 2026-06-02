// Centralized language state using Svelte 5 runes
export const languageStore = $state({
    current: 'id' as 'en' | 'id',
    set(val: 'en' | 'id') {
        this.current = val;
        if (typeof window !== 'undefined') {
            localStorage.setItem('language', val);
        }
    },
    init() {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('language');
            if (stored === 'en' || stored === 'id') {
                this.current = stored;
            }
        }
    }
});
