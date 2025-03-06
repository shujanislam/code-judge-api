export const boilerPlate = (language: string, userCode: string): string => {
  const boilerplates: { [key: string]: string } = {
    javascript: `
      function main() {
        ${userCode}
      }
      console.log(main());
    `,
    
    python: `
      def main():
          ${userCode.replace(/\n/g, "\n    ")}
      print(main())
    `,

    cpp: `
      #include <iostream>
      using namespace std;
      
      ${userCode}

      int main() {
          cout << add(2, 3) << endl;
          return 0;
      }
    `
  };

  return boilerplates[language] || "";
}
