var gulp = require('gulp')
	,bowerFiles = require('main-bower-files')
    ,inject = require('gulp-inject')
    ,browserSync = require('browser-sync')
	,reload = browserSync.reload
    ,modRewrite = require('connect-modrewrite')
    ,sass = require('gulp-compass')
    ,filter = require('gulp-filter')
    ,clean = require('gulp-clean')
    ,es = require('event-stream');

gulp.task('bower-inject',function () {
	gulp.src('./app/index.html')
		.pipe(inject(gulp.src(bowerFiles(), {read: false}), {name:'bower'}))
		.pipe(gulp.dest('./app'));
});

gulp.task('html', function () {
	reload();
});

gulp.task('sass',function(){
	gulp.src('./app/styles/**/*.scss')
	    .pipe(sass({
            sass:'./app/styles',
            css:'./.tmp/styles',
            sourcemap:true
	    }))
        .on('error', function (err) { console.log(err.message); })
        .pipe(gulp.dest('./.tmp/styles'))
        .pipe(filter('**/*.css'))
        .pipe(reload({stream:true}));
});

gulp.task('livereload',function(){
	browserSync({
        port: process.env.LISTEN_PORT||3000,
        server: {
            baseDir: "app",
            index: "index.html",
            middleware: [modRewrite(['!\\.html|\\.js|\\.svg|\\.css|\\.png|\\.jpg|\\.woff|\\.ttf|\\.jpeg|\\.css.map|\\.scss$ /index.html [L]'])],
            routes: {
		        "/bower_components": "./bower_components",
		        "/styles":"./.tmp/styles",
                "/app":"./app"
		    }
        },
        startPath: '/',
        open:false
    });
});

gulp.task('watch', function () {
  gulp.watch(['./app/**/*.html','./app/**/*.js'], ['html']);
  gulp.watch('./app/styles/**/*.scss', ['sass']);
});

gulp.task('default', ['bower-inject','livereload','sass','watch']);
