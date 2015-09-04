/* eslint-disable no-var */

var gulp = require('gulp');
var del = require('del');
var path = require('path');
var mergeStream = require('merge-stream');
var lazypipe = require('lazypipe');
var KarmaServer = require('karma').Server;
var plugins = require('gulp-load-plugins')({
  rename: {
    'gulp-babel-external-helpers': 'babelHelpers',
  },
});

var config = {
  dest: 'dist/',
  webSrc: 'web/src/**/*.js',
  webTest: 'web/test/**/*.spec.js',
  webCoverage: 'coverage/web/',
  coverage: 'coverage/',
};

var lintPipeline = lazypipe()
    .pipe(plugins.eslint)
    .pipe(plugins.eslint.format)
    .pipe(plugins.eslint.failAfterError);

gulp.task('clean', function(done) {
  del([config.dest], function() {
    del([config.coverage], done);
  });
});

gulp.task('hint', function() {
  return gulp.src(['./*.js'])
    .pipe(lintPipeline());
});

function getSourcePipeline(concatFilename) {
  return lazypipe()
    .pipe(lintPipeline)
    .pipe(plugins.sourcemaps.init)
    .pipe(plugins.babel, {externalHelpers: true})
    .pipe(plugins.wrapJs, '(function() { %= body % })()')
    .pipe(plugins.babelHelpers, 'babelHelpers.js', 'var')
    .pipe(plugins.order, ['web/src/module.js'])
    .pipe(plugins.concat, concatFilename)
    .pipe(plugins.wrapJs, '(function() { %= body % })()')
    .pipe(plugins.sourcemaps.write, './');
}

gulp.task( 'build', ['clean'], function() {
  return gulp.src([config.webSrc], {base: './'})
    .pipe(getSourcePipeline('web-dashboard.js')())
    .pipe(gulp.dest(config.dest))
    .pipe(plugins.ignore.exclude(/.js.map/))
    .pipe(plugins.rename({ extname: '.min.js' }))
    .pipe(plugins.uglify())
    .pipe(plugins.sourcemaps.write('./'))
    .pipe(gulp.dest(config.dest));
});

function runKarmaTests(done, coverage) {
  var karmaConfig = {
    configFile: path.join(__dirname, '/karma.conf.js'),
    singleRun: true,
    autoWatch: false,
    browsers: ['PhantomJS'],
    files: [
      'dist/deps/angular.js',
      'dist/deps/**/*.js',
      'dist/web-dashboard.min.js',
      'dist/web-dashboard.spec.js',
    ],
    preprocessors: {},
  };
  if (coverage) {
    karmaConfig.files = [
      'dist/deps/angular.js',
      'dist/deps/**/*.js',
      'web/src/module.js',
      'web/src/**/*.js',
      'dist/web-dashboard.spec.js',
    ];
    karmaConfig.preprocessors = {
      'web/src/**/*.js': ['babel', 'coverage'],
    };
    karmaConfig.reporters = ['coverage'];
  }
  new KarmaServer(karmaConfig, done).start();
}

gulp.task('test-deps', ['clean'], function() {
  var bowerDeps = gulp.src('./bower.json')
    .pipe(plugins.mainBowerFiles({includeDev: true}));

  var deps = mergeStream(bowerDeps, gulp.src(['node_modules/gulp-babel/node_modules/babel-core/browser-polyfill.js']))
    .pipe(plugins.rename({dirname: 'deps'}));

  var testFiles = gulp.src([config.webTest], {base: './'})
    .pipe(getSourcePipeline('web-dashboard.spec.js')());

  return mergeStream(testFiles, deps)
    .pipe(gulp.dest(config.dest));
});

gulp.task('test', ['build', 'test-deps'], function(done) {
  runKarmaTests(done);
});

gulp.task('coverage', ['build', 'test-deps'], function(done) {
  runKarmaTests(done, true);
});

gulp.task('dev', ['build', 'test'], function() {
  gulp.watch([config.webSrc, config.webTest], ['build', 'test']);
});

gulp.task('default', ['hint', 'build', 'test', 'coverage']);
