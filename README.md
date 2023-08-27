<div align="center">
	<h1>Node FS Utils</h1> 
	<br>
	<p>Seamlessly handle file system tasks and optimize child process management in Node.js using the versatile <code>node-fs-utils</code> utility, simplifying development workflows with efficiency</p>
	<a href="https://github.com/jaynath-d/node-fs-kit/actions"><img src="https://github.com/jaynath-d/node-fs-kit/workflows/ci/badge.svg?branch=main" alt="Build status"></a>
<!-- 	<a href="./coverage/lcov-report/index.html"><img src="https://img.shields.io/coveralls/github/jaynath-d/node-fs-kit" alt="Coverage status"></a> -->
	<a href="https://packagephobia.now.sh/result?p=node-fs-kit"><img src="https://badgen.net/packagephobia/install/node-fs-kit" alt="Current version"></a>
	<a href="https://www.npmjs.com/package/node-fs-kit"><img src="https://img.shields.io/npm/dw/node-fs-kit" alt="Downloads"></a>
	<a href="https://www.npmjs.com/package/node-fs-kit"><img src="https://img.shields.io/npm/v/node-fs-kit" alt="Install size"></a>
</div>

---

## Installation
To install the package, use the following command:
```sh
npm install --save node-fs-utils
```


## Usage
Below are some minimal usage examples demonstrating how to use the `node-fs-utils` package.

### Initialization
You can initialize the `node-fs-utils` using either CommonJS or ES6 syntax:
```javascript
// CommonJS
const fs = require("node-fs-utils");

// ES6
import fs from 'node-fs-utils';
```

### Read Direcory
Read the contents of a directory.
```javascript
const output = fs.config({path: <directory_path>}).readdir()
console.log(output)
```
```json
[
  "test.csv",
  "test.txt",
  "test.js"
]
```

### Get Directory Info
Get information about a file or directory.
```javascript
const output = fs.config({path: <directory_path>}).readdir()
console.log(output)
```
```json
{
  "dev": 16777223,
  "mode": 16893,
  "nlink": "5",
  "uid": 501,
  "gid": 20,
  "rdev": 0,
  "blksize": 4096,
  "ino": 8341104,
  "size": 160,
  "blocks": 0,
  "atimeMs": 1692462842366.5476,
  "mtimeMs": 1692462640828.8342,
  "ctimeMs": 1692462640828.8342,
  "birthtimeMs": 1687148653000,
  "atime": "2023-08-19T16:34:02.367Z",
  "mtime": "2023-08-19T16:30:40.829Z",
  "ctime": "2023-08-19T16:30:40.829Z",
  "birthtime": "2023-06-19T04:24:13.000Z"
}
```

### Extract Class Name
Get class names from a JAR file based on a pattern.
```javascript
const output = fs.config({path: <jarfile_path>}).getClassNamesInJar(<classNamePattern>)
console.log(output)
```
```json
[ "org.postgresql.Driver" ]
```


