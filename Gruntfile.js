module.exports = function (grunt) {
  var pkg = grunt.file.readJSON('package.json');

  grunt.log.ok('Started to compile at ' + new Date().toLocaleTimeString());

  grunt.initConfig({
    less: {
      css: {
        options: pkg.css.options,
        files: pkg.css.files
      }
    },
    watch: pkg.watch,
    concat: {
      options: pkg.js.options,
      dist: {
        src: pkg.js.src,
        dest: pkg.js.dest,
      },
    },
    uglify: {
      options: pkg.js.uglify.options,
      dist: {
        files: pkg.js.uglify.files
      }
    },
    copy: {
      main: {
        ...pkg.copy.main,
        options: {
          process: function (content, _) {
            return content.replace(/\.\.\/src\/|\.\.\/dist\//gi, "./dist/");
          },
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['compile-css', 'concat-js', 'uglify-js', 'copy', 'watch']);
  grunt.registerTask('compile-css', ['less:css']);
  grunt.registerTask('concat-js', ['concat:dist']);
  grunt.registerTask('uglify-js', ['uglify:dist']);

};
