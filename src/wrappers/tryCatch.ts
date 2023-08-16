import { AsyncFunc, Func } from '@/types';

/**
 * Run the function use try/catch.
 *
 * Returns false if there was an error. Otherwise return True.
 *
 * Supports async and sync function.
 */
export function tryAndGetBoolean<F extends AsyncFunc>(func: F): (...args: Parameters<F>) => Promise<boolean>;
export function tryAndGetBoolean<F extends Func>(func: F): (...args: Parameters<F>) => boolean;
export function tryAndGetBoolean<F extends AsyncFunc | Func>(func: F) {
	return function (...args: Parameters<F>) {
		try {
			const result = func(...args);
			if (result instanceof Promise) return result.then(() => true).catch(() => false);
			return true;
		} catch (error) { }
		return false;
	}
}

/**
 * Run the function use try/catch.
 *
 * If an error occurs, returns undefined or the set value. Otherwise return the function result.
 *
 * Supports async and sync function.
 */
export function tryAndGetData<F extends AsyncFunc, T = undefined>(func: F, onErrorValue?: T): (...args: Parameters<F>) => Promise<Awaited<ReturnType<F>> | T>;
export function tryAndGetData<F extends Func, T = undefined>(func: F, onErrorValue?: T): (...args: Parameters<F>) => ReturnType<F> | T;
export function tryAndGetData<F extends AsyncFunc | Func, T = undefined>(func: F, onErrorValue?: T) {
	return function (...args: Parameters<F>) {
		try {
			const result = func(...args);
			if (result instanceof Promise) return result.catch(() => onErrorValue);
			return result;
		} catch (error) { }
		return onErrorValue;
	}
}
