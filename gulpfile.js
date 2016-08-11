'use strict';

const gulp = require('gulp');
const requirejs = require('requirejs');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const debug = require('gulp-debug');
const gulpIf = require('gulp-if');
const newer = require('gulp-newer');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const del = require('del');
const preprocess = require('gulp-preprocess');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

const jsFiles = [
    'js/**/*.js',
    'js/**/*.map'
];

const cssFiles = [
    //'css/reset.css',
    //'css/media.css',
    //'css/grid.css',
    //'css/uikit.css',
    //'css/app.css',
    'uikit/**/*.css'
];

const imgFiles = [
    'img/**/*.*'
];

const htmlFiles = [
    'index.html',
    'favicon.ico'
];



gulp.task('default', function() {
    console.log('default !!!');
    // place code for your default task here
});

gulp.task('clean', function() {
    return del('public');
});

gulp.task('js', function(cb) {

    // https://github.com/joshje/gulp-requirejs-simple
    requirejs.optimize({
        findNestedDependencies: true,
        baseUrl: './',
        name: 'lib/almond/almond-0.3.2',
        paths: {
            jquery: 'lib/jquery/jquery-2.1.1.min',
            underscore: 'lib/underscore/underscore-1.3.3',
            backbone: 'lib/backbone/backbone-1.1.2',
            jgestures: 'lib/jgestures/jgestures-0.90',
            uikit: 'uikit'
        },
        shim: {
            'underscore': {
                exports: '_'
            },
            'backbone': {
                deps: ['underscore', 'jquery'],
                exports: 'Backbone'
            },
            'jgestures': {
                deps: ['jquery'],
                exports: 'jGestures'
            }
        },
        include: ['uikit'],
        exclude: ['jquery', 'underscore', 'backbone', 'jgestures'],
        optimize: 'uglify', // none, uglify
        preserveLicenseComments: false,
        out: './public/uikit.js',
        wrap: {
            "startFile": "wrap.start",
            "endFile": "wrap.end"
        },
        onModuleBundleComplete: function(data) {
            /*
             var fs = require('fs'),
             amdclean = require('amdclean'),
             outputFile = data.path;

             fs.writeFileSync(outputFile, amdclean.clean({
             'filePath': outputFile
             }));
             */
        }
    }, function() {
        cb();
    }, function(err){
        cb(err);
    });

});

gulp.task('css', function() {
    return gulp.src(cssFiles)
        .pipe(gulpIf(isDevelopment, sourcemaps.init()))
        .pipe(debug({title: 'src:'}))
        //.pipe(autoprefixer())
        .pipe(concat('uikit.css'))
        .pipe(debug({title: 'concat:'}))
        .pipe(gulpIf(isDevelopment, sourcemaps.write()))
        .pipe(gulp.dest('public'));
});

//gulp.task('img', function() {
//    return gulp.src(imgFiles, {since: gulp.lastRun('img')})
//        .pipe(newer('public/img'))  // TODO: Check it
//        .pipe(debug({title: 'copy:'}))
//        .pipe(gulp.dest('public/img'));
//});

//gulp.task('html', function() {
//    return gulp.src(htmlFiles, {since: gulp.lastRun('html')})
//        .pipe(gulpIf('*.html', preprocess()))
//        .pipe(debug({title: 'copy:'}))
//        .pipe(gulp.dest('public'));
//});



gulp.task('build-css', gulp.series(
    'clean','css')
);

gulp.task('watch', function() {
    //gulp.watch(jsFiles, gulp.series('js'));
    gulp.watch(cssFiles, gulp.series('css'));
    //gulp.watch(imgFiles, gulp.series('img'));
    //gulp.watch(htmlFiles, gulp.series('html'));
});

gulp.task('serve', function() {
    browserSync.init({
        server: true
    });
    browserSync.watch('css/app.css', 'public/uikit.css').on('change', function(file) {
        console.log('css = ', file);
        browserSync.reload(file);
    });
    browserSync.watch(['app/**/*.js', 'uikit/**/*.js']).on('change', function(file){
        console.log('js = ', file);
        browserSync.reload(file);
    });
});

gulp.task('dev', gulp.series('build-css', gulp.parallel('watch', 'serve')));

gulp.task('build', gulp.series(
    'clean',
    gulp.parallel('js', 'css'))
);