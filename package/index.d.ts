export declare type Lens = Array<string | number | ((v: any) => boolean)>;
export declare function lens(...props: Lens): Lens;
export declare function lens(...lenses: Lens[]): Lens;
export declare function view<S, R = S>(lns: Lens): (state: S) => R;
export declare function set<S>(lns: Lens): <R>(val: R) => (state: S) => S;
export declare function over<S>(lns: Lens): <R>(fn: (s: R) => R) => (state: S) => S;
export declare function del<S>(lns: Lens): (state: S) => S;
