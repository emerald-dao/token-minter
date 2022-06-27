import { writable } from 'svelte/store';
import { browser } from '$app/env';

export const step = writable(Number(browser && localStorage.getItem('step')) || 0);

step.subscribe((val) => {
  if (browser) return (localStorage.step = val);
});

export const onNext = () => {
  step.update((current) => Number(current) + 1);
};
export const onBack = () => {
  step.update((current) => Number(current) - 1);
};
