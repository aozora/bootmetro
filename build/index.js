//#!/usr/bin/env node
var  hogan = require('hogan.js')
   , less = require('less')
   , recess = require('recess')
   , fs = require('fs')
   , path = require('path')
   , prod = process.argv[2] == 'production'
   , title = 'BootMetro'
   , appname = 'BootMetro'
   , robots_noindex = '<meta name="robots" content="noindex, nofollow">'
   , robots_index = '<meta name="robots" content="index, nofollow">'


var templates = [__dirname + '/../templates/demo',
                 __dirname + '/../templates/pages']


var layout, pages, sidebar, partial_loggeduser, partial_charms, partial_headermenu //, partial_docssidebar


// retrieve partials
partial_loggeduser = getCompiledFile(__dirname + '/../templates/partials/logged-user.mustache')
partial_charms = getCompiledFile(__dirname + '/../templates/partials/charms.mustache')
partial_headermenu = getCompiledFile(__dirname + '/../templates/partials/header-menu.mustache')
//partial_docssidebar = getCompiledFile(__dirname + '/../templates/partials/docs-sidebar.mustache')






// cycle for each template dir (pages / demo)
templates.forEach(function(templatedir){

   // compile layout template
   layout = getCompiledFile(templatedir + '/_layout.mustache')

   // retrieve pages
   pages = fs.readdirSync(templatedir)



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


      var destinationPath
      if ( templatedir.match(/pages$/) ){
         destinationPath = __dirname + '/../dist/';
      } else {
         // demo & docs
         destinationPath = __dirname + '/../dist/demo-'
      }

      var fullDestinationPath = destinationPath + name.replace(/mustache$/, 'html');
      console.log('building ' + fullDestinationPath)

      fs.writeFileSync(fullDestinationPath, page, 'utf-8')
   })

})



//Build DOCS
//=============================================================
console.log('\n\nCompiling Docs')
console.log('\n\n==============')



// retrieve pages
var docTemplateDir = __dirname + '/../templates/docs'
   ,docTemplatePartialDir = docTemplateDir + '/partials'
   ,docTemplateSidebarPartialDir = docTemplateDir + '/sidebar_partials'
   ,partial_sidebar
docPages = fs.readdirSync(docTemplateDir)



//// retrieve doc partials
//var partial_grid = getCompiledFile(docTemplatePartialDir + '/grid.mustache')
//var partial_basecss = getCompiledFile(docTemplatePartialDir + '/basecss.mustache')


// compile layout template
var doc_layout = getCompiledFile(docTemplateDir + '/_layout.mustache')

// put partials into context
var docContext = {}
docContext = getPartialsIntoContext(docContext, docTemplatePartialDir)


// iterate over pages
docPages.forEach(function (name) {

   // check if the current page has scripts definex in partial pages
   var hasSidebarPartial = fs.existsSync(docTemplateSidebarPartialDir + '/sidebar_' + name)
   if (hasSidebarPartial){
      partial_sidebar = getCompiledFile(docTemplateSidebarPartialDir + '/sidebar_' + name)
   }

//   // put partials into context
//   docContext = getPartialsIntoContext(docContext, docTemplatePartialDir)

   docContext[name.replace(/\.mustache$/, '')] = 'active'
   docContext._i = true
   docContext.production = prod
   docContext.appname = appname
   docContext.title = name.replace(/\.mustache/, '')
      .replace(/\-.*/, '')
      .replace(/(.)/, function ($1) {
         return $1.toUpperCase()
      })

   var docPage = getCompiledFile(docTemplateDir + '/' + name)

   docPage = doc_layout.render(docContext, {
      body: docPage,
      sidebar: partial_sidebar /*,
      grid: partial_grid,
      basecss: partial_basecss */
   })


   var destinationPath = __dirname + '/../dist/';

   var fullDestinationPath = destinationPath + name.replace(/mustache$/, 'html');
   console.log('building ' + fullDestinationPath)

   fs.writeFileSync(fullDestinationPath, docPage, 'utf-8')

})

