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
                 //__dirname + '/../templates/docs',
                 __dirname + '/../templates/pages']


var layout, pages, sidebar, partial_docssidebar, partial_loggeduser, partial_charms, partial_headermenu


// retrieve partials
partial_loggeduser = fs.readFileSync(__dirname + '/../templates/partials/logged-user.mustache', 'utf-8')
partial_loggeduser = hogan.compile(partial_loggeduser, { sectionTags:[
   {o:'_i', c:'i'}
] })

partial_charms = fs.readFileSync(__dirname + '/../templates/partials/charms.mustache', 'utf-8')
partial_charms = hogan.compile(partial_charms, { sectionTags:[
   {o:'_i', c:'i'}
] })

partial_headermenu = fs.readFileSync(__dirname + '/../templates/partials/header-menu.mustache', 'utf-8')
partial_headermenu = hogan.compile(partial_headermenu, { sectionTags:[
   {o:'_i', c:'i'}
] })

partial_docssidebar = fs.readFileSync(__dirname + '/../templates/partials/docs-sidebar.mustache', 'utf-8')
partial_docssidebar = hogan.compile(partial_docssidebar, { sectionTags:[
   {o:'_i', c:'i'}
] })






// cycle for each template dir (pages / demo)
templates.forEach(function(templatedir){

   // compile layout template
   layout = fs.readFileSync(templatedir + '/_layout.mustache', 'utf-8')
   layout = hogan.compile(layout)

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

      var page = fs.readFileSync(templatedir + '/' + name, 'utf-8')
         ,context = {}

      context[name.replace(/\.mustache$/, '')] = 'active'
      context._i = true
      context.production = prod
      context.appname = appname
      context.title = name.replace(/\.mustache/, '')
                          .replace(/\-.*/, '')
                          .replace(/(.)/, function ($1) {
                              return $1.toUpperCase()
                           })

      page = hogan.compile(page, { sectionTags:[ {o:'_i', c:'i'} ] })

      page = layout.render(context, {
         body: page,
         charms: partial_charms,
         loggeduser: partial_loggeduser,
         headermenu: partial_headermenu
      })


      var destinationPath
      if ( templatedir.match(/pages$/) ){
         destinationPath = __dirname + '/../';
      } else if ( templatedir.match(/docs$/) ){
         destinationPath = __dirname + '/../docs/'
      } else {
         // demo & docs
         destinationPath = __dirname + '/../demo/'
      }

      var fullDestinationPath = destinationPath + name.replace(/mustache$/, 'html');
      console.log('building ' + fullDestinationPath)

      fs.writeFileSync(fullDestinationPath, page, 'utf-8')
   })

})




// Build DOCS
// =============================================================
console.log('\n\nCompiling Docs')
console.log('\n\n==============')

// retrieve pages
var docTemplateDir = __dirname + '/../templates/docs'
docs = fs.readdirSync(docTemplateDir)

// compile layout template
var doc_layout = fs.readFileSync(docTemplateDir + '/_layout.mustache', 'utf-8')
doc_layout = hogan.compile(doc_layout)

//var sub_pages = {}
var doc_context = {}

// get an array of doc pages as partials
docs.forEach(function (name) {

   // exclude non mustache files
   if (!name.match(/\.mustache$/))
      return

   // exclude _layout & index
   if (name.match(/^_layout/) || name.match(/^index/))
      return

   var doc = fs.readFileSync(docTemplateDir + '/' + name, 'utf-8')
   doc = hogan.compile(doc, { sectionTags:[ {o:'_i', c:'i'} ] })

   // sub_pages.push(jsonDoc)
   doc_context[name.replace(/\.mustache$/, '')] = doc

   console.log('compiled doc page ' + name)
})

console.dir(doc_context)
// var keys = Object.keys(sub_pages);
// keys.forEach(function(key) {
//   var doc = Object.keys(sub_pages[key]);
// });

//doc_context[name.replace(/\.mustache$/, '')] = 'active'
doc_context._i = true
doc_context.production = prod
doc_context.appname = appname
// doc_context.title = name.replace(/\.mustache/, '')
//                     .replace(/\-.*/, '')
//                     .replace(/(.)/, function ($1) {
//                         return $1.toUpperCase()
//                      })

var doc_index = fs.readFileSync(docTemplateDir + '/index.mustache', 'utf-8')
doc_index = hogan.compile(doc_index, { sectionTags:[ {o:'_i', c:'i'} ] })

doc_index = doc_layout.render(doc_context, {
   body: doc_index,
   docssidebar: partial_docssidebar
})

fs.writeFileSync(__dirname + '/../docs/index.html', doc_index, 'utf-8')










// compile LESS styles
// =============================================================
var lessdir = __dirname  + '/../less'
   ,lesspath = path.join(lessdir, '/bootmetro/bootmetro.less')
   ,cssdir = __dirname  + '/../content/css'
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


