var app = require('lib/app')
	, io = require('lib/sio').io;

app.use('/stream'     , require('controllers/api/streamCtrl'));
app.use('/auth'       , require('controllers/api/auth/signinCtrl'));
app.use('/user'       , require('controllers/api/user/userCtrl'));
app.use('/items'      , require('controllers/api/items/indexCtrl'));
app.use('/items/post' , require('controllers/api/items/postCtrl'));
app.use('/items/word' , require('controllers/api/items/wordCtrl'));
app.use('/admin/user' , require('controllers/api/admin/userCtrl'));
app.use('/admin/class', require('controllers/api/admin/classCtrl'));

app.use(require('controllers/middlewares/404Midd'));
app.use(require('controllers/middlewares/500Midd'));

require('controllers/events/connection');
io.use(require('controllers/events/message'));
io.use(require('controllers/events/bcMessage'));
io.use(require('controllers/events/additem'));
io.use(require('controllers/events/disconnect'));
io.use(require('controllers/events/allclass'));