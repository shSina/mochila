var app = require('lib/app')
    , error = require('lib/resFormat').error();

var middlewareError500 = function(err, req, res, next) {
    if (app.get('env') === 'development') {
            console.log(err.stack);

            res.status(err.status || 500);
            error.data = err.message;
            error.message = 'server internal error.';
            res.json(error);
    }else{
            res.status(err.status || 500);
            error.message = 'server internal error.';
            res.json(error);
    }
}

module.exports = middlewareError500;