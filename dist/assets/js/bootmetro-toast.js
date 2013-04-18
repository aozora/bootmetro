/* ==========================================================
 * bootstrap-toast.js v0.7
 * http://aozora.github.com/bootmetro/
 * ==========================================================
 * Copyright 2013 Marcello Palmitessa
 * ========================================================== */



!function ($) {

   "use strict"; // jshint ;_;


   /* ALERT CLASS DEFINITION
    * ====================== */

   var dismiss = '[data-dismiss="toast"]'
      , Toast = function (el) {
         $(el).on('click', dismiss, this.close)
      }

   Toast.prototype.close = function (e) {
      var $this = $(this)
         , selector = $this.attr('data-target')
         , $parent

      if (!selector) {
         selector = $this.attr('href')
         selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
      }

      $parent = $(selector)

      e && e.preventDefault()

      $parent.length || ($parent = $this.hasClass('toast') ? $this : $this.parent())

      $parent.trigger(e = $.Event('close'))

      if (e.isDefaultPrevented()) return

      $parent.removeClass('in')

      function removeElement() {
         $parent
            .trigger('closed')
            .remove()
      }

      $.support.transition && $parent.hasClass('fade') ?
         $parent.on($.support.transition.end, removeElement) :
         removeElement()
   }


   /* TOAST PLUGIN DEFINITION
    * ======================= */

   var old = $.fn.toast

   $.fn.toast = function (option) {
      return this.each(function () {
         var $this = $(this)
            , data = $this.data('toast')
         if (!data) $this.data('toast', (data = new Toast(this)))
         if (typeof option == 'string') data[option].call($this)
      })
   }

   $.fn.toast.Constructor = Toast


   /* ALERT NO CONFLICT
    * ================= */

   $.fn.toast.noConflict = function () {
      $.fn.toast = old
      return this
   }


   /* ALERT DATA-API
    * ============== */

   $(document).on('click.toast.data-api', dismiss, Toast.prototype.close)

}(window.jQuery);