var error = require('lib/resFormat').error();

var middlewareError404 = function(req, res) {

    res.status(404);
    error.message = 'what you look for???';
    res.json(error);

}

module.exports = middlewareError404;