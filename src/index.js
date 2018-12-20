'use strict'

/**
 * Extracts data out of multiple file types.
 * @public
 * @param {String} filePath - Path to file.
 * @param {?Function} requireFn - Custom require function.
 * @returns {Promise<*>} Data.
 */
module.exports = async function(filePath, requireFn = require) {

	const requiredModule = requireFn(filePath)
	const isFunction = typeof requiredModule === 'function'

	return isFunction === true ? requiredModule() : requiredModule

}