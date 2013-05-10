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

   "use strict";


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

      // init panorama workspace
      init: function(){
         var $this = this

         // arrange the panorama height
         this.$element.height( this.$element.parent().height() - $('#nav-bar').outerHeight() )

         // arrange the section container width
         $this.resize();

         // setup mousewheel
         // win8: wheel-down => scroll to right -1 0 -1
         //       wheel-up   => scroll to left   1 0  1
         if (this.options.mousewheel){
            $('.panorama-sections').mousewheel(function(event, delta, deltaX, deltaY) {
               //e.preventDefault();
               //console.log(delta, deltaX, deltaY);
               if (delta > 0){
                  $this.prev()
               }
               else{
                  $this.next()
               }
            });
         }

         // Arrange Tiles like Win8 ones
         if (this.options.arrangetiles){
            $('.panorama-sections .panorama-section').each(function(index, el){




            });
         }


         // parallax can be activated only if there is CSS3 transition support
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
         } else {
            $('#panorama-scroll-prev').hide()
            $('#panorama-scroll-next').hide()
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
            }
            ,threshold: 0
            //ingers: 'all'
         });

         $this.setButtons()


         if (this.options.keyboard){
            $(document).on('keyup', function ( e ) {
               if (e.which == 37) { // left-arrow
                  $this.prev()
               }

               if (e.which == 39) { // right-arrow
                  $this.next()
               }
            })
         }


//         $(window).resize(function() {
//
//            // call resize function
//
//         });

      } // end init

      , next: function () {
         var $this = this
         this.$current++
         if (this.$current >= this.$groups.length){
            this.$current = this.$groups.length - 1
         }

         var $p = $('.panorama-sections');
         var targetOffset = $(this.$groups[this.$current]).position().left


         if (this.options.parallax && $.support.transition){
            $('body').css('background-position', (targetOffset / 2) + 'px 0px')
         }

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
         if (this.$current < 0){
            this.$current = 0
         }

         var $p = $('.panorama-sections');
         var targetOffset = $(this.$groups[this.$current]).position().left

         if (this.options.parallax && $.support.transition){
            $('body').css('background-position', (targetOffset / 2) + 'px 0px')
         }

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

      , resize: function(){
         // arrange the section container width
         var totalWidth = 0
         $('.panorama-sections .panorama-section').each(function(index, el){
            totalWidth += $(el).outerWidth(true)
         });
         $('.panorama-sections')
            .width(totalWidth)
            .height( this.$element.parent().height())

      }

      , setButtons: function () {

         if (!this.options.showscrollbuttons){
            return false;
         }

         if (this.$current === 0){
            $("#panorama-scroll-prev").hide();
         } else {
            $("#panorama-scroll-prev").show();
         }

         if (this.$current === this.$groups.length - 1){
            $("#panorama-scroll-next").hide();
         } else {
            $("#panorama-scroll-next").show();
         }
      }

   }


   /* PANORAMA PLUGIN DEFINITION
    * ========================== */

   $.fn.panorama = function (option) {
      return this.each(function () {
         var $this = $(this)
            , data = $this.data('panorama')
            , options = $.extend({}, $.fn.panorama.defaults, typeof option == 'object' && option)
            , action = typeof option == 'string' ? option : options.slide
         if (!data) {
            $this.data('panorama', (data = new Panorama(this, options)))
         }
//         if (typeof option == 'number') data.to(option)
         else if (action){
            data[action]()
         }

      })
   }

   $.fn.panorama.defaults = {
      showscrollbuttons: true,
      parallax: false,
      keyboard: true,
      mousewheel: true,
      arrangetiles: true
   }

   $.fn.panorama.Constructor = Panorama

}(window.jQuery);
