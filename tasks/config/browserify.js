module.exports = function(grunt) {

  grunt.config.set('browserify', {
    react: {
      options: {
        transform:  [ require('grunt-react').browserify ],
        debug: true,
        watch: true
      },
      files: [{
        expand: true,
        cwd: 'assets/',
        src: ['**/*.jsx'],
        dest: '.tmp/public/',
        ext: '.js'
      }]
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
};

