var app = require('lib/app')
	, io = require('lib/sio').io;

app.use('/', require('controllers/api/index'));
app.use('/auth', require('controllers/api/auth'));
app.use('/admin/user',require('controllers/api/admin/user'));
app.use('/admin/class',require('controllers/api/admin/class'));
// require('./api/server_errors');

require('controllers/events/connection');
io.use(require('controllers/events/hello'));