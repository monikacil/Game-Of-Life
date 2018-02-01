var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

/*SASS to CSS*/
gulp.task('sass', function() {
    return gulp.src('scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers:['last 4 version']
        }))
        .pipe(sass({outputStyle: 'nested'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream())
});

/*Watcher*/
gulp.task('watch', function(){
    browserSync.init({
        server: ".",
        notify: true,
        open: true
    });
    gulp.watch('scss/**/*.scss', ['sass']);
    gulp.watch('./index.html', browserSync.reload);
});
