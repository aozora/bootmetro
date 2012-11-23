/* ==========================================================
 * bootpanorama-panorama.js v1.0
 * http://aozora.github.com/bootpanorama/
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

   var Panorama = function (element, options) {
      this.$element = $(element)
      this.options = options
//      this.options.slide && this.slide(this.options.slide)
      this.init()
   }

   Panorama.prototype = {

      init: function(){

         // arrange the section container
         var totalWidth = 0;
         $(".panorama-sections .panorama-section").each(function(index, el){
            totalWidth += $(el).outerWidth(true);
         });
         $(".panorama-sections").width(totalWidth);

         // init nicescroll plugin
         if (this.options.nicescroll){
            var nicesx = this.$element.niceScroll(".panorama .panorama-sections",
               {
                  touchbehavior: true, //Modernizr.touch,
                  cursorcolor: "#FF00FF",
                  cursoropacitymax: 0.6,
                  cursorwidth: 24,
                  usetransition: true,
                  hwacceleration: true,
                  autohidemode: "hidden"
               });

            $("#panorama-scroll-prev").click(function(e){
               $("#hub").scrollLeft(-100);
            });
            $("#panorama-scroll-next").click(function(e){
               $("#hub").scrollLeft(100);
            });
         }

      }

      , next: function () {
//         if (this.sliding) return
//         return this.slide('next')
      }

      , prev: function () {
//         if (this.sliding) return
//         return this.slide('prev')
      }


   }


   /* PIVOT PLUGIN DEFINITION
    * ========================== */

   $.fn.panorama = function (option) {
      return this.each(function () {
         var $this = $(this)
            , data = $this.data('panorama')
            , options = $.extend({}, $.fn.panorama.defaults, typeof option == 'object' && option)
            , action = typeof option == 'string' ? option : options.slide
         if (!data) $this.data('panorama', (data = new Panorama(this, options)))
//         if (typeof option == 'number') data.to(option)
         else if (action) data[action]()
      })
   }

   $.fn.panorama.defaults = {
      nicescroll: true,
      showscrollbuttons: true
   }

   $.fn.panorama.Constructor = Panorama

//   $('.panorama .panorama-headers > a').click(function(e){
//      e.preventDefault()
//
//      var $this = $(this), href
//         , $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
//         , $to = parseInt($this.attr('data-to'));
//      $target.panorama($to)
//   })

}(window.jQuery);

//
//
//
//
//(function ($) {
//   $.fn.panorama = function () {
//      // arrange the section container
//      var totalWidth = 0;
//      $(".panorama-sections .panorama-section").each(function(index, el){
//         totalWidth += $(el).outerWidth(true);
//      });
//      $(".panorama-sections").width(totalWidth);
//
//      // init nicescroll plugin
//      var nicesx = $("#hub").niceScroll("#hub .panorama-sections",
//                                                   {
//                                                      touchbehavior: true, //Modernizr.touch,
//                                                      cursorcolor: "#FF00FF",
//                                                      cursoropacitymax: 0.6,
//                                                      cursorwidth: 24,
//                                                      usetransition: true,
//                                                      hwacceleration: true,
//                                                      autohidemode: "hidden"
//                                                   });
//      // $("#hub").scrollLeft(-100);
//
//      $("#tiles-scroll-prev").click(function(e){
//         $("#hub").scrollLeft(-100);
//      });
//      $("#tiles-scroll-next").click(function(e){
//         $("#hub").scrollLeft(100);
//      });
//
//      // if the tiles viewport is wider than the screen than shows the arrow buttons
//      //if ( $(".panorama").width() < totalWidth ){
//      //   $("#tiles-scroll-prev").show();
//      //   $("#tiles-scroll-next").show();
//      //}
//
//
////      // Selectable
////      var selectables = $(".selectable");
////      $.each(selectables, function (i, e) {
////         var el = $(this);
////         var items = el.children(".panorama-image, .panorama-image-overlay, .panorama-icon-text, .panorama-image-text");
////         items.bind("click", function () {
////            if ($(this).hasClass("disabled")) return;
////            $(this).toggleClass("selected");
////         })
////      })
//
//
//   }
//})(jQuery);