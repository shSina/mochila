var gulp = require('gulp')
	,bowerFiles = require('main-bower-files')
    ,inject = require('gulp-inject')
    ,connect = require('gulp-connect')
    ,es = require('event-stream');



gulp.task('bower-inject',function () {
	gulp.src('./app/index.html')
		.pipe(inject(gulp.src(bowerFiles(), {read: false}), {name:'bower'}))
		.pipe(gulp.dest('./app/'));
});
gulp.task('livereload',function(){
	connect.server({
		// root: ['app','tmp','bower_components'],
		root:'./app',
		port: process.env.LISTEN_PORT||3000,
		livereload: true
	});
});
gulp.task('default', function() {

	gulp.start('bower-inject');
	gulp.start('livereload');
});