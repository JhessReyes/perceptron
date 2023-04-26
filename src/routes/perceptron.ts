export interface LogicFunType {
    x1: number,
    x2: number,
    out: number,
}

let fun = [
    { x1: 0, x2: 0, out: 0 },
    { x1: 0, x2: 1, out: 0 },
    { x1: 1, x2: 0, out: 0 },
    { x1: 1, x2: 1, out: 1 },
];

let w = [1.5, 0.5, 1.5]
function revaluateW(error: number, w: Array<number>, x: Array<number>) {
    let wOut: Array<number> = []
    for (let i = 0; i < w.length; i++) {
        wOut.push(w[i] + error * x[i])
    }
    return wOut;
}

function Neti(x1: number, x2: number, w: Array<number>) {

    return (x1 * w[1] + x2 * w[2] + w[0])

}

export { fun, revaluateW, Neti }