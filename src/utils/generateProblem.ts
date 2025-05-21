// utils/generateProblem.ts
export type Problem = { a: number, b: number };

export function generateProblem(): Problem {
    const a = Math.floor(Math.random() * 20) + 1;
    const b = Math.floor(Math.random() * 20) + 1;
    return { a, b };
}
