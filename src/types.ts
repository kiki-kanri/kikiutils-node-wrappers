export type AnyFunction = (...args: any[]) => any;
type FilterUnknowns<T> = T extends [infer A, ...infer Rest] ? (any[] extends A ? FilterUnknowns<Rest> : [A, ...FilterUnknowns<Rest>]) : T;
export type OverloadFunction<T extends AnyFunction> = TupleArrayUnion<FilterUnknowns<ParamsAndReturnType<T>>>;
type ParamsAndReturnType<T> = T extends {
	(...args: infer A1): infer R1;
	(...args: infer A2): infer R2;
	(...args: infer A3): infer R3;
	(...args: infer A4): infer R4;
	(...args: infer A5): infer R5;
	(...args: infer A6): infer R6;
	(...args: infer A7): infer R7;
	(...args: infer A8): infer R8;
	(...args: infer A9): infer R9;
	(...args: infer A10): infer R10;
}
	? [[A1, R1], [A2, R2], [A3, R3], [A4, R4], [A5, R5], [A6, R6], [A7, R7], [A8, R8], [A9, R9], [A10, R10]]
	: never;

type TupleArrayUnion<A extends readonly any[][]> = A extends (infer T)[] ? (T extends any[] ? T : []) : [];
