import { AnyFunction, OverloadFunction } from '../types';

// prettier-ignore
/**
 * Run the function use try/catch.
 *
 * Returns false if there was an error. Otherwise return true.
 *
 * Supports async and sync function.
 */
export const tryAndGetBoolean = <
	RT extends ReturnType<F> extends Promise<any> ? Promise<boolean> : boolean,
	P extends OverloadFunction<F>[0],
	F extends AnyFunction
>(func: F): (...args: P) => RT => (...args: P) => {
	try {
		const result = func(...args);
		if (result instanceof Promise) return result.then(() => true).catch(() => false) as RT;
		return true as RT;
	} catch (error) { }
	return false as RT;
}

// prettier-ignore
/**
 * Run the function use try/catch.
 *
 * If an error occurs, returns undefined or the set value. Otherwise return the function result.
 *
 * Supports async and sync function.
 */
export const tryAndGetData = <
	RT extends R extends Promise<any> ? Promise<Awaited<R> | T> : R | T,
	R extends OF[1],
	P extends OF[0],
	OF extends OverloadFunction<F>,
	F extends AnyFunction,
	T = undefined
>(func: F, onErrorValue?: T): (...args: P) => RT => (...args: P) => {
	try {
		const result = func(...args);
		if (result instanceof Promise) return result.catch(() => onErrorValue);
		return result;
	} catch (error) { }
	return onErrorValue;
}
