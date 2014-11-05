var express = require('express')
    , path = require('path')
    , logger = require('morgan')
    , bodyParser = require('body-parser')
    , exp_router = express.Router()
    , io_router = require('socket.io-events')()
    , app = express()
    , http = require('http').Server(app)
    , io = require('socket.io')(http);

app.set('port',process.env.SERVER_PORT || 9000);
app.set('domain',process.env.SERVER_BIND_IP ||"0.0.0.0");

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

http.listen(app.get('port'),app.get('domain'), function(){
  console.log('listening on '+ app.get('domain') + ':' + app.get('port'));
});

module.exports = {
    app:app,
    router:exp_router,
    io:io,
    io_router: io_router
}