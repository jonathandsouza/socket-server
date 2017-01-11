/* eslint-env node */

'use strict';
(function() {

	module.exports = function(grunt) {

		// Load grunt tasks automatically
		require('load-grunt-tasks')(grunt);

		// Time how long tasks take. Can help when optimizing build times
		require('time-grunt')(grunt);

		// setup environment configuration
		var environment = null;
		if (grunt.file.exists('env.json')) {
			environment = grunt.file.readJSON('env.json');
		}

		// Define the configuration for all the tasks
		grunt.initConfig({

			eslint: {
				src: {
					src: 'app/',
					options: {
						configFile: '.eslintrc'
					}
				}
			},

			execute: {
				target: {
					src: ['index.js']
				}
			},

			json_generator: {

				development: {
					dest: '.tmp/config.json',
					options: environment.development
				},
				production: {
					dest: '.tmp/config.json',
					options: environment.production
				}
			}
		});

		grunt.registerTask('jscodestyle', [
			'eslint:src'
		]);


		grunt.registerTask('config', function() {

			var configTask = 'json_generator:development';

			if (grunt.option('production')) {
				configTask = 'json_generator:production';
			}

			grunt.task.run([configTask]);

		});


	};

})();