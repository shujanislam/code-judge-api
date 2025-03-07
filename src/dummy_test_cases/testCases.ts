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
  "divide-function": [
    { input: [49, 7], expected: 7 },
    { input: [50, 5], expected: 10 },
    { input: [-2, 2], expected: -1 }
  ],
  "lowercase-string": [
    { "input": ["Hello"], "expected": "hello" },
    { "input": ["FOOBAR"], "expected": "foobar" }
  ],
  "concatenate-two-strings": [
    { "input": ["hello", "world"], "expected": "helloworld" },
    { "input": ["foo", "bar"], "expected": "foobar" }
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
