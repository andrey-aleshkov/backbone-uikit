'use strict';

const gulp = require('gulp');
const requirejs = require('requirejs');
const babel = require('gulp-babel');
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
    '**/*.js',
    '!node_modules/**',
    '!gulpfile.js',
    '!app/**',
    '!dist/**',
    '!tests/**',
    '!uikit-todo/**',
    '!js-temp/**'
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
    return del('dist');
});

gulp.task('clean-js-temp', function() {
    return del(['js-temp']);
});

gulp.task('js-temp', function() {
    return gulp.src(jsFiles)
        .pipe(debug({title: 'copy to js-temp:'}))
        .pipe(gulp.dest('js-temp'));
});

gulp.task('js-temp-es6', function() {
    return gulp.src([
            'js-temp/**/*.js',
            '!js-temp/libs/**',
            '!js-temp/require.js',
            '!js-temp/domReady.js'
        ])
        .pipe(debug({title: 'babel:'}))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('js-temp'));
});

gulp.task('js-temp-rjs', function(cb) {

    // https://github.com/joshje/gulp-requirejs-simple
    requirejs.optimize({
        findNestedDependencies: true,
        baseUrl: 'js-temp', // './'
        name: 'libs/almond/almond-0.3.2',
        paths: {
            jquery: 'libs/jquery/jquery-2.1.1.min',
            underscore: 'libs/underscore/underscore-1.3.3',
            backbone: 'libs/backbone/backbone-1.1.2',
            jgestures: 'libs/jgestures/jgestures-0.90',
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
        out: './dist/uikit.js',
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
        .pipe(gulp.dest('dist'));
});

//gulp.task('img', function() {
//    return gulp.src(imgFiles, {since: gulp.lastRun('img')})
//        .pipe(newer('dist/img'))  // TODO: Check it
//        .pipe(debug({title: 'copy:'}))
//        .pipe(gulp.dest('dist/img'));
//});

//gulp.task('html', function() {
//    return gulp.src(htmlFiles, {since: gulp.lastRun('html')})
//        .pipe(gulpIf('*.html', preprocess()))
//        .pipe(debug({title: 'copy:'}))
//        .pipe(gulp.dest('dist'));
//});


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
    browserSync.watch(['css/app.css', 'dist/uikit.css']).on('change', function(file) {
        console.log('css = ', file);
        browserSync.reload(file);
    });
    browserSync.watch(['app/**/*.js', 'uikit/**/*.js']).on('change', function(file){
        console.log('js = ', file);
        browserSync.reload(file);
    });
});

// development

gulp.task('dev', gulp.series(
    'clean',
    'css',
    gulp.parallel('watch', 'serve')
));

// production

gulp.task('build-js', gulp.series(
    'js-temp',
    'js-temp-es6',
    'js-temp-rjs',
    'clean-js-temp'
));

gulp.task('build', gulp.series(
    'clean',
    gulp.parallel('build-js', 'css'))
);