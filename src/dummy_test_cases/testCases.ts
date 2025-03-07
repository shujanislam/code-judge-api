export const testCases: { [key: string]: { input: any[]; expected: any }[] } = {
  "sum-function": [
    { input: [2, 3], expected: 5 },
    { input: [10, 20], expected: 30 },
    { input: [-5, 5], expected: 0 }
  ],
  "multiply-function": [
    { input: [2, 3], expected: 6 },
    { input: [4, 5], expected: 20 },
    { input: [-2, 8], expected: -16 }
  ],
  "reverse-string": [
    { input: ["hello"], expected: "olleh" },
    { input: ["world"], expected: "dlrow" },
    { input: ["typescript"], expected: "tpircsetyp" }
  ],
  "double-array": [
    { input: [[1, 2, 3]], expected: [2, 4, 6] },
    { input: [[4, 5, 6]], expected: [8, 10, 12] },
    { input: [[-1, -2, -3]], expected: [-2, -4, -6] }
  ]
};
