# BootMetro


BootMetro provides simple and flexible HTML, CSS, and Javascript for web apps that wants to use the "Windows 8 MetroUI" style, without the need to run on Windows 8.
It is built on top of Twitter Bootstrap and HTML5 Boilerplate.


## Features
The framework permit to create web applications with the look&feel of Windows 8 "Windows Store App" (ex "MetroUI" style).
Maybe not ideal for internet web sites, the MetroUI style can be adopted for modern intranet web sites.
I've choose to use as base the awesome Twitter Bootstrap framework, applying a set of customizations in pure css.


The framework integrate and extend the work first done by other great people:
   - [HTML5 Boilerplate](http://html5boilerplate.com/)
   - [Twitter Bootstrap](http://twitter.github.com/bootstrap)
   - [IcoMoon](http://keyamoon.com/icomoon/#toHome)

## Build from sources

### Prepare your environment
* Install Node.js and NPM (should come with)
* Install global dev dependencies (Windows users should run it as administrator): npm install -g grunt-cli karma
* Instal local dev dependencies: npm install while current directory is bootmetro repo

### Build
To build the whole project run 'grunt' in the project directory.

## Versioning

<<<<<<< HEAD
### Latest Release: v1.0.0 Alpha1
This release is based on Twitter Bootstrap 2; the v2.0 will be completely redone from scratch using as base Twitter Bootstrap v3.

####BREAKING CHANGES:
- Replaced icomoon font with a new icomoon set generated with PUA. Many icon-* class names has changed;
- internal mapping of char codes has changed, please be patient and check every icon you used.
- the static resources in the content folder has been moved to the assets folder
- toast markup has changed, now it is conforming to the bootstrap media object model.
- listview markup has changed, now it is conforming to the bootstrap media object model.
- removed default padding-top: 24px and padding-bottom: 88px (scaffolding.less)

####List of changes:
- source files now builds with [GruntJS](http://gruntjs.com/)
- bug fixes over v0.6
- New and revamped documentation pages, separated from demo pages, with all metro widgets & customization integrated with the original bootstrap documentation.
- updated Bootstrap Less files to latest v2.3.1
- new Metro Nav List (like the one used in the doc sidebar)
- new Page Header with back button and various styles
- new RTL support for metro checkboxes & radio buttons
- move CSS to LESS and integrate build with Bootstrap
- complete Tiles templates
- Toast notifications
- ListView
- Pivot view (like WP8)
- Dual license GPL2 + Apache2
- Panorama plugin & Hub:
      - new options
      - simplified markup

=======
### Latest Release: v1.0.0 alpha 1
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
>>>>>>> v1.0.0-alpha1-wip

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

## License
BootMetro is dual licensed, GPL-2 and Apache-2; see the LICENSE file.

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

