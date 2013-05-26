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


      // merge all bootmetro-*.js in bootmetro.js
      concat: {
         dist: {
            options: {
               banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            src: 'src/assets/js/<%= pkg.name %>-*.js',
            dest: 'dist/assets/js/<%= pkg.name %>.js'
         },
         min: {
            options: {
               banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            src: 'src/assets/js/min/<%= pkg.name %>-*.js',
            dest: 'dist/assets/js/min/<%= pkg.name %>.min.js'
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
               {expand: true, cwd: 'src/assets/js/', src: ['bootstrap.js'], dest: 'dist/assets/js/', filter: 'isFile'}, // includes bootstrap js
               {expand: true, cwd: 'src/assets/js/', src: ['bootstrap.min.js'], dest: 'dist/assets/js/min/', filter: 'isFile'}, // includes bootstrap js
               {expand: true, cwd: 'src/assets/js/', src: ['bootstrap-datepicker.js'], dest: 'dist/assets/js/', filter: 'isFile'}, // includes bootstrap js
               {expand: true, cwd: 'src/assets/css/',src: ['datepicker.css'], dest: 'dist/assets/css/', filter: 'isFile'}, // includes bootstrap js
               {expand: true, cwd: 'src/assets/js/', src: ['jquery.touchSwipe.*'], dest: 'dist/assets/js/', filter: 'isFile'}, // includes touchSwipe js
               {expand: true, cwd: 'src/assets/js/', src: ['jquery-1.10.0.*'], dest: 'dist/assets/js/', filter: 'isFile'}, // includes jquery js
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
               {expand: true, cwd: 'dist/', src: 'assets/**/*', dest: '_gh_pages/', filter: 'isFile'},
               {expand: true, cwd: 'src/assets/', src: 'img/**/*', dest: '_gh_pages/assets/', filter: 'isFile'},
               {expand: true, cwd: 'src/assets/css', src: 'demo.css', dest: '_gh_pages/assets/css/', filter: 'isFile'},
               {expand: true, cwd: 'src/assets/css', src: 'docs.css', dest: '_gh_pages/assets/css/', filter: 'isFile'},
               {expand: true, cwd: 'src/assets/css', src: 'site.css', dest: '_gh_pages/assets/css/', filter: 'isFile'},
               {expand: true, cwd: 'src/assets/js/', src: 'google-code-prettify/**/*', dest: '_gh_pages/assets/js/', filter: 'isFile'},
               {expand: true, cwd: 'src/assets/js', src: 'Chart.min.js', dest: '_gh_pages/assets/js/min/', filter: 'isFile'},
               {expand: true, cwd: 'src/assets/js', src: 'holder.js', dest: '_gh_pages/assets/js/', filter: 'isFile'},
               {expand: true, cwd: 'src/assets/js', src: 'docs.js', dest: '_gh_pages/assets/js/', filter: 'isFile'},
               {expand: true, cwd: 'src/assets/js', src: 'demo.js', dest: '_gh_pages/assets/js/', filter: 'isFile'}
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
         demo4ghpages: {
            options: {
               assetsPath: '../'
            },
            src: 'templates/demo/',
            dest: '_gh_pages/demo/'
         },
         demo4dist: {
            options: {
               assetsPath: './'
            },
            src: 'templates/demo/',
            dest: 'dist/demo/'
         }
      },

      builddocs: {
         options: {
            assetsPath: '../'
         },
         dist: {
            src: 'templates/docs/',
            dest: '_gh_pages/docs/'
         }
      } //,


   });




   // Default task(s).
   grunt.registerTask('default',
      [
         'clean',                         // clean folders _gh_pages & dist
         'jshint',                        // run jshint on bootmetro js files
         'recess:dist',                   // generate css from less (not minimized)
         'recess:min',                    // generate css from less (minimized)
         'uglify:dist',                   // minimize js files
         'uglify:min',                    // minimize js files
         'copy:js',                       // copy bootmetro js to dist
         'copy:vendor',                   // copy vendor js to dist
         'copy:font',                     // copy fonts to dist
         'concat:dist',
         'concat:min',
         'buildtemplates:ghpages',        // build main site html to _gh_pages
         'copy:ghpages_assets',           // copy all assets to _gh_pages

         'buildtemplates:demo4ghpages',   // build demo pages to _gh_pages
         'buildtemplates:demo4dist',      // build demo pages to dist
         'builddocs' //,                  // build docs pages to _gh_pages
         //'copy:docs2dist'
      ]
   );



   grunt.registerMultiTask('buildtemplates', 'Build hogan templates into html pages', function(/*templateDirs, destPath*/) {

      try {
         grunt.log.writeln('\nBuilding ' + this.target + '...');

         // merge options with defaults
         var options = this.options({
            assetsPath: './'
         });


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
                  var assetsPath = options.assetsPath
                  //grunt.log.writeln('   assetsPath = ' + assetsPath)
                  context.assetspath = assetsPath


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

         // merge options with defaults
         var options = this.options({
            assetsPath: './'
         });

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
                  var assetsPath = options.assetsPath
                  //grunt.log.writeln('   assetsPath = ' + assetsPath)
                  docContext.assetspath = assetsPath

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