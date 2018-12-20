'use strict'

const os = require('os')
const assert = require('chai').assert
const uuid = require('uuid/v4')
const index = require('./../src/index')

const fsify = require('fsify')({
	cwd: os.tmpdir()
})

describe('index()', function() {

	it('should get data out of a JSON file', async function() {

		const data = {
			key: uuid()
		}

		const structure = await fsify([
			{
				type: fsify.FILE,
				name: `${ uuid() }.json`,
				contents: JSON.stringify(data)
			}
		])

		const result = await index(structure[0].name)

		assert.deepEqual(result, data)

	})

	it('should get data out of a JS file', async function() {

		const data = {
			key: uuid()
		}

		const structure = await fsify([
			{
				type: fsify.FILE,
				name: `${ uuid() }.js`,
				contents: `
					module.exports = ${ JSON.stringify(data) }
				`
			}
		])

		const result = await index(structure[0].name)

		assert.deepEqual(result, data)

	})

	it('should get data out of a JS file function', async function() {

		const data = {
			key: uuid()
		}

		const structure = await fsify([
			{
				type: fsify.FILE,
				name: `${ uuid() }.js`,
				contents: `
					module.exports = () => (${ JSON.stringify(data) })
				`
			}
		])

		const result = await index(structure[0].name)

		assert.deepEqual(result, data)

	})

	it('should get data out of an async JS file function', async function() {

		const data = {
			key: uuid()
		}

		const structure = await fsify([
			{
				type: fsify.FILE,
				name: `${ uuid() }.js`,
				contents: `
					module.exports = async () => (${ JSON.stringify(data) })
				`
			}
		])

		const result = await index(structure[0].name)

		assert.deepEqual(result, data)

	})

	it('should load file with a custom require function', async function() {

		const data = {
			key: uuid()
		}

		const customRequire = () => Object.assign({}, data)

		const result = await index('unknown.js', customRequire)

		assert.deepEqual(result, data)

	})

})