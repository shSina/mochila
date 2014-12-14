var app = require('./lib/exp_app')
    , http = require('./lib/sio_io').http
    , router = require('./controllers/routing')
    , db_init = require('./lib/mongo_init');

http.listen(app.get('port'),app.get('domain'), function(){
	console.log('listening on '+ app.get('domain') + ':' + app.get('port'));
});