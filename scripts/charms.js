(function ($) {
   $("#user-info").click(function(e){
      e.preventDefault();
      e.stopPropagation();
      $.charms.showUserPanel();
   });



	$.charmsImpl = {
		isSearchOpen: false,
		isUserOpen: false,
      hideOnMouseLeave: false, // set to true in production
		iconSize: 30,

		init: function () {
         console.log("init");
			$("#charms-user").hide();
			$("#charms-search").hide();

//			$("#searchLink").click(function (e) {
//				$.charmsImpl.handleSearchClick();
//			});

			$("#charms").click(function (e) {
				if ($.charms.get_isOpen()) {
					e.stopPropagation();
				}
			});
		},

		handleUserClick: function () {

			$.charmsImpl.isSearchOpen = false;
			$("#charms-search").hide();

			if (!$.charmsImpl.isUserOpen) {

				$("#charms-user").show();

				var NewElementWidth = $("#charms-user").width();
				var animateWidthTo = NewElementWidth + $.charmsImpl.iconSize;
				$("#charms").animate({ width: animateWidthTo, duration: 600 });

				$.charmsImpl.isUserOpen = !$.charmsImpl.isUserOpen;
         }

			else {
				$("#charms").animate({ width: $.charmsImpl.iconSize, duration: 600 }, function () {
					$("#charms-user").hide();
				});
				$.charmsImpl.isUserOpen = !$.charmsImpl.isUserOpen;
			}

		},

		handleSearchClick: function () {

			$.charmsImpl.isUserOpen = false;
			$("#charms-user").hide();

			if (!$.charmsImpl.isSearchOpen) {

				$("#charms-search").show();

				var NewElementWidth = 300;
				var animateWidthTo = NewElementWidth + $.charmsImpl.iconSize;
				$("#charms").animate({ width: animateWidthTo, duration: 600 }, function () {
					$.charmsImpl.handleFocusOnSearchTextBox();
				});

				$.charmsImpl.isSearchOpen = true;
			}

			else {
				$("#charms").animate({ width: $.charmsImpl.iconSize, duration: 600 }, function () {
					$("#charmsSearch").hide();
				});
				$.charmsImpl.isSearchOpen = false;
				$.charmsImpl.handleFocusOnSearchTextBox();
			}
		},

		handleFocusOnSearchTextBox: function () {
			if ($.charmsImpl.isSearchOpen) {
				$("#charmsSearchTextbox").show();
				setTimeout(function () {
					$("#charmsSearchTextbox").focus();
				}, 100);
				$.charmsImpl.handleSearchTextBoxChange();
			}
			else {
				$("#charmsSearchTextbox").hide();
				$("#charmsSearchTextbox").blur();
			}
		},

		closeAll: function () {
         if ($.charms.get_isOpen()) {
            $("#charms").animate({ width: 0, duration: 600 }, function () {
               $.charmsImpl.isUserOpen = false;
               $("#charms-user").hide();

               $.charmsImpl.isSearchOpen = false;
               $("#charms-search").hide();
            });
         }
		},

		handleSearchTextBoxChange: function () {
//			var text = $("#charmsSearchTextbox").val();
//
//			$("#searchResults").children().remove();
//
//			for (itemIndex in $.charmsImpl.hardcodedSearchOptions) {
//				var item = $.charmsImpl.hardcodedSearchOptions[itemIndex];
//				if (item.text.toLowerCase().indexOf(text.toLowerCase()) != -1) {
//					$("#searchResults").append($("<li></li>").html("<a href='" + item.link + "'>" + item.text + "</a>"));
//				}
//			}
//
//			if (text.length > 0)
//				$("#searchResults li a").highlightText(text);
		}
	};

   $.charms = function () {
      //new $.charmsImpl.init();
      new $.charmsImpl();
      s.init();
	};

	$.charms.get_isOpen = function () {
		return $.charmsImpl.isUserOpen || $.charmsImpl.isSearchOpen;
	};

   $.charms.showUserPanel = function () {
      $.charmsImpl.handleUserClick();
   };

//   $('#charms').mouseleave(function (e) {
//      $.charmsImpl.closeAll();
//   });

      $('#close-charms').click(function(e){
         e.preventDefault();
         $.charmsImpl.closeAll();
      });

})(jQuery);




