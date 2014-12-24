var app = require('../lib/exp_app')
	, io = require('../lib/sio_io').io;

app.use('/', require('./api/index'));
app.use('/auth', require('./api/auth'));
app.use('/admin/user',require('./api/admin/user'));
app.use('/admin/class',require('./api/admin/class'));
// require('./api/server_errors');

require('./events/connection');
io.use(require('./events/hello'));