import { AnyFunction } from '@/types';

/**
 * Run the function use try/catch.
 *
 * Returns false if there was an error. Otherwise return true.
 *
 * Supports async and sync function.
 */
export function tryAndGetBoolean<
	RT extends ReturnType<F> extends Promise<any> ? Promise<boolean> : boolean,
	P extends Parameters<F>,
	F extends AnyFunction
>(func: F): (...args: P) => RT {
	return function (...args: P) {
		try {
			const result = func(...args);
			if (result instanceof Promise) return result.then(() => true).catch(() => false) as RT;
			return true as RT;
		} catch (error) { }
		return false as RT;
	}
}

/**
 * Run the function use try/catch.
 *
 * If an error occurs, returns undefined or the set value. Otherwise return the function result.
 *
 * Supports async and sync function.
 */
export function tryAndGetData<
	RT extends R extends Promise<any> ? Promise<Awaited<R> | T> : R | T,
	P extends Parameters<F>,
	R extends ReturnType<F>,
	F extends AnyFunction,
	T = undefined
>(func: F, onErrorValue?: T): (...args: P) => RT {
	return function (...args: P) {
		try {
			const result = func(...args);
			if (result instanceof Promise) return result.catch(() => onErrorValue);
			return result;
		} catch (error) { }
		return onErrorValue;
	}
}
