let gulp 		 = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync  = require('browser-sync'),
	imagemin     = require('gulp-imagemin'), 
    pngquant     = require('imagemin-pngquant'),
    del          = require('del');

gulp.task('css', function() {
	return gulp.src('app/css/*.css')
	.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
	.pipe(gulp.dest('dist/css'))
	.pipe(browserSync.stream());
});

gulp.task('html', function() {
	return gulp.src('app/*.html')
	.pipe(browserSync.stream());
});

gulp.task('js', function() {
	return gulp.src('app/js/*.js')
	.pipe(browserSync.stream());
});

gulp.task('preBuild', async function() {
    let buildFonts = gulp.src('app/fonts/**/*') 
    .pipe(gulp.dest('dist/fonts'))

    let buildJs = gulp.src('app/js/**/*') 
    .pipe(gulp.dest('dist/js'))

    let buildHtml = gulp.src('app/*.html') 
    .pipe(gulp.dest('dist'));
});

gulp.task('imgMin', function() {
    return gulp.src('app/img/**/*') 
        .pipe(imagemin({ 
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/img')); 
});

gulp.task('browser', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('clean', async function() {
    return del.sync('dist'); 
});

gulp.task('watch', function() {
    gulp.watch('app/css/*.css', gulp.parallel('css')); 
    gulp.watch('app/*.html', gulp.parallel('html')); 
    gulp.watch('app/js/*.js', gulp.parallel('js')); 
});

gulp.task('default', gulp.parallel('browser', 'watch'));
gulp.task('build', gulp.series('clean', gulp.parallel('preBuild', 'imgMin', 'css')));