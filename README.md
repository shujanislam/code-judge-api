# code-judge-api

A secure API for validating and executing code in different programming languages while protecting against malicious code execution.

## 📋 Overview

This service provides an API endpoint that:
1. Validates submitted code against a list of potentially harmful code patterns
2. Executes validated code using appropriate language-specific runners
3. Returns execution results or error messages

## 🚀 Getting Started

### Prerequisites

- Node.js (v12 or higher)
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/shujanislam/code-execution-api.git
cd code-judge-api

# Install dependencies
npm install
```

### Environment Setup

Create a `.env` file in the root directory:

```
PORT=8080
```

### Running the Server

```bash
# Start the server
npm start

# For development with auto-restart
npm run dev
```

The server will be available at `http://localhost:8080`.

## 🔒 Security Features

This API implements a comprehensive security system to prevent malicious code execution:

- **Code Validation**: Checks submitted code against a database of known malicious patterns
- **Execution Isolation**: Runs code in isolated environments to prevent system access
- **Resource Limitations**: Prevents resource exhaustion attacks (fork bombs, infinite loops)

## 📡 API Endpoints

### Execute Code

```
POST /api/execute
```

#### Request Body

```json
{
  "language": "javascript",
  "code": "console.log('Hello, World!');"
}
```

#### Response

```json
{
  "success": true,
  "output": "Hello, World!"
}
```

#### Error Response

```json
{
  "success": false,
  "message": "Malicious code detected"
}
```

## 📁 Project Structure

```
├── .env                    # Environment variables
├── src/                    # Source directory
│   ├── server.ts           # Server entry point
│   ├── routes/
│   │   └── executeApi.ts   # API routes
│   └── utils/
│       ├── faultCode.ts    # List of malicious code patterns
│       ├── runTestCases.ts # Code execution handler
│       └── validateCode.ts # Code validation logic
├── dist/                   # Compiled JavaScript output
├── tsconfig.json           # TypeScript configuration
└── package.json            # Project dependencies and scripts
```

## 🔍 Code Validation

The system checks submitted code against a comprehensive list of potentially harmful patterns, including:

- System commands that could damage the host (`rm -rf /`, etc.)
- Fork bombs and infinite loops
- Shell access exploits
- File system manipulations
- Network exploitation attempts

## 🛠️ Extending

### Adding New Malicious Patterns

Extend the `faultCode.ts` file with new patterns:

```typescript
const faultCode: string[] = [
  // ... existing patterns
  'new_malicious_pattern',
];
```

### Supporting Additional Languages

Modify the `runTestCases.ts` file to add support for new programming languages.

## 📋 TypeScript Development

This project uses TypeScript for improved code reliability and developer experience.

### Key TypeScript Features

- **Type Safety**: All API endpoints and utility functions include proper type definitions
- **Interfaces**: Clearly defined data structures for requests and responses
- **Compilation**: TypeScript code is compiled to JavaScript using `tsc` or `ts-node`

### TypeScript Configuration

The project includes a `tsconfig.json` file with settings optimized for Node.js development:

```json
{
  "compilerOptions": {
    "target": "ES2018",
    "module": "CommonJS",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true
  }
}
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
