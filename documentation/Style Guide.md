# Coding Standards & General Style Guide
**Product Name:** Bite

**Team Name:** Munchies

This document outlines the standards for all code in this project. Part of the acceptance criteria for every task should be to ensure new code adheres to these guidelines.

## File Rundown
Files should contain content in this order:
1. Imports
2. Constants
3. Global variables
4. Global functions
5. React components
   * Constants
   * State functions
   * Local functions
   * Return / Render function

## Imports
* All imports located at the very top of every file
* Only what's necessary, no unused imports
* Format for React (frontend):
  * `import { Object } from 'name or path';`
* Format for Node.js (backend):
  * `const object = require('name or path');`

## Constants
* Located under imports
* Naming convention: `camelCase`

## Indentation
* Always be either 2 or 4 spaces across entire file
* When creating a new file, use either
* When editing an existing file, always use existing indentation format

## Comments
* Generally try and comment as if you were explaining your code to someone
  * What different code branches do
  * What the purpose of variables are
  * Describe complicated / long expressions
  * Label different sections of the file (from rundown)
* Do not comment every single line, most trivial statements describe themselves
* For functions being used outside of the file:
  * Include comment explaining its purpose, parameters and return value(s)

## Other Guidelines
* Keep functions below 30 lines
  * With the exception of react render functions (those with HTML inside them)
* Put a semicolon at the end of every statement!
