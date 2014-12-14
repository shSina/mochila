var app = require('../../lib/exp_app');

app.use(function(req, res) {
	res.status(404);
	res.send('what you look for???');
});
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        console.log(err.stack);
        res.send(err.message);
    });
}else{
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.send('server internal error.');
    });    
}
