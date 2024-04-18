## Usage

```bash
npx jest-to-node path/to/jest/tests path/to/output
```

## Local setup

### Step 1: Local Build

First, compile your TypeScript code to JavaScript using your build script:

```bash
npm run build
```

### Step 2: Link Locally

Before you publish the package, you can use npm link to simulate installing your package globally. This creates a symlink in the global folder that links to the local development folder.

- Link your package globally:

  Navigate to your project directory (where your package.json is located) and run:

  ```bash
   npm link
  ```

  This command makes your CLI tool available globally on your system as if it were installed via npm.

- Test the command:

  You can now run your tool from anywhere using the command name defined in the bin section of your package.json. For example:

  ```bash
  jest-to-node path/to/jest/tests path/to/output
  ```

  Replace path/to/jest/tests and path/to/output with actual paths on your local machine where you have some test files ready to be transformed.
