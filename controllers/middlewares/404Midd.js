var error = require('lib/resFormat').error;

var middlewareError404 = function(req, res) {

	res
	.status(404)
	.json(error(undefined,'what you look for???'));
}

module.exports = middlewareError404;