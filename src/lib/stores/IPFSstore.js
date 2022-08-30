import persistentWritable from '$lib/utilities/persistentWritable';
import { writable } from 'svelte/store';

export const userIPFSToken = writable('');
export const resultCID = persistentWritable('resultCID', '');
