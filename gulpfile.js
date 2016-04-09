var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var concat = require("gulp-concat");
var uglify = require('gulp-uglify');
var babel = require("gulp-babel");
var del = require("del");
var inject = require('gulp-inject');
var series = require('stream-series');
var browserSync = require('browser-sync').create();
var util = require('gulp-util');

var path = require('path');

var step = util.env.step;

gulp.task('clean', function() {
    return del.sync('./dist/**');
});

gulp.task("vendor", function() {
    return gulp.src([
            "./node_modules/requirejs/require.js",
            "./node_modules/handlebars/dist/handlebars.amd.js",
            "./node_modules/underscore/underscore.js",
            "./node_modules/babel-polyfill/dist/polyfill.js"
        ])
        .pipe(sourcemaps.init())
        .pipe(concat("vendor.js"))
        .pipe(uglify())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("dist"))
        .pipe(browserSync.stream({once: true}));
});

gulp.task("copy-bootstrap", function() {
    return gulp.src([
            "./node_modules/bootstrap/dist/fonts/**",
            "./node_modules/bootstrap/dist/css/**"
        ], {base: './node_modules/bootstrap/dist'})
        .pipe(gulp.dest("dist"));
});

gulp.task("copy", ['copy-bootstrap'], function() {
    return gulp.src([
            path.join(step, "src/templates/**"),
            path.join(step, "src/css/style.css"),
            path.join(step, "src/index.html")
        ], {base: path.join(step, 'src')})
        .pipe(gulp.dest("dist"))
        .pipe(browserSync.stream({once: true}));
});

gulp.task('static', ['copy', 'js', 'vendor'], function() {
    var cssStream = gulp.src(['./dist/**/*.css'], {read: false});

    gulp.src('./dist/index.html')
        .pipe(inject(cssStream, {relative: true}))
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream({once: true}));
});

gulp.task("js", function() {
    return gulp.src(path.join(step, "src/**/*.js"))
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("dist"))
        .pipe(browserSync.stream({once: true}));
});

gulp.task('build', ['clean', 'static']);

gulp.task("default", ['build'], function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        open: "local"
    });

    gulp.watch([
        path.join(step, "src/**/*.js")
    ], ['js']);

    gulp.watch([
        path.join(step, "src/templates/**"),
        path.join(step, "src/fonts/**"),
        path.join(step, "src/style.css"),
        path.join(step, "src/index.html")
    ], ['static']);
});
