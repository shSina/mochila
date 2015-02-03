var app = require('lib/app')
	, io = require('lib/sio').io;

app.use('/auth'       ,	require('controllers/api/authCtrl'));
app.use('/items/post'		  ,	require('controllers/api/items/postCtrl'));
app.use('/admin/user' ,	require('controllers/api/admin/userCtrl'));
app.use('/admin/class',	require('controllers/api/admin/classCtrl'));
app.use(require('controllers/middlewares/404Midd'));
app.use(require('controllers/middlewares/500Midd'));

require('controllers/events/connection');
io.use(require('controllers/events/hello'));
io.use(require('controllers/events/newItem'));