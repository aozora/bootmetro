module.exports = function(grunt) {

   // Nodejs libs.
   var fs = require('fs');
   var path = require('path');

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
   grunt.loadNpmTasks('grunt-recess');


   // Project configuration.
   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      clean: ['dist', 'docs'],


      jshint: {
         files: ['Gruntfile.js','src/assets/js/bootmetro-*.js'],
         options: {
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
         }
      },


      recess: {
         dist: {
            options: {
               compile: true,
               compress: false
            },
            files: {
               'dist/css/bootmetro.css': ['less/bootmetro/bootmetro.less'],
               'dist/css/bootmetro-responsive.css': ['less/bootmetro/responsive.less'],
               'dist/css/bootmetro-icons.css': ['less/bootmetro/bootmetro-icons.less'],
               'dist/css/bootmetro-ui-light.css': ['less/bootmetro/bootmetro-ui-light.less']
            }
         },
         min: {
            options: {
               compile: true,
               compress: true
            },
            files: {
               'dist/css/min/bootmetro.min.css': ['less/bootmetro/bootmetro.less'],
               'dist/css/min/bootmetro-responsive.min.css': ['less/bootmetro/responsive.less'],
               'dist/css/min/bootmetro-icons.min.css': ['less/bootmetro/bootmetro-icons.less'],
               'dist/css/min/bootmetro-ui-light.min.css': ['less/bootmetro/bootmetro-ui-light.less']
            }
         }

      },


      uglify: {
         dist: {
            options: {
               banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            files: {
               'dist/js/min/bootmetro-charms.min.js':      ['src/assets/js/bootmetro-charms.js'],
               'dist/js/min/bootmetro-icons-ie7.min.js':   ['src/assets/js/bootmetro-icons-ie7.js'],
               'dist/js/min/bootmetro-panorama.min.js':    ['src/assets/js/bootmetro-panorama.js'],
               'dist/js/min/bootmetro-pivot.min.js':       ['src/assets/js/bootmetro-pivot.js']
            }
         },
         min: {
            options: {
               banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
               src: 'src/assets/js/<%= pkg.name %>-*.js',
               dest: 'dist/js/min/<%= pkg.name %>.min.js'
            }
         }
      },


      concat: {
         dist: {
//            options: {
//               banner: '<%= meta.modules %>\n'
//            },
            src: [], //src filled in by build task
            dest: '<%= dist %>/<%= filename %>-<%= pkg.version %>.js'
         },
         dist_tpls: {
            options: {
               banner: '<%= meta.all %>\n<%= meta.tplmodules %>\n'
            },
            src: [], //src filled in by build task
            dest: '<%= dist %>/<%= filename %>-tpls-<%= pkg.version %>.js'
         }
      },


      copy: {
         js: {
            files: [
               {expand: true, cwd: 'src/assets/js/', src: ['<%= pkg.name %>-*.js'], dest: 'dist/js/', filter: 'isFile'} // includes bootstrap js
            ]
         },
         vendor: {
            files: [
               {expand: true, cwd: 'src/assets/js/', src: ['bootstrap-*.js'], dest: 'dist/js/', filter: 'isFile'}, // includes bootstrap js
               {expand: true, cwd: 'src/assets/js/', src: ['jquery.touchSwipe.*'], dest: 'dist/js/', filter: 'isFile'}, // includes touchSwipe js
               {expand: true, cwd: 'src/assets/js/', src: ['jquery-1.8.3.*'], dest: 'dist/js/', filter: 'isFile'}, // includes touchSwipe js
               {expand: true, cwd: 'src/assets/js/', src: ['modernizr-2.6.2.min.js'], dest: 'dist/js/', filter: 'isFile'}, // includes touchSwipe js
               {expand: true, cwd: 'src/assets/js/', src: ['jquery.mousewheel.*'], dest: 'dist/js/', filter: 'isFile'} // includes touchSwipe js
            ]
         }
      }



   });




   // Default task(s).
   grunt.registerTask('default', ['clean', 'jshint', 'recess:dist', 'recess:min', 'uglify:dist', 'uglify:min', 'copy:js', 'copy:vendor']);



//   grunt.registerTask('prep', 'Prepare dist & docs directory', function() {
//
//      try {
//
//         if (!grunt.file.exists(__dirname +  '/dist')){
////            grunt.file.mkdir(__dirname +  '/dist', '0777')
//            fs.mkdirSync(__dirname +  '/dist', '0777')
//            grunt.log.writeln('   created dir "dist"')
//         }
//
//         if (!grunt.file.exists(__dirname +  '/docs')){
//            grunt.file.mkdir(__dirname +  '/docs', '0777')
//            grunt.log.writeln('   created dir "docs"')
//         }
//
////         grunt.log.writeln('__dirname: ' + __dirname)
//
//         return grunt.log.ok();
//
//      } catch (e) {
//         grunt.log.error();
//         grunt.verbose.error(e);
//         return grunt.fail.warn('Mkdir operation failed.');
//      }
//
//   });




};