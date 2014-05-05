'use strict';

var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
	return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt){

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Time how long tasks take.
	require('time-grunt')(grunt);

	grunt.initConfig({

		/* ##### SERVER STUFF ##### */

		// Serve the files from grunt's server for now
		// The actual grunt server settings
		connect: {
			options: {
				port: 9000,
				// Change this to '0.0.0.0' to access the server from outside.
				hostname: 'localhost',
				livereload: 35729
			},
			livereload: {
				options: {
					middleware: function (connect) {
						return [
							lrSnippet,
							mountFolder(connect, './prod')
						];
					},
					open: true,
					base: [
						'.tmp',
						'dev/app'
					]
				}
			},
			test: {
				options: {
					port: 9001,
					base: [
						'.tmp',
						'test',
						'dev/app'
					]
				}
			},
			dist: {
				options: {
					base: './prod'
				}
			}
		},


		// Monitor the files and trigger live-reload
		watch: {
			scripts: {
				files: ['dev/app/**/*.js', 'dev/app/Templates/**/*.html'],
				tasks: ['scripts'],
				options: {
					livereload: true
				}
			},
			styles: {
				files: ['dev/scss/**/*.scss'],
				tasks: ['styles'],
				options: {
					livereload: true
				}
			},
			html: {
				files: ['dev/app/index.html','dev/app/Views/**/*.html'],
				tasks: ['html'],
				options: {
					livereload: true
				}
			}
		},


		/* ##### GENERAL STUFF ##### */

		// Empty prod files to start fresh
		clean: {
			//prod stuff is called by the folder name
			css: {
				files: 'prod/css'
			},
			js: {
				files: 'prod/js'
			},
			html: {
				files: [{
					src:['prod/index.html','prod/views']
				}]
			},

			// Temp files are named more general (b/c they can contain more general file stuff).
			scripts: {
				files: [{
					dot: true,
					src: ['.tmp/scripts/','.tmp/templates/']
				}]
			},
			styles: {
				files: [{
					dot: true,
					src: ['.tmp/styles/']
				}]
			},

			// Empty everything
			prod: {
				files: [{
					src:['prod/*']
				}]
			},
			tmp: {
				files: [{
					dot: true,
					src: ['.tmp/']
				}]
			}
		},

		// Copies remaining files to places other tasks can use
		copy: {
			styles: {
				files: [{
					dot: true,
					cwd: '.tmp/styles',
					src: ['**/*.css'],
					dest: 'prod/css',
					expand: true
				}]
			},
			scripts: {
				files: [{
					dot: true,
					cwd: '.tmp/scripts',
					src: ['**/*.js'],
					dest: 'prod/js',
					expand: true

				}]
			},
			views: {
				files: [{
					dot: true,
					cwd: '.tmp/views',
					src: ['**/*.html'],
					dest: 'prod/views',
					ext: '.html',
					expand: true
				}]
			},
			app: {
				files: [{
					dot: true,
					expand: true,
					cwd: '.tmp',
					src: ['*.html'],
					dest: 'prod'
				}]
			},
			bower: {
				files: [{
					src: ['bower_components/angular/angular.min.js'],
					dest: 'prod/js/angular.js'
				},{
					src: ['bower_components/angular-animate/angular-animate.min.js'],
					dest: 'prod/js/angular-animate.js'
				},{
					src: ['bower_components/angular-ui-router/release/angular-ui-router.min.js'],
					dest: 'prod/js/angular-ui-router.min.js'
				},{
					src: ['bower_components/es5-shim/es5-shim.min.js'],
					dest: 'prod/js/es5-shim.js'
				},{
					src: ['bower_components/json3/lib/json3.min.js'],
					dest: 'prod/js/json3.js'
				},{
					src: ['bower_components/hammerjs/hammer.min.js'],
					dest: 'prod/js/hammer.js'
				}]
			},
			assets: {
				files: [{
					cwd: 'dev/assets',
					src: '**/*',
					dest: 'prod/',
					expand: true
				}]
			}
		},


		/* ###### STYLE STUFF  ##### */

		// Compiles Sass to Css
		sass: {
			dist: {
				options:{
					sourcemap: true,
					style: 'expanded', //change to compressed on prod
					precision: 3,
					require: 'susy'
				},
				files: [{
					dot: true,
					src: 'dev/scss/main.scss',
					dest: '.tmp/styles/main.css'
				}]
			}
		},

		// Add vendor prefixed styles
		autoprefixer: {
			prod: {
				options: {
					browsers: ['last 1 version','ie 9','ie 10']
				},
				files: [{
					dot: true,
					src: '.tmp/styles/main.css',
					dest: '.tmp/styles/main.css'
				}]
			}
		},

		// Make sure css code style / performance are good & that there aren't any obvious mistakes
		csslint: {
			target: {
				options: {
					csslintrc: '.csslintrc'
				},
				files: [{
					dot: true,
					src: ['.tmp/styles/main.css']
				}]
			}
		},


		/* ##### JS STUFF ##### */
		// Make sure javascript code style and performance are good and there aren't any obvious mistakes.
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},
			src: ['dev/app/**/*.js']
		},

		// Turn HTML templates into javascript you can auto load into the template cache.
		html2js: {
			common: {
				options: {
					base: '.tmp/',
					module: 'templates.common'
				},
				files: [{
					dot: true,
					src: ['.tmp/templates/**/*.html'],
					dest: '.tmp/scripts/templates/templates.js'
				}]
			}
		},

		// Concatenate all individual .js files into one.
		concat: {
			target: {
				files: [{
					dot: true,
					src: ['dev/app/app.js','dev/app/**/*.js','.tmp/scripts/templates/*.js'],
					dest: '.tmp/scripts/main.js'
				}]
			}
		},

		// Allow the use of non-minsafe AngularJS files. Automatically make it
		// minsafe compatible so minifiers to not destroy the ng-reference
		ngmin: {
			js: {
				files: [{
					dot: true,
					src: '.tmp/scripts/main.js',
					dest: '.tmp/scripts/main.js'
				}]
			}
		},

		// Minify JavaScript
		uglify: {
			main: {
				dot: true,
				src: '.tmp/scripts/main.js',
				dest: '.tmp/scripts/main.js'
			}
		},


		/* #### HTML STUFF #### */

		// Minify Html
		htmlmin: {
			templates: {
				options: {
					removeComments: true,
					removeCommentsFromCDATA: true,
					removeRedundantAttributes: true,
					useShortDoctype: true,
					collapseWhitespace: true
				},
				files: [{
					cwd: 'dev/app/Templates',
					src: ['**/*.html'],
					dest: '.tmp/templates/',
					ext:'.html',
					expand: true
				}]
			},
			views: {
				options: {
					removeComments: true,
					removeCommentsFromCDATA: true,
					removeRedundantAttributes: true,
					useShortDoctype: true,
					collapseWhitespace: true
				},
				files:[{
					dot: true,
					cwd: 'dev/app/Views',
					src: ['**/*.html'],
					dest: '.tmp/views',
					ext: '.html',
					expand: true
				}]
			},
			app: {
				options: {
					removeComments: true,
					removeCommentsFromCDATA: true,
					removeRedundantAttributes: true,
					useShortDoctype: true,
					collapseWhitespace: true
				},
				files: [{
					src: ['dev/app/index.html'],
					dest: '.tmp/index.html'
				}]
			}
		},


		/* ##### TEST STUFF ##### */

		// Test settings
		karma: {
			unit: {
				configFile: 'karma.conf.js',
				singleRun: true
			}
		}
	});

	grunt.registerTask('styles',[
		'clean:styles',
		'sass',
		'autoprefixer',
		'csslint',
		'clean:css',
		'copy:styles',
		'clean:tmp'
	]);

	grunt.registerTask('scripts',[
		'newer:jshint',
		'clean:scripts',
		'htmlmin:templates',
		'html2js',
		'concat',
		'ngmin',
//		'uglify',
		'clean:js',
		'copy:scripts',
		'clean:tmp'
	]);

	grunt.registerTask('html',[
		'clean:html',
		'htmlmin:app',
		'htmlmin:views',
		'copy:app',
		'copy:views'
	]);

	grunt.registerTask('build',[
		'clean:prod',
		'scripts',
		'styles',
		'html',
		'copy:assets',
		'copy:bower',
		'clean:tmp'
	]);

	grunt.registerTask('server',[
		'connect:livereload',
		'watch'
	]);

	grunt.registerTask('default',[
		'build',
		'server'
	]);

	grunt.registerTask('cleanup',[
		'clean:prod',
		'clean:tmp'
	]);
};