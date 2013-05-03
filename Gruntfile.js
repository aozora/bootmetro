module.exports = function(grunt) {

   // - jshint js
   // - compile less with recess
   // - copy font, *.less, *.js to \dist
   // - uglify js
   // - copy js to \dist
   // - compile docs, demos
   // - compile gh_pages




   // Project configuration.
   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      uglify: {
         options: {
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
         },
         build: {
            src: 'src/<%= pkg.name %>.js',
            dest: 'build/<%= pkg.name %>.min.js'
         }
      },

      copy: {
         main: {
            files: [
               {src: ['path/*'], dest: 'dest/', filter: 'isFile'}, // includes files in path
               {src: ['path/**'], dest: 'dest/'}, // includes files in path and its subdirs
               {expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'}, // makes all src relative to cwd
               {expand: true, flatten: true, src: ['path/**'], dest: 'dest/', filter: 'isFile'} // flattens results to a single level
            ]
         }
      },

      recess: {
         dist: {
            options: {
               compile: true,
               compress: false
            },
            files: {
               'dist/combined.css': [
                  'src/main.css',
                  'src/component.css'
               ]
            }
         }
      }



   });


   grunt.loadNpmTasks('grunt-contrib-copy');
   grunt.loadNpmTasks('grunt-contrib-uglify');

   // Default task(s).
   grunt.registerTask('default', ['uglify']);

};