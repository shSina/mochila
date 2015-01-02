var app = require('lib/app')
    , http = require('lib/sio').http
    , router = require('controllers/routing')
    , db_init = require('lib/mongoInit');

http.listen(app.get('port'),app.get('domain'), function(){
	console.log('listening on '+ app.get('domain') + ':' + app.get('port'));
});