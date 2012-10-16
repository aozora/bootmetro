$(function(){

   // this is for the appbar-demo page
   if ($("#appbar-theme-select").length){
      $("#appbar-theme-select").change(function(){
         var ui = $(this).val();

         if (ui != '')
            $("footer.win-commandlayout")
               .removeClass("win-ui-light win-ui-dark")
               .addClass(ui);
      });
   }


   // style switcher 
   if ($("#win-theme-select").length){
      $("#win-theme-select").change(function(){
         var css = $(this).val();

         if (css != '')
            updateCSS(css);
      });
   }


   $("#settings").click(function (e) {
      e.preventDefault();
      $('#charms').charms('showSection', 'theme-charms-section');
   });



   // listview demo
   $('#listview-grid-demo').on('click', '.mediumListIconTextItem', function(e){
      e.preventDefault();
      $(this).toggleClass('selected');
   });


   //$('#home-carousel').carousel({interval: 5000});

});



//function to append a new theme stylesheet with the new style changes
function updateCSS(css){

   $("head").append('<link rel="stylesheet" type="text/css" href="content/css/' + css +'.css">');

   if($("link[href*=metro-ui-]").size() > 1){
      $("link[href*=metro-ui-]:first").remove();
   }
   
};



// NOTICE!! DO NOT USE ANY OF THIS JAVASCRIPT
// IT'S ALL JUST JUNK FOR OUR DOCS!
// ++++++++++++++++++++++++++++++++++++++++++

!function ($) {

   $(function(){

      // Disable certain links in docs
      $('section [href^=#]').click(function (e) {
         e.preventDefault()
      })

      // make code pretty
      window.prettyPrint && prettyPrint()

      // add-ons
      $('.add-on :checkbox').on('click', function () {
         var $this = $(this)
            , method = $this.attr('checked') ? 'addClass' : 'removeClass'
         $(this).parents('.add-on')[method]('active')
      })

      // position static twipsies for components page
      if ($(".twipsies a").length) {
         $(window).on('load resize', function () {
            $(".twipsies a").each(function () {
               $(this)
                  .tooltip({
                     placement: $(this).attr('title')
                     , trigger: 'manual'
                  })
                  .tooltip('show')
            })
         })
      }

      // add tipsies to grid for scaffolding
      if ($('#grid-system').length) {
         $('#grid-system').tooltip({
            selector: '.show-grid > div'
            , title: function () { return $(this).width() + 'px' }
         })
      }

      // fix sub nav on scroll
      var $win = $(window)
         , $nav = $('.subnav')
         , navTop = $('.subnav').length && $('.subnav').offset().top - 40
         , isFixed = 0

      processScroll()

      // hack sad times - holdover until rewrite for 2.1
      $nav.on('click', function () {
         if (!isFixed) setTimeout(function () {  $win.scrollTop($win.scrollTop() - 47) }, 10)
      })

      $win.on('scroll', processScroll)

      function processScroll() {
         var i, scrollTop = $win.scrollTop()
         if (scrollTop >= navTop && !isFixed) {
            isFixed = 1
            $nav.addClass('subnav-fixed')
         } else if (scrollTop <= navTop && isFixed) {
            isFixed = 0
            $nav.removeClass('subnav-fixed')
         }
      }

      // tooltip demo
      $('.tooltip-demo.well').tooltip({
         selector: "a[rel=tooltip]"
      })

      $('.tooltip-test').tooltip()
      $('.popover-test').popover()

      // popover demo
      $("a[rel=popover]")
         .popover()
         .click(function(e) {
            e.preventDefault()
         })

      // button state demo
      $('#fat-btn')
         .click(function () {
            var btn = $(this)
            btn.button('loading')
            setTimeout(function () {
               btn.button('reset')
            }, 3000)
         })

      // carousel demo
      $('#myCarousel').carousel()


   })

}(window.jQuery)