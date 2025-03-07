import { testCases } from "../dummy_test_cases/testCases";

export const boilerPlate = (language: string, userCode: string, problemId: string): string => {
  const testCasesForProblem = testCases[problemId];
  if (!testCasesForProblem) return "";

  // ✅ Define variables before using them
  const isStringProblem = problemId === "reverse-string";
  const isArrayProblem = problemId === "double-array";

  const inputs: any[] = testCasesForProblem.map(tc => tc.input);
  const expectedOutputs: any[] = testCasesForProblem.map(tc => tc.expected);

  const boilerplates: { [key: string]: string } = {
    javascript: `
      function userFunction(${isArrayProblem ? "arr" : isStringProblem ? "s" : "a, b"}) {
          ${userCode}
      }

      const testCases = ${JSON.stringify(testCasesForProblem)};

      testCases.forEach(({ input, expected }, index) => {
          try {
              console.log("Running Test", index + 1);
              console.log("Input:", input);
              
              const result = userFunction(...input);
              
              console.log("Output:", result);
              console.log("Expected:", expected);
              
              console.log(\`Test \${index + 1}: \`, result === expected ? "Passed" : "Failed");
          } catch (error) {
              console.error(\`Test \${index + 1} Failed: \`, error.message);
          }
      });
  `,

    python: `
      def user_function(${isArrayProblem ? "arr" : isStringProblem ? "s" : "a, b"}):
          ${userCode.replace(/\n/g, "\n    ")}

      test_cases = ${JSON.stringify(testCasesForProblem)}

      for index, tc in enumerate(test_cases):
          try:
              result = user_function(*tc["input"])
              print(f"Test {index + 1}: {'Passed' if result == tc['expected'] else 'Failed'}")
          except Exception as e:
              print(f"Test {index + 1} Failed: {str(e)}")
    `,

    c: `
      #include <stdio.h>
      #include <string.h>

      ${isStringProblem ? `
      void userFunction(char s[]) {
          int len = strlen(s);
          for(int i = 0; i < len / 2; i++) {
              char temp = s[i];
              s[i] = s[len - i - 1];
              s[len - i - 1] = temp;
          }
      }
      ` : isArrayProblem ? `
      void userFunction(int arr[], int size) {
          for (int i = 0; i < size; i++) {
              arr[i] *= 2;
          }
      }
      ` : `
      int userFunction(int a, int b) {
          ${userCode}
      }
      `}

      int main() {
          ${isStringProblem ? `
          char inputs[][100] = {${inputs.map(input => `"${input}"`).join(", ")}};
          char expected[][100] = {${expectedOutputs.map(output => `"${output}"`).join(", ")}};
          int numTests = ${inputs.length};

          for (int i = 0; i < numTests; i++) {
              userFunction(inputs[i]);
              if (strcmp(inputs[i], expected[i]) == 0) {
                  printf("Test Passed\\n");
              } else {
                  printf("Test Failed\\n");
              }
          }
          ` : isArrayProblem ? `
          int inputs[][5] = {${inputs.map(input => `{${input.join(", ")}}`).join(", ")}};
          int expected[][5] = {${expectedOutputs.map(output => `{${output.join(", ")}}`).join(", ")}};
          int numTests = ${inputs.length};
          int size = sizeof(inputs[0]) / sizeof(inputs[0][0]);

          for (int i = 0; i < numTests; i++) {
              userFunction(inputs[i], size);
              int passed = 1;
              for (int j = 0; j < size; j++) {
                  if (inputs[i][j] != expected[i][j]) {
                      passed = 0;
                      break;
                  }
              }
              if (passed) {
                  printf("Test Passed\\n");
              } else {
                  printf("Test Failed\\n");
              }
          }
          ` : `
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
          `}
          return 0;
      }
    `,
  };

  return boilerplates[language] || "";
};
