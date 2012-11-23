# BootMetro


BootMetro provides simple and flexible HTML, CSS, and Javascript for web apps that wants to use the "Windows 8 MetroUI" style, without the need to run on Windows 8.
It is built on top of Twitter Bootstrap and HTML5 Boilerplate.


## Features
The framework permit to create web applications with the look&feel of the not-yet-released Windows 8 MetroUI style.
Maybe not ideal for internet web sites, the MetroUI style can be adopted for modern intranet web sites.
I've choose to use as base the awesome Twitter Bootstrap framework, applying a set of customizations in pure css (but planning to do it in LESS for future version).


The framework integrate and extend the work first done by other great people:
   - [HTML5 Boilerplate](http://html5boilerplate.com/)
   - [Twitter Bootstrap](http://twitter.github.com/bootstrap)
   - [IcoMoon](http://keyamoon.com/icomoon/#toHome)

Early versions of BootMetro was inspired by the work of Sergey Pimenov for his [Metro UI CSS](http://metroui.org.ua/)

## Versioning

### Latest Release: v1.0
* BREAKING CHANGES:
   * icomoon.css is now bootmetro-icons.css and is recomended to have it before bootmetro.css
   * bootmetro.js is now bootmetro-panorama.js
      * classes in hub.html to use panorama scroll, are changed from metro* to panorama*
* moved bootmetro main css files to LESS
* upgraded to jQuery 1.8.3
* upgraded to Modernizr 2.6.2
* integrated HTML5 Boilerplate 4.0.1
* added metro controls:
   * new panorama
   * new pivot
   * Metro Progress Bars, determinate & indeterminate & ring
   * Metro styled date picker
   * FlipView
   * Toast notifications
* Metro Layouts
* use NiceScroll for Hub scrolling with touch support

## v0.6
* Various bug fixes
* restored correct use of OpenSans web font
* upgraded to use Twitter Bootstrap v2.2.1
* added ListView demo
* added Wizard demo (in progress)
* styled modal dialogs as Metro guidelines for messages and errors/warnings.

## ToDo

* check layout guideline on "Understanding the Windows 8 silhouette"
   * make 2 layout grid: h-scroll + v-scroll
* (almost done) Complete the implementation of the tiles templates (add counter & mini ico)
* demo form page with notifications
* demo image thumbs selectables
* demo charms with docs


## Links

### Official Metro UI Guidelines

* [UX guidelines for Metro style apps](http://msdn.microsoft.com/en-us/library/windows/apps/hh465424)

* [Understanding the Windows 8 silhouette](http://msdn.microsoft.com/en-us/library/windows/apps/hh872191)

* [Navigation design for Metro style apps](http://msdn.microsoft.com/en-us/library/windows/apps/hh761500)

* [Guidelines and checklist for search](http://msdn.microsoft.com/en-us/library/windows/apps/hh465233)

* [Commanding design for Metro style apps](http://msdn.microsoft.com/en-us/library/windows/apps/hh761499)

* [Guidelines and checklist for text and typography](http://msdn.microsoft.com/en-us/library/windows/apps/hh700394)

* [Choosing the right UI surfaces]( http://msdn.microsoft.com/en-us/library/windows/apps/hh465304)

* [Choosing a tile template](http://msdn.microsoft.com/en-us/library/windows/apps/hh761491.aspx)
   
* [Tile image sizes](http://msdn.microsoft.com/en-us/library/windows/apps/hh781198.aspx)

