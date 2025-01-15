# Playwright Test Suite

This repository contains a suite of automated tests written with [Playwright](https://playwright.dev/). Follow the instructions below to set up the project and run the tests.

## Prerequisites

Ensure the following software is installed on your system:

- **Node.js** (version 16 or later)
  - [Download Node.js here](https://nodejs.org/).

- **npm** or **yarn** (comes with Node.js installation)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

   Or, if you prefer yarn:
   ```bash
   yarn install
   ```

## Running Tests

### Run All Tests

To execute the complete test suite, run:
```bash
npx playwright test
```

Or, with a specific test runner:
```bash
npm test
```

### Run a Specific Test File

To run a single test file, use:
```bash
npx playwright test tests/<test-file-name>
```

### Run Tests in Debug Mode

For debugging, run:
```bash
npx playwright test --debug
```

### View Test Reports

After running the tests, a report will be generated. To view it:
```bash
npx playwright show-report
```

## Additional Commands

- **Install Browsers**: Ensure all required browsers are installed:
  ```bash
  npx playwright install
  ```

- **Update Playwright**: To update Playwright and its dependencies:
  ```bash
  npm update @playwright/test
  ```

