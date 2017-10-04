module.exports = function(grunt) {

	/* specify notification for specific modules, for example notify:clean will run notification below */
	grunt.config.set('notify', {
		compileAssets: {
			options: {
				title: 'compileAssets',
				message: 'compileAssets is running'
			}
		},
		linkAssets: {
			options: {
				title: 'linkAssets',
				message: 'linkAssets is running'
			}
		},
		watch: {
			options: {
				title: 'watch',
				message: 'watch is running'
			}
		},
		clean: {
			options: {
				title: 'clean',
				message: 'clean is running'
			}
		},
		jst: {
			options: {
				title: 'jst',
				message: 'jst is running'
			}
		},
		less: {
			options: {
				title: 'less',
				message: 'less is running'
			}
		},
		copy: {
			options: {
				title: 'copy',
				message: 'copy is running'
			}
		},
		coffee: {
			options: {
				title: 'coffee',
				message: 'coffee is running'
			}
		},
		browserify: {
			options: {
				title: 'browserify',
				message: 'browserify is running'
			}
		}

	});

	grunt.config.set('notify_hooks', {
		options: {
			enabled: true,
			success: true,
			title: "medGo",
			duration: 8
		}
	});

	// Load the task
	grunt.loadNpmTasks('grunt-notify');
	grunt.task.run('notify_hooks');
};
