/* ==========================================================
 * bootstrap-pivot.js v2.2.1
 * http://aozora.github.com/bootmetro/
 * ==========================================================
 * Copyright 2012 Marcello Palmitessa
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

   "use strict"; // jshint ;_;


   /* PIVOT CLASS DEFINITION
    * ========================= */

   var Pivot = function (element, options) {
      this.$element = $(element)
      this.options = options
      this.options.slide && this.slide(this.options.slide)
   }

   Pivot.prototype = {

      to: function (pos) {
         var $active = this.$element.find('.pivot-item.active')
            , children = $active.parent().children()
            , activePos = children.index($active)
            , that = this

         if (pos > (children.length - 1) || pos < 0) return

         if (this.sliding) {
            return this.$element.one('slid', function () {
               that.to(pos)
            })
         }

         return this.slide(pos > activePos ? 'next' : 'prev', $(children[pos]))
      }

      , next: function () {
         if (this.sliding) return
         return this.slide('next')
      }

      , prev: function () {
         if (this.sliding) return
         return this.slide('prev')
      }

      , slide: function (type, next) {
         var $active = this.$element.find('.pivot-item.active')
            , $next = next || $active[type]()
            , direction = type == 'next' ? 'left' : 'right'
            , fallback  = type == 'next' ? 'first' : 'last'
            , that = this
            , e

         this.sliding = true

         $next = $next.length ? $next : this.$element.find('.pivot-item')[fallback]()

         e = $.Event('slide', {
            relatedTarget: $next[0]
         })

         if ($next.hasClass('active')) return

         if ($.support.transition && this.$element.hasClass('slide')) {
            this.$element.trigger(e)
            if (e.isDefaultPrevented()) return
            $next.addClass(type)
            $next[0].offsetWidth // force reflow
            $active.addClass(direction)
            $next.addClass(direction)
            this.$element.one($.support.transition.end, function () {
               $next.removeClass([type, direction].join(' ')).addClass('active')
               $active.removeClass(['active', direction].join(' '))
               that.sliding = false
               setTimeout(function () { that.$element.trigger('slid') }, 0)
            })
         } else {
            this.$element.trigger(e)
            if (e.isDefaultPrevented()) return
            $active.removeClass('active')
            $next.addClass('active')
            this.sliding = false
            this.$element.trigger('slid')
         }

         return this
      }

   }


   /* PIVOT PLUGIN DEFINITION
    * ========================== */

   $.fn.pivot = function (option) {
      return this.each(function () {
         var $this = $(this)
            , data = $this.data('pivot')
            , options = $.extend({}, $.fn.pivot.defaults, typeof option == 'object' && option)
            , action = typeof option == 'string' ? option : options.slide
         if (!data) $this.data('pivot', (data = new Pivot(this, options)))
         if (typeof option == 'number') data.to(option)
         else if (action) data[action]()
      })
   }

   $.fn.pivot.defaults = {
//      interval: 5000
      //, pause: 'hover'
   }

   $.fn.pivot.Constructor = Pivot

      $('.pivot .pivot-headers > a').click(function(e){
         e.preventDefault()

         var $this = $(this), href
           , $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
           //, options = $.extend({}, $target.data(), $this.data())
            , $to = parseInt($this.attr('data-to'));
         $target.pivot($to)
      })

//   /* PIVOT DATA-API
//    * ================= */
//
//   $(document).on('click.pivot.data-api', '[data-pivot]', function (e) {
//      var $this = $(this), href
//         , $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
//         , options = $.extend({}, $target.data(), $this.data())
//      $target.pivot(options)
//      e.preventDefault()
//   })

}(window.jQuery);


