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

      this.$groups = $('.panorama-sections .panorama-section')
      this.$current = 0

      this.init()
   }

   Panorama.prototype = {

      init: function(){
         var $this = this
         // arrange the section container
         var totalWidth = 0
         $('.panorama-sections .panorama-section').each(function(index, el){
            totalWidth += $(el).outerWidth(true)
         });
         $('.panorama-sections').width(totalWidth)


         if (!this.options.showscrollbuttons){
            $('#panorama-scroll-prev').hide()
            $('#panorama-scroll-next').hide()
         }

         // init nicescroll plugin
         if (this.options.parallax){
            // add a class to enable css3 transition
            $('body').addClass("panorama-parallax");
         }

         if (this.options.showscrollbuttons){
            var $p = $('.panorama-sections');

            $('#panorama-scroll-prev').click(function(e){
               e.preventDefault();
               $this.prev()
            });

            $("#panorama-scroll-next").click(function(e){
               e.preventDefault();
               $this.next()
            });
         }

         //Enable swiping...
         $(".panorama").swipe( {
            //Generic swipe handler for all directions
            swipe:function(event, direction, distance, duration, fingerCount) {
               if (direction=='right'){
                  $this.prev()
               }
               if (direction=='left'){
                  $this.next()
               }
            }//,
            //threshold: 0,
            //ingers: 'all'
         });

         $this.setButtons()


         if (this.options.keyboard){
            $(document).on('keyup', function ( e ) {
               if (e.which == 37) // left-arrow
                  $this.prev()

               if (e.which == 39) // right-arrow
                  $this.next()
            })
         }

      } // end init

      , next: function () {
         var $this = this
         this.$current++
         if (this.$current >= this.$groups.length)
            this.$current = this.$groups.length - 1

         var $p = $('.panorama-sections');
         var targetOffset = $(this.$groups[this.$current]).position().left

         $('body').css('background-position', (targetOffset / 2) + 'px 0px')
//         $this.setParallax(targetOffset)

         $p.animate({ marginLeft: -targetOffset },
            {
               duration: 200,
               easing: 'swing'
               ,complete: function(){$this.setButtons()}
            }
         );

      }

      , prev: function () {
         var $this = this
         this.$current--
         if (this.$current < 0)
            this.$current = 0

         var $p = $('.panorama-sections');
         var targetOffset = $(this.$groups[this.$current]).position().left

         $('body').css('background-position', (targetOffset / 2) + 'px 0px')
//         $this.setParallax(targetOffset)

         $p.animate({
               marginLeft: -targetOffset
            },
            {
               duration: 200,
               easing: 'swing'
               ,complete: function(){$this.setButtons()}
            }
         );

      }

      , setButtons: function () {

         if (!this.options.showscrollbuttons)
            return false;

            if (this.$current === 0)
            $("#panorama-scroll-prev").hide();
         else
            $("#panorama-scroll-prev").show();

         if (this.$current === this.$groups.length - 1)
            $("#panorama-scroll-next").hide();
         else
            $("#panorama-scroll-next").show();
      }

//      , setParallax: function(offset){
//
//         var supportsBackgroundPositionXY = $('<div />', { style: 'background:#fff' }).css('background-position-x') !== undefined;
//
//         if (supportsBackgroundPositionXY) {
//            $('body').stop(true).animate({
//               'background-position-x': (offset / 2) + 'px'
//            }, 200, 'swing')
//         }else
//         {
//            $('body').stop(true).animate({
//               'background-position': (offset / 2) + 'px 0px'
//            }, 200, 'swing')
//         }
//
//      }


   }


   /* PANORAMA PLUGIN DEFINITION
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
      parallax: false,
      showscrollbuttons: true,
      keyboard: true
   }

   $.fn.panorama.Constructor = Panorama

}(window.jQuery);
