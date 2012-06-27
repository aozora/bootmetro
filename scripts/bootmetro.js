(function ($) {
   $.fn.metro = function () {
      // arrange the section container
      var totalWidth = 0;
      var viewportWidth = $(".metro-sections").parent().width();
      $(".metro-sections .metro-section").each(function(index, el){
         totalWidth += $(el).outerWidth(true);
      });
      $(".metro-sections").width(totalWidth);
      var lastSectionWidth = $(".metro-sections .metro-section").last().outerWidth(true);
      var max = lastSectionWidth - totalWidth;

      // reset the left value
      $(".metro-sections").css('left', 0);

      // setup the horizontal scroll
      $(".metro-sections").mousewheel(function(e, delta) {
         e.preventDefault();

         var $s = $(this);
         var actualLeft = parseInt($s.css('left'));
         var newLeft = actualLeft - (delta * 50);
         //console.log('delta: ' + delta + ' - actualLeft: ' + actualLeft + ' - newLeft: ' + newLeft);      

         if (newLeft <= 0 && newLeft >= max ) 
            $s.css('left', newLeft ); 
      });


      // if the tiles viewport is wider than the screen than shows the arrow buttons
      //if ( $(".metro").width() < totalWidth ){
      //   $("#tiles-scroll-prev").show();
      //   $("#tiles-scroll-next").show();
      //}


      // Selectable
      var selectables = $(".selectable");
      $.each(selectables, function (i, e) {
         var el = $(this);
         var items = el.children(".metro-image, .metro-image-overlay, .metro-icon-text, .metro-image-text");
         items.bind("click", function () {
            if ($(this).hasClass("disabled")) return;
            $(this).toggleClass("selected");
         })
      })

      // Metro-Switchers
      /*var switchers = $(".metro-switch");
      switchers.bind("click", function () {
         var el = $(this);
         if (el.hasClass('disabled') || el.hasClass('static')) return false;
         el.toggleClass("state-on");
      })*/
   }
})(jQuery)