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

     // side bar
     setTimeout(function () {
        $('.bs-docs-sidenav').affix({
           offset: {
              top: function () { return $window.width() <= 980 ? 290 : 210 }
              , bottom: 270
           }
        })
     }, 100)

//    setTimeout(function () {
//      $('.bs-docs-top').affix()
//    }, 100)

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


  // toasts demo
   $('#show-toast-button').click(function(e){
      e.preventDefault();

      var $toast = $( $(this).attr('href')).clone();

      $('#alerts-container').append($toast.addClass('in'));

   });

   if ($("#myChart").length > 0){

      // charts demo
      //Get context with jQuery - using jQuery's .get() method.
      var ctx = $("#myChart").get(0).getContext("2d");
      //This will get the first returned node in the jQuery collection.
      var myNewChart = new Chart(ctx);

     var data = {
        labels : ["January","February","March","April","May","June","July"],
        datasets : [
           {
              fillColor : "rgba(220,220,220,0.5)",
              strokeColor : "rgba(220,220,220,1)",
              pointColor : "rgba(220,220,220,1)",
              pointStrokeColor : "#fff",
              data : [65,59,90,81,56,55,40]
           },
           {
              fillColor : "rgba(151,187,205,0.5)",
              strokeColor : "rgba(151,187,205,1)",
              pointColor : "rgba(151,187,205,1)",
              pointStrokeColor : "#fff",
              data : [28,48,40,19,96,27,100]
           }
        ]
     };
     new Chart(ctx).Line(data,{});
   }

  });


}(window.jQuery)
