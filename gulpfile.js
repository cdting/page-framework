var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var cssnano = require('gulp-cssnano');

//编译less并压缩css
gulp.task('style', function() {
    gulp.src('./less/*.less')
        .pipe(less())
        .pipe(cssnano())
        .pipe(gulp.dest('./css/'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

//browser-sync
gulp.task('serve', ['style'], function() {
    //初始化目录
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    //配置监听对象
    gulp.watch("./less/*.less", ['style']);

    gulp.watch("./*.html", browserSync.reload);
    gulp.watch("./pages/*.html", browserSync.reload);
    gulp.watch("./js/*.js", browserSync.reload);

});