//var doc_context = {}
//
//// get an array of doc pages as partials
//docs.forEach(function (name) {
//
//   // exclude non mustache files
//   if (!name.match(/\.mustache$/))
//      return
//
//   // exclude _layout & index
//   if (name.match(/^_layout/) || name.match(/^index/))
//      return
//
//   var doc = fs.readFileSync(docTemplateDir + '/' + name, 'utf-8')
//   doc = hogan.compile(doc, { sectionTags:[ {o:'_i', c:'i'} ] })
//
//   Object.defineProperty(doc_context, name.replace(/\.mustache$/, ''), {value : doc});
//
//   console.log('compiled doc page ' + name)
//})
//
//
//doc_context._i = true
//doc_context.production = prod
//doc_context.appname = appname
//doc_context.title = appname + ' Documentation'
//
//var doc_index = fs.readFileSync(docTemplateDir + '/index.mustache', 'utf-8')
//doc_index = hogan.compile(doc_index, { sectionTags:[ {o:'_i', c:'i'} ] })
//
//
//doc_context.body = doc_index
//doc_context.docssidebar = partial_docssidebar
//
//
//doc_index = doc_layout.render(doc_context, doc_context)

//fs.writeFileSync(__dirname + '/../dist/docs.html', doc_index, 'utf-8')





// compile LESS styles
// =============================================================
var lessdir = __dirname  + '/../less'
   ,lesspath = path.join(lessdir, '/bootmetro/bootmetro.less')
   ,cssdir = __dirname  + '/../dist/assets/css'
   ,css;

// Compile bootmetro.css
recess([lesspath], {
   compile: true,
   compress: false
}, function (err, obj) {

   console.dir( obj.errors );
   if (err)
      throw err;

   css = obj.output;
   fs.writeFileSync( path.join(cssdir, '/bootmetro.css') , css, 'utf-8');
   console.log('compiled bootmetro.less')
});

// Compile bootmetro-responsive.css
recess([path.join(lessdir, '/bootmetro/responsive.less')], {
   compile: true,
   compress: false
}, function (err, obj) {

   console.dir( obj.errors );
   if (err)
      throw err;

   css = obj.output;
   fs.writeFileSync( path.join(cssdir, '/bootmetro-responsive.css') , css, 'utf-8');
   console.log('compiled bootmetro-responsive.less')
});

// Compile bootmetro-icons.css
recess([path.join(lessdir, '/bootmetro/bootmetro-icons.less')], {
   compile: true,
   compress: false
}, function (err, obj) {

   console.dir( obj.errors );
   if (err)
      throw err;

   css = obj.output;
   fs.writeFileSync( path.join(cssdir, '/bootmetro-icons.css') , css, 'utf-8');
   console.log('compiled bootmetro-icons.less')
});

// Compile bootmetro-ui-light.css
recess([path.join(lessdir, '/bootmetro/bootmetro-ui-light.less')], {
   compile: true,
   compress: false
}, function (err, obj) {

   console.dir( obj.errors );
   if (err)
      throw err;

   css = obj.output;
   fs.writeFileSync( path.join(cssdir, '/bootmetro-ui-light.css') , css, 'utf-8');
   console.log('compiled bootmetro-ui-light.less')
});






function getCompiledFile(path){
   layout = fs.readFileSync(path, 'utf-8')
   layout = hogan.compile(layout, { sectionTags:[ {o:'_i', c:'i'} ] })
   return layout;
}



function getPartialsIntoContext(context, partialsPath){

   var file = fs.readdirSync(partialsPath)

   file.forEach(function(name){

      var partial = getCompiledFile(partialsPath + '/' + name)
      Object.defineProperty(context, name.replace(/\.mustache$/, ''), {value : partial});

   })

   return context
}