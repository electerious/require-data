# require-data

[![Travis Build Status](https://travis-ci.org/electerious/require-data.svg?branch=master)](https://travis-ci.org/electerious/require-data) [![Coverage Status](https://coveralls.io/repos/github/electerious/require-data/badge.svg?branch=master)](https://coveralls.io/github/electerious/require-data?branch=master) [![Dependencies](https://david-dm.org/electerious/require-data.svg)](https://david-dm.org/electerious/require-data#info=dependencies) [![Greenkeeper badge](https://badges.greenkeeper.io/electerious/require-data.svg)](https://greenkeeper.io/)

A function that tries to get the data out of a file that is either…

… a JSON file
… a JS file exporting a value that is not a function
… a JS file exporting a function
… a JS file exporting an async function

## Install

```
npm install require-data
```

## Usage

```js
const requireData = require('require-data')

requireData('data.json').then((data) => {})
requireData('data.js').then((data) => {})
requireData('sync.js').then((data) => {})
requireData('async.js').then((data) => {})
```

```js
const requireData = require('require-data')
const customRequire = require('continuous-stealthy-require')

requireData('data.json', customRequire).then((data) => {})
```

## Files

`require-data` will return data for all of those four files.

```json
{
  "some": "data"
}
```

```js
module.exports = {
	some: "data"
}
```

```js
module.exports = () => ({
	some: "data"
})
```

```js
module.exports = async () => ({
	some: "data"
})
```

## Parameters

- `filePath` `{String}` Path to file.
- `requireFn` `{?Function}` Custom require function.

## Returns

- `{Promise<*>}` Data of file.