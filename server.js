var app = require('./lib/expressio').app;
var io  = require('./lib/expressio').io;

app.use('/', require('./controllers/api/index'));
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

require('./controllers/events/connection');
io.use(require('./controllers/events/hello'));