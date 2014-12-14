var app = require('../lib/exp_app')
	, io = require('../lib/sio_io').io;

app.use('/', require('./api/index'));
app.use('/auth', require('./api/auth'));
require('./api/server_errors');

require('./events/connection');
io.use(require('./events/hello'));