var app = require('lib/app')
	, io = require('lib/sio').io;

app.use('/auth',		require('controllers/api/auth'));
app.use('/admin/user',	require('controllers/api/admin/user'));
app.use('/admin/class',	require('controllers/api/admin/class'));
app.use(require('controllers/api/404'));
app.use(require('controllers/api/500'));

require('controllers/events/connection');
io.use(require('controllers/events/hello'));