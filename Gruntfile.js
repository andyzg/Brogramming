module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: ';'
      },
      dist: {
        // the files to concatenate
        src: ['src/**/*.js' ],
        // the location of the resulting JS file
        dest: 'public/<%= pkg.name %>.js'
      }
    },
    jshint: {
      // define the files to lint
      files: ['gruntfile.js', 'src/**/*.js', 'app.js' ],
      // configure JSHint (documented at http://www.jshint.com/docs/)
      options: {
          // more options here if you want to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: [ 'jshint', 'concat', 'express:dev' ]
    },
    express: {
      options: {},
      dev: {
        options: {
          script: 'app.js',
          node_env: 'development',
          port: 3000,
          background: true,
          debug: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-express-server');

  grunt.registerTask('build', ['jshint', 'concat', 'express:dev', 'watch' ]);
  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('default', ['build']);
};
