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


var layout, pages, sidebar, sitemenu, partial_loggeduser, partial_charms, partial_headermenu

// compile layout template
layout = fs.readFileSync(__dirname + '/../templates/layout.mustache', 'utf-8')
layout = hogan.compile(layout, { sectionTags:[
   {o:'_i', c:'i'}
] })


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


// retrieve pages
pages = fs.readdirSync(__dirname + '/../templates/pages')

// iterate over pages
pages.forEach(function (name) {

   if (!name.match(/\.mustache$/)) return

   if (name.substring(0, 1) == '_') return

   var page = fs.readFileSync(__dirname + '/../templates/pages/' + name, 'utf-8')
      , context = {}

   context[name.replace(/\.mustache$/, '')] = 'active'
   context._i = true
   context.production = prod
   context.appname = appname
   context.title = name.replace(/\.mustache/, '')
                       .replace(/\-.*/, '')
                       .replace(/(.)/, function ($1) {
                           return $1.toUpperCase()
                        })

   if (context.title == 'Index') {
      context.title = title
      context.robots = robots_index 
   } else {
      context.title += ' · ' + title
      context.robots = robots_noindex
   }

   page = hogan.compile(page, { sectionTags:[
      {o:'_i', c:'i'}
   ] })

   page = layout.render(context, {
      body:page,
      charms:partial_charms,
      loggeduser:partial_loggeduser,
      headermenu:partial_headermenu
   })

   fs.writeFileSync(__dirname + '/../' + name.replace(/mustache$/, 'html'), page, 'utf-8')
})


// compile LESS styles
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
recess([path.join(lessdir, '/responsive.less')], {
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

//
//// Compile bootmetro-icons-ie7.css
//recess([path.join(lessdir, '/bootmetro/bootmetro-icons-ie7.less')], {
//   compile: true,
//   compress: false
//}, function (err, obj) {
//
//   console.dir( obj.errors );
//   if (err)
//      throw err;
//
//   css = obj.output;
//   fs.writeFileSync( path.join(cssdir, '/bootmetro-icons-ie7.css') , css, 'utf-8');
//   console.log('compiled bootmetro-icons-ie7.less')
//});

