const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const atImport = require('postcss-import');
const cssnext = require('postcss-cssnext');
const precss = require('precss');
module.exports = {
	plugins : [
		atImport,

		precss,
		cssnext,
		autoprefixer({
			browsers : [ 'Firefox > 1' ]
		})
		// cssnano
	]
	// output  : '../build/'
};
