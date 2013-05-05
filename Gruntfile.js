module.exports = function(grunt) {

   // - jshint js
   // - compile less with recess
   // - copy font, *.less, *.js to \dist
   // - uglify js
   // - copy js to \dist
   // - compile docs, demos
   // - compile gh_pages


   // dist folder: css, font, js
   // docs folder: all
   // gh_pages

   grunt.loadNpmTasks('grunt-contrib-clean');
//   grunt.loadNpmTasks('grunt-contrib-watch');
   grunt.loadNpmTasks('grunt-contrib-concat');
   grunt.loadNpmTasks('grunt-contrib-copy');
   grunt.loadNpmTasks('grunt-contrib-jshint');
   grunt.loadNpmTasks('grunt-contrib-uglify');


   // Project configuration.
   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

//      clean: ["path/to/dir/one", "path/to/dir/two"],
      clean: {
        build: {
          src: ['dist', 'docs']
        }
      },

//      concat: {
//         dist: {
//            options: {
//               banner: '<%= meta.modules %>\n'
//            },
//            src: [], //src filled in by build task
//            dest: '<%= dist %>/<%= filename %>-<%= pkg.version %>.js'
//         },
//         dist_tpls: {
//            options: {
//               banner: '<%= meta.all %>\n<%= meta.tplmodules %>\n'
//            },
//            src: [], //src filled in by build task
//            dest: '<%= dist %>/<%= filename %>-tpls-<%= pkg.version %>.js'
//         }
//      },
//
//
//
//      uglify: {
//         options: {
//            banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
//         },
//         build: {
//            src: 'src/<%= pkg.name %>.js',
//            dest: 'build/<%= pkg.name %>.min.js'
//         }
//      },
//
//      copy: {
//         main: {
//            files: [
//               {src: ['path/*'], dest: 'dest/', filter: 'isFile'}, // includes files in path
//               {src: ['path/**'], dest: 'dest/'}, // includes files in path and its subdirs
//               {expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'}, // makes all src relative to cwd
//               {expand: true, flatten: true, src: ['path/**'], dest: 'dest/', filter: 'isFile'} // flattens results to a single level
//            ]
//         }
//      },
//
//      recess: {
//         dist: {
//            options: {
//               compile: true,
//               compress: false
//            },
//            files: {
//               'dist/combined.css': [
//                  'src/main.css',
//                  'src/component.css'
//               ]
//            }
//         }
//      },

      jshint: {
         files: ['Gruntfile.js','src/assets/js/bootmetro-*.js'],
         options: {
//            curly: true,
//            immed: true,
//            newcap: true,
//            noarg: true,
//            sub: true,

            validthis: true,
            laxcomma : true,
            laxbreak : true,
            browser  : true,
            eqnull   : true,
            debug    : true,
            devel    : true,
            boss     : true,
            expr     : true,
            asi      : true

//            ,globals: {
//               angular: true
//            }
         }
      }


   });




   // Default task(s).
   grunt.registerTask('default', ['prep', 'clean', 'jshint']);



   grunt.registerTask('prep', 'Prepare dist & docs directory', function() {

      try {

         if (!grunt.file.exists(__dirname +  '/dist')){
            grunt.file.mkdir(__dirname +  '/dist', '0777');
            grunt.log.writeln('   created dir "dist"')
         }

         if (!grunt.file.exists(__dirname +  '/docs')){
            grunt.file.mkdir(__dirname +  '/docs', '0777');
            grunt.log.writeln('   created dir "docs"')
         }

//         grunt.log.writeln('__dirname: ' + __dirname)

//         grunt.file.recurse(__dirname +  '/dist', function callback(abspath, rootdir, subdir, filename) {
//           // The full path to the current file, which is nothing more than
//           // the rootdir + subdir + filename arguments, joined.
//           grunt.log.writeln('abspath: ' + abspath)
//           // The root director, as originally specified.
//           grunt.log.writeln('rootdir: ' + rootdir)
//           // The current file's directory, relative to rootdir.
//           grunt.log.writeln('subdir: ' + subdir)
//           // The filename of the current file, without any directory parts.
//           grunt.log.writeln('filename: ' + filename)
//         })



         return grunt.log.ok();

      } catch (e) {
         grunt.log.error();
         grunt.verbose.error(e);
         return grunt.fail.warn('Mkdir operation failed.');
      }

   });




};