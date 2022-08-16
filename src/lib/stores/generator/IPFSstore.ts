import { writable } from 'svelte/store';
import { persistentWritable } from '$lib/stores/ThemeStore';

export const userIPFSToken = writable('');
export const resultCID = persistentWritable('resultCID', '');
