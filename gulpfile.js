var gulp = require('gulp');
var zip = require('gulp-zip');
var watch = require('gulp-watch');
var preprocess = require('gulp-preprocess');
var cp = require('child_process');


gulp.task('default', ['build', 'watch']);

gulp.task('watch', function(){

	watch('manifestor.js', function(){
		cp.fork('manifestor.js');
	})

	watch(['src/**/*', '!src/assets/images/*'], {verbose: true})
	.pipe(preprocess({
		context: {DEST: 'firefox'}
	}))
	.pipe(gulp.dest('build/firefox'))

	watch(['src/**/*', '!src/assets/images/*'], {verbose: true})
	.pipe(preprocess({
		context: {DEST: 'chrome'}
	}))
	.pipe(gulp.dest('build/chrome'))

	watch('src/assets/images/*')
	.pipe(gulp.dest('build/firefox/assets/images'))
	.pipe(gulp.dest('build/chrome/assets/images'))
});

gulp.task('buildFirefox', function(){

	//Copy all files
	gulp.src(['src/**/*', '!src/assets/images/*'])
	.pipe(preprocess({
		context: {DEST: 'firefox'}
	}))
	.pipe(gulp.dest('build/firefox'))

	//Add images without preprocess them
	gulp.src('src/assets/images/*')
	.pipe(gulp.dest('build/firefox/assets/images'))

	//Add manifest firefox version
});

gulp.task('buildChrome', function(){

	//Copy all files
	gulp.src(['src/**/*', '!src/assets/images/*'])
	.pipe(preprocess({
		context: {DEST: 'chrome'}
	}))
	.pipe(gulp.dest('build/chrome'))

	//Add images without preprocess them
	gulp.src('src/assets/images/*')
	.pipe(gulp.dest('build/chrome/assets/images'))

	//Add manifest chrome version
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