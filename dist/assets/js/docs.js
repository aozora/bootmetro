/* SAMMYJS START
 ========================== */
var app = $.sammy('#view-container', function() {
   // include the plugin and alias mustache() to ms()
   this.use('Mustache', 'mustache');

   this.get('#/doc/:page', function(context) {

      //context.log('page = ' + this.params.page);

      // set local vars
      //this.title = 'Hello!'
      this.page = this.params.page;
      // render the template and pass it through mustache
      this.partial('partials/' + this.params.page + '.mustache', function(){
         // re-sync scrollspy & prettyprint
         $('.bs-docs-sidebar').scrollspy('refresh');

         window.prettyPrint && prettyPrint()
      });


   });
});

$(function() {
   app.run('#/doc/welcome')
});




// NOTICE!! DO NOT USE ANY OF THIS JAVASCRIPT
// IT'S ALL JUST JUNK FOR OUR DOCS!
// ++++++++++++++++++++++++++++++++++++++++++

!function ($) {

  $(function(){

    var $window = $(window)

    // Disable certain links in docs
    $('section [href^=#]').click(function (e) {
      e.preventDefault()
    })

    // back to top
    // setTimeout(function () {
    //   $('.bs-docs-sidenav').affix({
    //     offset: {
    //       top: function () { return $window.width() <= 980 ? 290 : 210 }
    //     , bottom: 270
    //     }
    //   })
    // }, 100)

    setTimeout(function () {
      $('.bs-docs-top').affix()
    }, 100)

    // make code pretty
    window.prettyPrint && prettyPrint()

    // add-ons
    $('.add-on :checkbox').on('click', function () {
      var $this = $(this)
        , method = $this.attr('checked') ? 'addClass' : 'removeClass'
      $(this).parents('.add-on')[method]('active')
    })

    // add tipsies to grid for scaffolding
    if ($('#grid-system').length) {
      $('#grid-system').tooltip({
          selector: '.show-grid > [class*="span"]'
        , title: function () { return $(this).width() + 'px' }
      })
    }

    // tooltip demo
    $('.tooltip-demo').tooltip({
      selector: "a[rel=tooltip]"
    })

    $('.tooltip-test').tooltip()
    $('.popover-test').popover()

    $('.bs-docs-navbar').tooltip({
      selector: "a[data-toggle=tooltip]",
      container: ".bs-docs-navbar .nav"
    })

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
    $('.bs-docs-carousel-example').carousel()


     // Datepicker demo
     $('.datepicker').datepicker();

     $('#dp3').datepicker();






  });









}(window.jQuery)