///*!
// * jQuery Charms Plugin
// * Original author: @aozora
// * Licensed under the MIT license
// */
//
//;
//(function($, window, document, undefined){
//
//   // undefined is used here as the undefined global
//   // variable in ECMAScript 3 and is mutable (i.e. it can
//   // be changed by someone else). undefined isn't really
//   // being passed in so we can ensure that its value is
//   // truly undefined. In ES5, undefined can no longer be
//   // modified.
//
//   // window and document are passed through as local
//   // variables rather than as globals, because this (slightly)
//   // quickens the resolution process and can be more
//   // efficiently minified (especially when both are
//   // regularly referenced in your plugin).
//
//   // Create the defaults once
//   var pluginName = 'pivot',
//       defaults = {
//          animationDuration: 150,
//          headersSelector: '.pivot-headers a',
//          itemsContainer:  '.pivot-items',
//          itemsSelector:   '.pivot-items .pivot-item'
//
//       };
//
//   // The actual plugin constructor
//
//   function Pivot(element, options){
//      this.element = element;
//
//      // jQuery has an extend method that merges the
//      // contents of two or more objects, storing the
//      // result in the first object. The first object
//      // is generally empty because we don't want to alter
//      // the default options for future instances of the plugin
//      this.options = $.extend({ }, defaults, options);
//
//      this._defaults = defaults;
//      this._name = pluginName;
//
//      this.$pivot = $(element);
//      this.$pivotHeaders = this.$pivot.find(this.options.headersSelector);
//      this.$pivotItems = this.$pivot.find(this.options.itemsSelector);
//      this.$pivotItemsContainer = this.$pivot.find(this.options.itemsContainer);
//
//      this.init();
//   }
//
//   Pivot.prototype = {
//      init: function(){
//         // Place initialization logic here
//         // You already have access to the DOM element and
//         // the options via the instance, e.g. this.element
//         // and this.options
//         // you can add more functions like the one below and
//         // call them like so: this.yourotherfunction(this.element, this.options).
//
//         var $this = this;
//
////         // arrange the section container
////         var totalWidth = 0;
////         this.$pivotItems.each(function(index, el){
////            totalWidth += $(el).outerWidth(true);
////         });
////         this.$pivotItemsContainer.width(totalWidth);
//
//
//
//         // select the first item
//         this.$pivotItems.eq(0).addClass('active').show();
//
//         this.$pivotHeaders.click(function(e){
//            e.preventDefault();
//            $this.slide( $(this).attr('href') );
//         });
//
//      },
//
//      slide: function(el){
//
//         if (this.transitioning)
//            return;
//
//         var $this = this;
//         var $item = $(el);
//
//         // exit if the clicked item is already the active one
//         if ($item.hasClass('active'))
//            return;
//
//         var $active = this.$pivot.find('.active')
//            ,$next = $(el)
//            ,that = this
//            ,e;
//
//         this.sliding = true;
//
//         e = $.Event('slide');
//
//
//         if ($.support.transition /* && this.$element.hasClass('active') */ ) {
//            this.$pivot.trigger(e);
//
////            if (e.isDefaultPrevented()) return;
//
//            $next[0].offsetWidth; // force reflow
//            $active.removeClass('active').hide();
//            $next.show().addClass('active');
////            $active.addClass(direction)
////            $next.addClass(direction)
//
//            this.$pivot.one($.support.transition.end, function () {
////               $next.addClass('active');
////               $active.removeClass('active');
//               that.sliding = false;
//               setTimeout(function () { that.$pivot.trigger('slid') }, 0)
//            })
//         } else {
//            this.$pivot.trigger(e);
//
////            if (e.isDefaultPrevented()) return
//            $active.removeClass('active');
//            $next.addClass('active');
//            this.sliding = false;
//            this.$pivot.trigger('slid');
//         }
//
//
//         //         var transition = $.support.transition && $item.hasClass('active');
////
////         if (transition) {
////            that.$element[0].offsetWidth; // force reflow
////         }
////
////
////         // clear active items
////         this.$pivotItems.removeClass('active').hide();
////
////         // move the item to far right and make it visible
////         //$item.css({ marginLeft: $item.outerWidth() }).show().addClass("active");
////         $item.show().addClass("active");
////
////         transition ?
////            $item.one($.support.transition.end, function () { /*$item.focus().trigger('shown')*/ }) :
////            $item.focus().trigger('shown');
////
//////         // animate it to left
//////         $item.animate( { marginLeft: 0 }, $this.options.animationDuration, function() {
//////            //               pivot.currentItemChanged(index);
//////         });
//
//      }
//
//
//   };
//
//
//   // A really lightweight plugin wrapper around the constructor,
//   // preventing against multiple instantiations and allowing any
//   // public function (ie. a function whose name doesn't start
//   // with an underscore) to be called via the jQuery plugin,
//   // e.g. $(element).defaultPluginName('functionName', arg1, arg2)
//   $.fn[pluginName] = function(options){
//      var args = arguments;
//      if (options === undefined || typeof options === 'object')
//      {
//         return this.each(function(){
//            if (!$.data(this, 'plugin_' + pluginName))
//            {
//               $.data(this, 'plugin_' + pluginName, new Pivot(this, options));
//            }
//         });
//      } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init')
//      {
//         return this.each(function(){
//            var instance = $.data(this, 'plugin_' + pluginName);
//            if (instance instanceof Pivot && typeof instance[options] === 'function')
//            {
//               instance[options].apply(instance, Array.prototype.slice.call(args, 1));
//            }
//         });
//      }
//   };
//
//})(jQuery, window, document);
//
////
////(function ($)
////{
////   $("#charms").charms();
////
////   $('.close-charms').click(function(e){
////      e.preventDefault();
////      $("#charms").charms('close');
////   });
////
////   /*$("a#pin-charms").click(function () {
////      $(this)
////      $("#charms").charms('togglePin');
////   });*/
////
////
////})(jQuery);
