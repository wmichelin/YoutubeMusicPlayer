var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var notify = require('gulp-notify');
var colors = require('colors/safe');



function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError(function(error){
      console.log(colors.red(error.message));
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}


gulp.task('js', function() {

  var bundler = browserify({
    entries: ['./js/main.jsx'], // Only need initial file, browserify finds the deps
    transform: [reactify], // We want to convert JSX to normal javascript
    debug: false, // Gives us sourcemapping
    cache: {},
    packageCache: {},
    fullPaths: true // Requirement of watchify
  });

  var watcher = watchify(bundler);

  return watcher
    .on('update', function() { // When any files update
      var updateStart = Date.now();
      console.log('Updating!');
      watcher.bundle()
        .on('error', handleErrors)
        .pipe(source('app.js'))
        // This is where you add uglifying etc.
        .pipe(gulp.dest('./build/'));
      console.log('Updated!', (Date.now() - updateStart) + 'ms');
    })
    .on('error', function() {
      console.log('error');
    })
    .bundle() // Create the initial bundle when starting the task
    .on('error', handleErrors)
    .pipe(source('app.js'))
    .pipe(gulp.dest('./build/'));


});

gulp.task('default', ['js']);
