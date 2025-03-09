import { writable } from 'svelte/store';

// Create a state rune for language with English as default
export const language = writable<'en' | 'id'>('en');