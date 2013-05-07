// Nodejs libs.
var fs = require('fs')
   ,path = require('path')
   ,hogan = require('hogan.js');


var partial_loggeduser, partial_charms, partial_headermenu;

// retrieve partials
partial_loggeduser = getCompiledFile(__dirname + '/../templates/partials/logged-user.mustache');
partial_charms = getCompiledFile(__dirname + '/../templates/partials/charms.mustache');
partial_headermenu = getCompiledFile(__dirname + '/../templates/partials/header-menu.mustache');



function getCompiledFile(path){
   //console.log('getCompiledFile(\'' + path + '\')')
   layout = fs.readFileSync(path, 'utf-8')
   layout = hogan.compile(layout, { sectionTags:[ {o:'_i', c:'i'} ] })
   return layout;
}


module.exports = function(templatePaths, destinationPath){


   // cycle for each template dir (pages / demo)
   templatePaths.forEach(function(templatedir){

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
         context.production = prod
         context.appname = appname
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


//         var destinationPath
         if ( templatedir.match(/pages$/) ){
            destinationPath = __dirname + dest;
         } else {
            // demo & docs
            destinationPath = __dirname + dest + 'demo-'
         }

         var fullDestinationPath = destinationPath + name.replace(/mustache$/, 'html');
         console.log('building ' + fullDestinationPath)

         fs.writeFileSync(fullDestinationPath, page, 'utf-8')
      })

   })


};