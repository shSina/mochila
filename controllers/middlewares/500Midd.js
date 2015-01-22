var app = require('lib/app')
	, error = require('lib/resFormat').error;

var middlewareError500 = function(err, req, res, next) {
	if (app.get('env') === 'development') {
		console.log(err.stack);

		res
		  .status(err.status || 500)
		  .json(error(err.message,'server internal error.'));
	}else{
		res
		  .status(err.status || 500)
		  .json(error(null,'server internal error.'));
	}
}

module.exports = middlewareError500;