var gulp = require('gulp');
var zip = require('gulp-zip');
var watch = require('gulp-watch');
var preprocess = require('gulp-preprocess');

gulp.task('default', ['build', 'watch']);

gulp.task('watch', function(){
	watch('src/**/*', {verbose: true})
	.pipe(preprocess({context: {DEST: 'firefox'}}))
	.pipe(gulp.dest('build/firefox'))

	watch('src/**/*')
	.pipe(preprocess({context: {DEST: 'chrome'}}))
	.pipe(gulp.dest('build/chrome'))
});

gulp.task('buildFirefox', function(){
	gulp.src('src/**/*')
	.pipe(preprocess({context: {DEST: 'firefox'}}))
	.pipe(gulp.dest('build/firefox'))
});

gulp.task('buildChrome', function(){
	gulp.src('src/**/*')
	.pipe(preprocess({context: {DEST: 'chrome'}}))
	.pipe(gulp.dest('build/chrome'))
});

gulp.task('pack', function(){

	gulp.src('build/firefox/**/*')
		.pipe(zip('firefox.zip'))
		.pipe(gulp.dest('build'))

	gulp.src('build/chrome/**/*')
		.pipe(zip('chrome.zip'))
		.pipe(gulp.dest('build'))
});

gulp.task('build', [
		'buildFirefox',
		'buildChrome'
	]
);