# @kikiutils/wrappers

[![npm version](https://img.shields.io/npm/v/%40kikiutils%2Fwrappers)](https://www.npmjs.com/package/@kikiutils/wrappers)
[![license](https://img.shields.io/npm/l/%40kikiutils%2Fwrappers)](https://www.npmjs.com/package/@kikiutils/wrappers)

## Table of contents

- [@kikiutils/wrappers](#kikiutilswrappers)
  - [Table of contents](#table-of-contents)
  - [Description](#description)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Methods](#methods)
    - [tryAndGetBoolean](#tryandgetboolean)
    - [tryAndGetData](#tryandgetdata)
  - [Notice](#notice)
  - [Versioning](#versioning)
  - [Authors](#authors)
  - [License](#license)

## Description

This package provides some useful function wrappers.

## Prerequisites

This package requires NodeJS (version 16 or later) and NPM or other package manager.

[Node](http://nodejs.org/) and [NPM](https://npmjs.org/) are really easy to install.

To make sure you have them available on your machine,
try running the following command.

```bash
$ node -v && npm -v
v20.5.1
9.8.1
```

## Installation

**Before installing,** please read the [prerequisites](#prerequisites).

To install and set up the library, run:

```bash
$ npm i @kikiutils/wrappers     # Npm
$ pnpm add @kikiutils/wrappers  # Pnpm
$ yarn add @kikiutils/wrappers  # Yarn
```

## Methods

All wrappers support passing in async or sync function.

### tryAndGetBoolean

Run the function use try/catch.

Returns false if there was an error. Otherwise return true.

```typescript
import { tryAndGetBoolean } from '@kikiutils/wrappers';

// Async usage
const wrappedFunc = tryAndGetBoolean(async (from: string, to: string) => {
	// ...some actions.
	return [from, to];
});

const asyncResult = await wrappedFunc('./from', './to');
// true - successfully executed
// false - an error occurred

// Sync usage
const wrappedFuncSync = tryAndGetBoolean((from: string, to: string) => {
	// ...some actions.
	return [from, to];
});

const syncResult = wrappedFuncSync('./from', './to');
// true - successfully executed
// false - an error occurred
```

### tryAndGetData

Run the function use try/catch.

If an error occurs, returns undefined or the set value. Otherwise return the function result.

```typescript
import { tryAndGetData } from '@kikiutils/wrappers';
import fs from 'fs';
import fsp from 'fs/promises';

// Async usage
const wrappedFunc = tryAndGetData(async (path: string) => {
	// ...some actions.
	return await fsp.readFile(path);
});

const asyncResult = await wrappedFunc('./package.json');
// Buffer - successfully read
// undefined - an error occurred

// Sync usage
const wrappedFuncSync = tryAndGetData((path: string) => {
	// ...some actions.
	return fs.readFileSync(path);
});

const syncResult = wrappedFuncSync('./package.json');
// Buffer - successfully read
// undefined - an error occurred

// With onErrorValue
const wrappedFunc = tryAndGetData(async (path: string) => {
	// ...some actions.
	return await fsp.readFile(path);
}, false);

const asyncResult = await wrappedFunc('./package.json');
// Buffer - successfully read
// false - an error occurred
```

## Notice

If you're using typescript, wrapping a function with overloads will break the original type hints and checks for overloads.

To solve this problem, you may need to wrap the function to be wrapped and specify the input type explicitly.

```typescript
import { tryAndGetData } from '@kikiutils/wrappers';
import fsp from 'fs/promises';

// Original function
const oFile = await fsp.readFile('./package.json');
// oFile type is Buffer

const wrappedReadFile = tryAndGetData(fsp.readFile);
const wFile = await wrappedReadFile('./package.json');
// wFile type is string | Buffer | undefined

// Set params to get current type.
const cWrappedReadFile = tryAndGetData(async (path: string) => await fsp.readFile(path));
const cWFile = await cWrappedReadFile('./package.json');
// cWFile type is Buffer | undefined
```

## Versioning
This project adheres to [Semantic Versioning](http://semver.org).

For the versions available, see the [versions on npm](https://www.npmjs.com/package/@kikiutils/fs-extra?activeTab=versions).

## Authors

- **kiki-kanri** - [kiki-kanri](https://github.com/kiki-kanri)

## License

[MIT License](LICENSE) © kiki-kanri
