module.exports = function(grunt) {

   // Nodejs libs.
   var fs = require('fs')
      ,path = require('path')
      ,hogan = require('hogan.js');

   // load tasks
   grunt.loadNpmTasks('grunt-contrib-clean');
   grunt.loadNpmTasks('grunt-contrib-concat');
   grunt.loadNpmTasks('grunt-contrib-copy');
   grunt.loadNpmTasks('grunt-contrib-jshint');
   grunt.loadNpmTasks('grunt-contrib-uglify');
   grunt.loadNpmTasks('grunt-recess');
   grunt.loadNpmTasks('grunt-recess');
//   grunt.loadNpmTasks('grunt-express-server');


   // shared partial templates
   var partial_loggeduser, partial_charms, partial_headermenu;

   // retrieve partials
   partial_loggeduser = getCompiledFile(__dirname + '/templates/partials/logged-user.mustache');
   partial_charms = getCompiledFile(__dirname + '/templates/partials/charms.mustache');
   partial_headermenu = getCompiledFile(__dirname + '/templates/partials/header-menu.mustache');



   // Project configuration.
   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),


      clean: ['dist', 'docs', '_gh_pages'],


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
               'dist/assets/css/bootmetro.css': ['less/bootmetro/bootmetro.less'],
               'dist/assets/css/bootmetro-responsive.css': ['less/bootmetro/responsive.less'],
               'dist/assets/css/bootmetro-icons.css': ['less/bootmetro/bootmetro-icons.less'],
               'dist/assets/css/bootmetro-ui-light.css': ['less/bootmetro/bootmetro-ui-light.less']
            }
         },
         min: {
            options: {
               compile: true,
               compress: true
            },
            files: {
               'dist/assets/css/min/bootmetro.min.css': ['less/bootmetro/bootmetro.less'],
               'dist/assets/css/min/bootmetro-responsive.min.css': ['less/bootmetro/responsive.less'],
               'dist/assets/css/min/bootmetro-icons.min.css': ['less/bootmetro/bootmetro-icons.less'],
               'dist/assets/css/min/bootmetro-ui-light.min.css': ['less/bootmetro/bootmetro-ui-light.less']
            }
         }

      },


      uglify: {
         dist: {
            options: {
               banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            files: {
               'dist/assets/js/min/bootmetro-charms.min.js':      ['src/assets/js/bootmetro-charms.js'],
               'dist/assets/js/min/bootmetro-icons-ie7.min.js':   ['src/assets/js/bootmetro-icons-ie7.js'],
               'dist/assets/js/min/bootmetro-panorama.min.js':    ['src/assets/js/bootmetro-panorama.js'],
               'dist/assets/js/min/bootmetro-pivot.min.js':       ['src/assets/js/bootmetro-pivot.js']
            }
         },
         min: {
            options: {
               banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
               src: 'src/assets/js/<%= pkg.name %>-*.js',
               dest: 'dist/assets/js/min/<%= pkg.name %>.min.js'
            }
         }
      },


      concat: {
         dist: {
            options: {
               banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            src: 'src/assets/js/<%= pkg.name %>-*.js',
            dest: 'dist/assets/js/<%= pkg.name %>.js'
         }
      },


      copy: {
         js: {
            files: [
               {expand: true, cwd: 'src/assets/js/', src: ['<%= pkg.name %>-*.js'], dest: 'dist/assets/js/', filter: 'isFile'} // includes bootstrap js
            ]
         },
         vendor: {
            files: [
               {expand: true, cwd: 'src/assets/js/', src: ['bootstrap-*.js'], dest: 'dist/assets/js/', filter: 'isFile'}, // includes bootstrap js
               {expand: true, cwd: 'src/assets/js/', src: ['jquery.touchSwipe.*'], dest: 'dist/assets/js/', filter: 'isFile'}, // includes touchSwipe js
               {expand: true, cwd: 'src/assets/js/', src: ['jquery-1.8.3.*'], dest: 'dist/assets/js/', filter: 'isFile'}, // includes jquery js
               {expand: true, cwd: 'src/assets/js/', src: ['modernizr-2.6.2.min.js'], dest: 'dist/assets/js/', filter: 'isFile'}, // includes modernizr js
               {expand: true, cwd: 'src/assets/js/', src: ['jquery.mousewheel.*'], dest: 'dist/assets/js/', filter: 'isFile'} // includes mousewheel js
            ]
         },
         font: {
            files: [
               {expand: true, cwd: 'src/assets/font/', src: '**/*', dest: 'dist/assets/font/', filter: 'isFile'}
            ]
         },

         ghpages_assets: {
            files: [
               {expand: true, cwd: 'src/', src: 'assets/**/*', dest: '_gh_pages/'}
            ]
         },
         docs2dist: {
            files: [
               {expand: true, cwd: '_gh_pages/', src: 'docs/**/*', dest: 'dist/'}
            ]
         }

      },


      buildtemplates: {
         ghpages: {
            src: 'templates/pages/',
            dest: '_gh_pages/'
         },
         demo: {
            src: 'templates/demo/',
            dest: 'dist/demo/'
         }
      },

      builddocs: {
         dist: {
            src: 'templates/docs/',
            dest: '_gh_pages/docs/'
         }
      } //,


//      express: {
//         options: {
//            // Override defaults here
//
//            // Override node env's PORT
//            port: 8080,
//
//            // Setting to `false` will effectively just run `node path/to/server.js`
//            background: false,
//
//            // Called if spawning the server fails
//            error: function(err, result, code) {
//               grunt.log.writeln(err);
//            }
//         },
//         dev: {
//            options: {
//               script: 'server/server.js'
//            }
//         }
//      }



   });




   // Default task(s).
   grunt.registerTask('default',
      [
         'clean',
         'jshint',
         'recess:dist',
         'recess:min',
         'uglify:dist',
         'uglify:min',
         'copy:js',
         'copy:vendor',
         'copy:font',
         'concat:dist',
         'buildtemplates:ghpages',
         'copy:ghpages_assets',
         'buildtemplates:demo',
         'builddocs' //,
         //'copy:docs2dist'
      ]
   );



   grunt.registerMultiTask('buildtemplates', 'Build hogan templates into html pages', function(/*templateDirs, destPath*/) {

      try {
         grunt.log.writeln('\nBuilding ' + this.target + '...');

         this.files.forEach(function(f) {

//            grunt.log.writeln('   src = ' + f.src)
//            grunt.log.writeln('   dest = ' + f.dest)

            var destinationPath = __dirname + '/' + f.dest;

            // cycle for each template dir (pages / demo)
            f.src.forEach(function(src){

               var templatedir = __dirname + '/' + src
               grunt.log.writeln('   templatedir = ' + templatedir)

               // compile layout template
               var layout = getCompiledFile(templatedir + '/_layout.mustache')
               // retrieve pages
               var pages = fs.readdirSync(templatedir)


               // iterate over pages
               pages.forEach(function (name) {

                  // exclude non mustache files
                  if (!name.match(/\.mustache$/))
                     return

                  // exclude files that start with "_"
                  if (name.substring(0, 1) == '_')
                     return

                  var context = {}
                  context[name.replace(/\.mustache$/, '')] = 'active'
                  context._i = true
                  context.production = 'production'
                  context.appname = 'BootMetro'
                  context.title = name.replace(/\.mustache/, '')
                                      .replace(/\-.*/, '')
                                      .replace(/(.)/, function ($1) {
                                          return $1.toUpperCase()
                                       })

                  var page = getCompiledFile(templatedir + '/' + name)

                  page = layout.render(context, {
                     body: page,
                     charms: partial_charms,
                     loggeduser: partial_loggeduser,
                     headermenu: partial_headermenu
                  })


//                  if ( templatedir.match(/pages$/) ){
//                     destinationPath = __dirname + dest;
//                  } else {
//                     // demo & docs
//                     destinationPath = __dirname + dest + 'demo-'
//                  }

                  var fullDestinationPath = destinationPath + name.replace(/mustache$/, 'html');
                  grunt.log.writeln('building ' + fullDestinationPath)

                  //fs.writeFileSync(fullDestinationPath, page, 'utf-8')
                  grunt.file.write(fullDestinationPath, page, 'utf-8')
               })

            })

         });

         grunt.log.write('OK\n');
         return grunt.log.ok();

      } catch (e) {
         grunt.log.error();
         grunt.verbose.error(e);
         return grunt.fail.warn('operation failed.');
      }

   });



   grunt.registerMultiTask('builddocs', 'Build documentation html pages', function() {

      try {
         grunt.log.write('\nBuilding docs...');

         this.files.forEach(function(f) {

            var destinationPath = __dirname + '/' + f.dest;

            // cycle for each template dir (pages / demo)
            f.src.forEach(function(src){

               // retrieve pages
               var docTemplateDir = __dirname + '/' + f.src
                  ,docTemplatePartialDir =  __dirname + '/' + f.src + 'partials'
                  ,docTemplateSidebarPartialDir = __dirname + '/' + f.src + 'sidebar_partials'
                  ,partial_sidebar
                  ,docPages = fs.readdirSync(docTemplateDir)

               // compile layout template
               var doc_layout = getCompiledFile(__dirname + '/' + f.src + '/_layout.mustache')

               // iterate over pages
               docPages.forEach(function (name) {

                  // exclude non mustache files
                  if (!name.match(/\.mustache$/))
                     return

                  // exclude _layout & index
                  if (name.match(/^_layout/) || name.match(/^index/))
                     return


                  // check if the current page has scripts definex in partial pages
                  var hasSidebarPartial = fs.existsSync(docTemplateSidebarPartialDir + '/sidebar-' + name)
                  if (hasSidebarPartial){
                     partial_sidebar = getCompiledFile(docTemplateSidebarPartialDir + '/sidebar-' + name)
                  }


                  // put partials into context
                  var docContext = {}
                     ,partialsContext = {}
                     ,files = fs.readdirSync(docTemplatePartialDir)

                  files.forEach(function(name){
                     var partial = getCompiledFile(docTemplatePartialDir + '/' + name)
                     Object.defineProperty(partialsContext, name.replace(/\.mustache$/, ''), {value : partial});
                  })

                  docContext[name.replace(/\.mustache$/, '')] = 'active'
                  docContext._i = true
                  docContext.production = 'production'
                  docContext.appname = 'BootMetro'
                  docContext.title = name.replace(/\.mustache/, '')
                     .replace(/\-.*/, '')
                     .replace(/(.)/, function ($1) {
                        return $1.toUpperCase()
                     })

                  var docPage = getCompiledFile(docTemplateDir + '/' + name)

                  partialsContext.body = docPage
                  partialsContext.sidebar = partial_sidebar

                  docPage = doc_layout.render(docContext, partialsContext)


                  var fullDestinationPath = destinationPath + name.replace(/mustache$/, 'html');
                  grunt.log.writeln('building ' + fullDestinationPath)

                  grunt.file.write(fullDestinationPath, docPage, 'utf-8')
               })

            });

         });


         grunt.log.write('OK\n');
         return grunt.log.ok();

      } catch (e) {
         grunt.log.error();
         grunt.verbose.error(e);
         return grunt.fail.warn('operation failed.');
      }

   });



   function getCompiledFile(path){
      //console.log('getCompiledFile(\'' + path + '\')')
      var layout = fs.readFileSync(path, 'utf-8')
      layout = hogan.compile(layout, { sectionTags:[ {o:'_i', c:'i'} ] })
      return layout;
   }

};