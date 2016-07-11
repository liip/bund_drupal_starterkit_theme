(function () {

  'use strict';

  var gulp = require('gulp');
  var browserSync = require('browser-sync');
  var prefix = require('gulp-autoprefixer');
  var sass = require('gulp-sass');
  var util = require('gulp-util');
  var concat = require('gulp-concat');
  var uglify = require('gulp-uglify');
  var reload = browserSync.reload;


  gulp.task('import-styleguide', function () {

    return gulp.src(['styleguide/build/**/*'])
      .pipe(gulp.dest('assets'))
      .pipe(reload({stream: true}));
  });

  gulp.task('vendors-without-jquery', function () {

    return gulp.src([
      //'bower_components/jquery/jquery.js', // no jQuery here, 'cause Drupal
      'bower_components/jquery.tablesorter/js/jquery.tablesorter.js',
      'bower_components/chosen_v1.1.0/chosen.jquery.min.js',
      'bower_components/typeahead.js/dist/typeahead.bundle.js',
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/affix.js',
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/alert.js',
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/button.js',
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/carousel.js',
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/collapse.js',
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/dropdown.js',
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/modal.js',
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/tooltip.js',
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/popover.js',
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/scrollspy.js',
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/tab.js',
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/transition.js',
      'bower_components/bootstrapaccessibilityplugin/plugins/js/bootstrap-accessibility.js',
      'bower_components/jquery.tablesorter/js/jquery.tablesorter.js',
      'bower_components/jquery-drilldown/jquery.drilldown.min.js',
      'bower_components/placeholdr/placeholdr.js',
      'bower_components/blueimp-gallery/js/jquery.blueimp-gallery.min.js',
      'bower_components/blueimp-bootstrap-image-gallery/js/bootstrap-image-gallery.min.js',
      'node_modules/moment/moment.js',
      'node_modules/pikaday/pikaday.js'
    ])
    .pipe(concat('vendors-without-jquery.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js'));
  });

  gulp.task('styles', function () {

    return gulp.src('scss/admin-drupal.scss')
      .pipe(sass().on('error', function (err) {
        util.log(err);
        util.beep();
      }))
      //.pipe(prefix({browsers: ['last 2 versions', 'ie 9']}))
      .pipe(gulp.dest('assets/css'))
      .pipe(reload({stream: true}));
  });

  gulp.task('serve', function () {
    browserSync({
      proxy: {
        target: "http://bund-drupal-starterkit.lo"
      }
    });

    gulp.task('styles:watch', ['styles'], reload);
    gulp.watch('scss/**/*.scss', ['styles:watch']);
  });

  gulp.task('default', ['serve']);

  gulp.task('init', ['import-styleguide','vendors-without-jquery' ]);

})();
