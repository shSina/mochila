var gulp = require('gulp')
	, nodemon = require('gulp-nodemon')
	, jshint = require('gulp-jshint')
	, stylish = require('jshint-stylish');

gulp.task('default', function() {
	// place code for your default task here
	console.log("gulp started");
	gulp.start('nodemon');
});

gulp.task('lint', function () {
	gulp.src('./**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter(stylish))
})

gulp.task('nodemon', function () {
	nodemon({ script: 'server.js', ext: 'js', ignore: [] })
		// .on('change', ['lint'])
		.on('restart', function () {
			console.log('restarted!')
		})
})