// https://github.com/tentonaxe/jQuery-highlightText/blob/master/jquery.highlighttext.js
// This jQuery plugin implements the $.fn.highlightText method
// making it easy to highlight text within an element by wrapping
// it in a span with a given class.
//
// To use this plugin, first select the element that contains the text
// that you want to replace, then call .highlightText() on it.
// the plugin has one required parameter and two optional parameters.
//
// The plugin is always called in the same way:
// $(sel).highlightText(<parameters>);
// It accepts three parameters.
//
// The first parameter decides what text will be matched. It can be a 
// string, a regular expression in string format, a regular expression
// object, or an array of words.
//
// The second parameter is the class that will be added to the matched
// text. it is optional and can be a space delimited list of classes to
// add to the element that wraps the matched text. It is set to "highlight"
// by default.
//
// The third parameter lets you decide whether or not the plugin should
// only match full matches. It is defaulted to false, meaning it will
// match partial matches. However, this third parameter is ignored if
// the first parameter is a regular expression object.
(function ($) {

	$.fn.highlightText = function () {
		// handler first parameter
		// is the first parameter a regexp?
		var re,
			hClass,
			reStr,
			argType = $.type(arguments[0]),
			defaultTagName = $.fn.highlightText.defaultTagName;

		if (argType === "regexp") {
			// first argument is a regular expression
			re = arguments[0];
		}
		// is the first parameter an array?
		else if (argType === "array") {
			// first argument is an array, generate
			// regular expression string for later use
			reStr = arguments[0].join("|");
		}
		// is the first parameter a string?
		else if (argType === "string") {
			// store string in regular expression string
			// for later use
			reStr = arguments[0];
		}
		// else, return out and do nothing because this
		// argument is required.
		else {
			return;
		}

		// the second parameter is optional, however,
		// it must be a string or boolean value. If it is 
		// a string, it will be used as the highlight class.
		// If it is a boolean value and equal to true, it 
		// will be used as the third parameter and the highlight
		// class will default to "highlight". If it is undefined,
		// the highlight class will default to "highlight" and 
		// the third parameter will default to false, allowing
		// the plugin to match partial matches.
		// ** The exception is if the first parameter is a regular
		// expression, the third parameter will be ignored.
		argType = $.type(arguments[1]);
		if (argType === "string") {
			hClass = arguments[1];
		}
		else if (argType === "boolean") {
			hClass = "highlight";
			if (reStr) {
				reStr = "\\b" + reStr + "\\b";
			}
		}
		else {
			hClass = "highlight";
		}

		if (arguments[2] && reStr) {
			reStr = reStr = "\\b" + reStr + "\\b";
		}

		// if re is not defined ( which means either an array or
		// string was passed as the first parameter ) create the
		// regular expression.
		if (!re) {
			re = new RegExp("(" + reStr + ")", "ig");
		}

		// iterate through each matched element
		return this.each(function () {
			// select all contents of this element
			$(this).find("*").andSelf().contents()

			// filter to only text nodes that aren't already highlighted
			.filter(function () {
				return this.nodeType === 3 && $(this).closest("." + hClass).length === 0;
			})

			// loop through each text node
			.each(function () {
				var output;
				output = this.nodeValue
					.replace(re, "<" + defaultTagName + " class='" + hClass + "'>$1</" + defaultTagName + ">");
				if (output !== this.nodeValue) {
					$(this).wrap("<p></p>").parent()
						.html(output).contents().unwrap();
				}
			});
		});
	};

	$.fn.highlightText.defaultTagName = "span";

})(jQuery);
