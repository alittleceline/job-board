var gulp = require('gulp');
var sass = require('gulp-sass');
var image = require('gulp-image');
var autoprefixer = require('gulp-autoprefixer');
var gulpif = require('gulp-if');
var sprity = require('sprity');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// source and distribution folder
var
    source = 'src/',
    dest = 'dist/';

// Bootstrap scss source
// Didn't fine tune bootstrap package with http://getbootstrap.com/customize/. This is heavy by default
// TODO: remove unused components & styles
var bootstrapSass = {
    in: './node_modules/bootstrap-sass/'
};

// img source files
var img = {
    in: [source + 'img/**/*.*'],
    out: dest + 'img/'
};

// fonts source files
var fonts = {
    in: [source + 'fonts/**/*.*', bootstrapSass.in + 'assets/fonts/**/*'],
    out: dest + 'fonts/'
};

// css source files: .scss files
var scss = {
    in: source + 'scss/styles.scss',
    out: dest + 'css/',
    watch: source + 'scss/**/*',
    sassOpts: {
        outputStyle: 'compressed',
        precison: 3,
        errLogToConsole: true,
        includePaths: [bootstrapSass.in + 'assets/stylesheets']
    }
};

// copy bootstrap required fonts to dest
gulp.task('fonts', function () {
    return gulp
        .src(fonts.in)
        .pipe(gulp.dest(fonts.out));
});

// compile scss
gulp.task('sass', ['fonts'], function () {
    return gulp.src(scss.in)
        .pipe(sass(scss.sassOpts))
        .pipe( autoprefixer( 'last 2 version', 'safari 5', 'ie 10', 'ios 6', 'android 4' ) )
        .pipe(gulp.dest(scss.out));
});
// images
gulp.task('image', function () {
    return gulp
        .src(img.in)
        .pipe(image())
        .pipe(gulp.dest(img.out));
});

// generate sprite.png and _sprite.scss
gulp.task('sprites', function () {
    return sprity.src({
            src: './src/images/**/*.{png,jpg}',
            style: './sprite.css',
            // ... other optional options
            // for example if you want to generate scss instead of css
            processor: 'sass', // make sure you have installed sprity-sass
        })
        .pipe(gulpif('*.png', gulp.dest('./dist/img/'), gulp.dest('./dist/css/')))
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('src/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// default task
gulp.task('default', ['image', 'sass', 'scripts'], function () {
    gulp.watch(scss.watch, ['sass']);
    gulp.watch('src/js/*.js', ['scripts']);
});

// Build without the watchers
gulp.task('build', ['image', 'sass', 'scripts']);



