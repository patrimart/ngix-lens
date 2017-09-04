export function lens(...args) {
    return args.reduce((p, c) => p.concat(c), []);
}
export function view(lns) {
    return function (state) {
        let accState = state;
        for (let i = 0, len = lns.length; i < len; i++) {
            const prop = ((j) => typeof j === "function" ? Array.isArray(accState) ? accState.findIndex(j) : -1 : j)(lns[i]);
            if (prop in accState === false) {
                return undefined;
            }
            accState = accState[prop];
        }
        return accState;
    };
}
export function set(lns) {
    return (val) => over(lns)(_ => val);
}
export function over(lns) {
    return (fn) => (state) => {
        const origState = Array.isArray(state) ? state.slice(0) : Object.assign({}, state);
        let ms = origState;
        for (let i = 0, len = lns.length; i < len; i++) {
            let k = ((j) => typeof j === "function" ? Array.isArray(ms) ? ms.findIndex(j) : -1 : j)(lns[i]);
            if (k in ms === false) {
                ms[k] = typeof lns[i + 1] === "number" || typeof lns[i + 1] === "function" ? [] : {};
                if (k === -1) {
                    k = 0;
                }
            }
            ms = ms[k] = len - i - 1 ? Array.isArray(ms[k]) ? ms[k].slice(0) : Object.assign({}, ms[k]) : Object.freeze(fn(ms[k]));
        }
        return Object.freeze(origState);
    };
}
export function del(lns) {
    return (state) => {
        const origState = Array.isArray(state) ? state.slice(0) : Object.assign({}, state);
        let ms = origState;
        for (let i = 0, len = lns.length; i < len; i++) {
            const k = ((j) => typeof j === "function" ? Array.isArray(ms) ? ms.findIndex(j) : -1 : j)(lns[i]);
            if (k in ms === false) {
                return state;
            }
            if (len - i - 1) {
                ms = ms[k] = Array.isArray(ms[k]) ? ms[k].slice(0) : Object.assign({}, ms[k]);
            }
            else {
                delete ms[k];
                Object.freeze(ms);
            }
        }
        return Object.freeze(origState);
    };
}
//# sourceMappingURL=index.js.map