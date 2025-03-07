import { testCases } from "../dummy_test_cases/testCaseOne";

export const boilerPlate = (language: string, userCode: string, problemId: string): string => {
  const testCasesForProblem = testCases[problemId];
  if (!testCasesForProblem) return "";

  const inputs = testCasesForProblem.map(tc => tc.input);
  const expectedOutputs = testCasesForProblem.map(tc => tc.expected);

  const boilerplates: { [key: string]: string } = {
    javascript: `
      function userFunction(a, b) {
          ${userCode}
      }

      const inputs = ${JSON.stringify(inputs)};
      const expectedOutputs = ${JSON.stringify(expectedOutputs)};

      for (let i = 0; i < inputs.length; i++) {
          const result = userFunction(...inputs[i]);
          console.log(result === expectedOutputs[i] ? "Test Passed" : "Test Failed");
      }
    `,

    python: `
      def user_function(a, b):
          ${userCode.replace(/\n/g, "\n    ")}

      inputs = ${JSON.stringify(inputs)}
      expected_outputs = ${JSON.stringify(expectedOutputs)}

      for i in range(len(inputs)):
          result = user_function(*inputs[i])
          print("Test Passed" if result == expected_outputs[i] else "Test Failed")
    `,

    c: `
      #include <stdio.h>

      int userFunction(int a, int b) {
          ${userCode}
      }

      int main() {
          int inputs[][2] = {${inputs.map(input => `{${input}}`).join(", ")}};
          int expected[] = {${expectedOutputs.join(", ")}};
          int numTests = ${inputs.length};

          for (int i = 0; i < numTests; i++) {
              int result = userFunction(inputs[i][0], inputs[i][1]);
              if (result == expected[i]) {
                  printf("Test Passed\\n");
              } else {
                  printf("Test Failed\\n");
              }
          }
          return 0;
      }
    `
  };

  return boilerplates[language] || "";
};
