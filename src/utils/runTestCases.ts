import { exec } from "child_process";
import fs from "fs";
import path from "path";

import { boilerPlate } from './boilerPlate';

export const runTestCases = (language: string, userCode: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const tempDir = path.join(__dirname, "../../temp");

    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

    const extensions: { [key: string]: string } = {
      python: "py",
      javascript: "js",
      cpp: "cpp",
    };

    if (!extensions[language]) {
      return reject(new Error("Unsupported Language"));
    }

    const filename = `program.${extensions[language]}`;
    const filePath = path.join(tempDir, filename);

    const finalCode = boilerPlate(language, userCode);
  
    try {
      fs.writeFileSync(filePath, finalCode);
    } catch (err: any) {
      return reject(new Error(`Failed to write code file: ${err.message}`));
    }

    const commands: { [key: string]: string } = {
      python: `python3 /code/temp/${filename}`,
      javascript: `node /code/temp/${filename}`,
      cpp: `g++ /code/temp/${filename} -o /code/temp/program && /code/temp/program`,
    };

    exec(
      `docker run --rm -v ${tempDir}:/code/temp code-runner sh -c "${commands[language]}"`,
      (error, stdout, stderr) => {
        if (error) reject(new Error(stderr || error.message));
        else resolve(stdout.trim());
      }
    );
  });
};
