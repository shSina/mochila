var gulp = require('gulp')
	,bowerFiles = require('main-bower-files')
    ,inject = require('gulp-inject')
    ,connect = require('gulp-connect')
    ,modRewrite = require('connect-modrewrite')
    ,es = require('event-stream');



gulp.task('bower-inject',function () {
	gulp.src('./app/index.html')
		.pipe(inject(gulp.src(bowerFiles(), {read: false}), {name:'bower'}))
		.pipe(gulp.dest('./app'));
});
gulp.task('html-reload', function () {
	gulp.src('./app/*.html')
		.pipe(connect.reload())
		.pipe(gulp.dest('./app'));
});
gulp.task('livereload',function(){
	connect.server({
		root: 'app',
		port: process.env.LISTEN_PORT||3000,
		host: process.env.LISTEN_BIND_IP||'0.0.0.0',
		livereload: {
			port: 3579
		},
	    middleware: function (connect) {
	        return [
	            modRewrite(['!\\.html|\\.js|\\.svg|\\.css|\\.png|\\.jpg|\\.woff|\\.ttf|\\.jpeg$ /index.html [L]']),
	            connect().use(
	                '/bower_components',
	                connect.static('./bower_components')
	            ),
	            connect.static('.tmp')
	        ];
	    }
	});
});
gulp.task('watch', function () {
  gulp.watch(['./app/*.html'], ['html-reload']);
});

gulp.task('default', ['bower-inject','livereload','watch']);
gulp.task('default', function() {
	gulp.start('bower-inject');
	gulp.start('livereload');
	gulp.start('watch')
});