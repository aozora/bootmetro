/*!
 * jQuery Charms Plugin
 * Original author: @aozora
 * Licensed under the MIT license
 */

;
(function($, window, document, undefined){

   // undefined is used here as the undefined global
   // variable in ECMAScript 3 and is mutable (i.e. it can
   // be changed by someone else). undefined isn't really
   // being passed in so we can ensure that its value is
   // truly undefined. In ES5, undefined can no longer be
   // modified.

   // window and document are passed through as local
   // variables rather than as globals, because this (slightly)
   // quickens the resolution process and can be more
   // efficiently minified (especially when both are
   // regularly referenced in your plugin).

   // Create the defaults once
   var pluginName = 'charms',
       defaults = {
          width: '320px',
          animateDuration: 600
       };

   // The actual plugin constructor

   function Charms(element, options){
      this.element = element;

      // jQuery has an extend method that merges the
      // contents of two or more objects, storing the
      // result in the first object. The first object
      // is generally empty because we don't want to alter
      // the default options for future instances of the plugin
      this.options = $.extend({ }, defaults, options);

      this._defaults = defaults;
      this._name = pluginName;

      this.init();
   }

   Charms.prototype = {
      init: function(){
         // Place initialization logic here
         // You already have access to the DOM element and
         // the options via the instance, e.g. this.element
         // and this.options
         // you can add more functions like the one below and 
         // call them like so: this.yourotherfunction(this.element, this.options).
      },

      showSection: function(sectionId, width){
         var w = this.options.width;

         if (width != undefined)
            w = width;
         
         var transition = $.support.transition && $(this.element).hasClass('slide');

         if (transition) {
            $(this.element).eq(0).offsetWidth; // force reflow
         }

         $(this.element).addClass('in');

         return false;
      },

      close: function(){
         $(this.element).removeClass('in');
         return false;
      }//,
//
//      togglePin: function () {
//         var isPinned = $.cookie('charms_pinned');
//
//         if (isPinned == null)
//         {
//            // pin
//            $.cookie('charms_pinned', 'true');
//            $.cookie('charms_width', $(this.element).width() );
//            $("a#pin-charms").addClass("active");
//         }
//         else
//         {
//            // unpin
//            $.cookie('charms_pinned', null);
//            $.cookie('charms_width', null );
//            $("a#pin-charms").removeClass("active");
//         }
//      }
      
   };


   // A really lightweight plugin wrapper around the constructor, 
   // preventing against multiple instantiations and allowing any
   // public function (ie. a function whose name doesn't start
   // with an underscore) to be called via the jQuery plugin,
   // e.g. $(element).defaultPluginName('functionName', arg1, arg2)
   $.fn[pluginName] = function(options){
      var args = arguments;
      if (options === undefined || typeof options === 'object')
      {
         return this.each(function(){
            if (!$.data(this, 'plugin_' + pluginName))
            {
               $.data(this, 'plugin_' + pluginName, new Charms(this, options));
            }
         });
      } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init')
      {
         return this.each(function(){
            var instance = $.data(this, 'plugin_' + pluginName);
            if (instance instanceof Charms && typeof instance[options] === 'function')
            {
               instance[options].apply(instance, Array.prototype.slice.call(args, 1));
            }
         });
      }
   };

})(jQuery, window, document);


(function ($)
{
   $("#charms").charms();
   
   $('.close-charms').click(function(e){
      e.preventDefault();
      $("#charms").charms('close');
   });

   /*$("a#pin-charms").click(function () {
      $(this)
      $("#charms").charms('togglePin');
   });*/


})(jQuery);
