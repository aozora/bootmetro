/**
 * A jQuery plugin that enables you to add kinetic scrolling on your touch optimized projects.
 * jSwipeKinetic is build on top of jGestures (jgestues.codeplex.com).
 * Including: the elastic effect made famous by ios and the abillity to swipe or drag an element.
 *
 * Copyright 2010-2012, Razorfish GmbH
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @fileOverview
 * Neue Digitale / Razorfish GmbH javascript library: add kinetic scolling to touch devices
 *
 * This is still a beta version, bugfixes and improvements appreciated.
 *
 * @author martin.krause@neue-digitale.de
 * @version 1.0
 *
 * @snvauthor				$Author: martinkr $
 * @svnversion				$Revision: 0 $
 *
 * @requires
 * jQuery JavaScript Library v1.4.2 - http://jquery.com/
 *	Copyright 2010, John Resig
 *	Dual licensed under the MIT or GPL Version 2 licenses.
 *	http://jquery.org/license
 *
 * jGestures v0.87 - http://jgestures.codeplex.com
 *	Copyright 2010-2011, Razorfish GmbH
 *	Licensed under the Apache License, Version 2.0
 *
 * @copyright Razorfish GmbH
 *
 * @example
 * jQuery(document).ready(function () {
 *	 $('.jGestures_swipeKinetic').jSwipeKinetic({sSelectorItems: ' > li'})
 * });
 *
 */
(function($) {

	$.fn.jSwipeKinetic = function(oOptions_) {

 		// check for gestures
 		if ($.hasGestures === undefined) { throw new Error('Missing jGestures'); }
 		// if ($.hasGestures === false) {return;}

 		// merge plugin options
		var _oOpts = jQuery.extend({}, $.fn.jSwipeKinetic._oDefaults, oOptions_);

		// iterate jQuery elements, apply jSwipeKinetic-plugin
		return this.each(function(i_, element_) {
			var _$this = jQuery(this);
			 // construct element options by looking for the metadata plugin
			var _oElOpts = jQuery.meta ? jQuery.extend( {}, _oOpts, _$this.data() ) : _oOpts;

			// set elements to be as wide as all the items and as tall as the tallest
			var _$elItems = _$this.find(_oElOpts.sSelectorItems);
			var _iWidth = 0;
			var _iHeight = 0;
			_$elItems.each(function() {
				_iWidth += jQuery(this).outerWidth(true);
				_iHeight =  _iHeight > jQuery(this).outerHeight(true) ? _iHeight : jQuery(this).outerHeight(true);
			});
			// enable hardware accleration for css3-manipulations
			_$this.css('-webkit-translate3d','(0,0,0)');
			_$this.css({
					'width':_iWidth+'px',
					'height':_iHeight+'px',
					'overflow':'hidden'
			});

			// add class events
			_addEvents(_$this);

		});
	};


	// private functions
	/**
	* Adds plugin / instance specific events
	* @return {Void}
	* @private
	*/
	function _addEvents($element_) {
 		$element_
 			// kinetic
			.bind("swipeone", $.fn.jSwipeKinetic.swipe)
			// move
			.bind("swipemove",$.fn.jSwipeKinetic.swipeMove)
			// control
			.bind('jGestures.touchstart',$.fn.jSwipeKinetic.touchstart)
			.bind('jGestures.touchend;processed',$.fn.jSwipeKinetic.touchend);
	}

	/**
	 * Calculates the destination values and the duration of the css3-animation.
	 * Takes care of edgecases and sets a shorter duration for the "elastic snap" if the boundaries flag ist set .
	 * @private
	 * @param  {jQuery-Element} $element_ Element to be animated
	 * @param  {Object} oDelta_ jGestures Event-Delta-Object
	 * @param  {Bool} bBoundaries_ Enable boundary-check
	 * @return {Object} {iLeft: {Number}, iTop: {Number}, iDuration : {Number}}
	 */
	function _calculateValues($element_, oDelta_,bBoundaries_) {

		var _iDuration = 1;

		var _iLeft = (parseInt($element_.css('marginLeft')) + oDelta_.lastX);
		var _iTop = (parseInt($element_.css('marginTop')) + oDelta_.lastY);

		if (bBoundaries_ === true ) {

			var _iMaxLeft = -1*($element_.width()-$element_.parent().width());

			if (_iLeft >0 ) {
				_iLeft = 0;
				_iDuration = 0.25;
			}

			if (_iLeft < _iMaxLeft) {
				_iLeft = _iMaxLeft;
				_iDuration = 0.25;
			}


			var _iMaxTop = -1*($element_.height()-$element_.parent().height());

			if (_iTop >0 ) {
				_iTop = 0;
				_iDuration = 0.25;
			}
			if (_iTop < _iMaxTop) {
				_iTop = _iMaxTop;
				_iDuration = 0.25;
			}
		}

		return {
			iLeft : _iLeft,
			iTop : _iTop,
			iDuration : _iDuration
		};
	}

	// public functions

	/**
	* @return {Void}
	*/

	/**
	 * Handles a jGestures-swipe event, uses css3-transition on the event targets "marginLeft" property for the kinetic effect.
	 * @param {Event}, event_
	 * @param {Object}, oOptions_ jGestures option object
	 * @return {Void}
	 */
	$.fn.jSwipeKinetic.swipe = function(event_,oOptions_) {

			var _oDelta = oOptions_.delta[0];
			var _$element = jQuery(event_.target);

			// add "oncomplete"-callback to remove css3-transition
			_$element.get(0).addEventListener('webkitTransitionEnd', function (event_) {
				jQuery(event_.target)
					.data('jSwipeKinetic-hasRunningSwipe',false)
					.css('-webkit-transition','');
				jQuery(document).data('jSwipeKinetic-preventScrolling',false);
			}, false);


			// just use the kinetic swipe if the duration between touchestart and touchend indicates a kinetic swipe
			// prevents: touch - move slow or end and wait but swipe trigger due to swipe calucation sufficient - kinetic effect
			if(event_.timeStamp - _$element.data('jSwipeKinetic-timestampTouchsstart') > 1500) {
				return;
			}

			// kinetic scrolling
			var _oValues = _calculateValues(_$element,_oDelta,true);

			// prevent default body scrolling due to sloppy gestures
			jQuery(document).data('jSwipeKinetic-preventScrolling',true);

			_$element
				.data('jSwipeKinetic-hasRunningSwipe',true)
				// calculate the time for the kinetic effect in relation to the distance using a natural log and a third (~ 0.7 - 1.5 )
				// .css('-webkit-transition',['margin ', ( Math.log(Math.abs(_iMoved))*0.33) ,'s ease-out'].join('') )
				// use a fixed value: 1s
				.css('-webkit-transition',['margin ', _oValues.iDuration,'s ease-out'].join(''))
				.css({
					'marginLeft':['',_oValues.iLeft,'px'].join(''),
					'marginTop':['',_oValues.iTop,'px'].join('')
				});
	};

	/**
	 * Handles a jGestures-swipemove event, uses css3-transition on the event targets "marginLeft" property for the kinetic effect.
	 * @param {Event}, event_
	 * @param {Object}, oOptions_ jGestures option object
	 * @return {Void}
	 */
	$.fn.jSwipeKinetic.swipeMove = function(event_,oOptions_) {
			var _oDelta = oOptions_.delta[0];
			// use this if you want to scroll vertically while dragging over the kineticswipable-are
			// let the os scroll vertical if the total amount of y-pixels exceeds the x-axis pixels
			// should just be the case if the initial movement is a vertical one
			// if ( Math.abs(_oDelta.startX) <  Math.abs(_oDelta.startY) ) {
			//	jQuery(document).data('jSwipeKinetic-preventScrolling',false);
			//	return;
			// }
			// prevent default body scrolling due to sloppy gestures
			jQuery(document).data('jSwipeKinetic-preventScrolling',true);

			var _$element = jQuery(event_.target);

			// no more moves during kinetic swipe
			if(_$element.data('jSwipeKinetic-hasRunningSwipe')) {return;}

			var _oValues = _calculateValues(_$element,_oDelta,false);

			_$element.css({
				'marginLeft':['',_oValues.iLeft,'px'].join(''),
				'marginTop':['',_oValues.iTop,'px'].join('')
			});
	};

	/**
	 * Handles a jGestures-control event,
	 * - clears kinetc effect if touchstart occurs during kinetic animation
	 * - stores timestamp for calculating necessity of kinetc effects on touchend
	 * - set a flag to prevent the default scrolling due to sloppy gestures
	 * @param {Event}, event_
	 * @return {Void}
	 */
	$.fn.jSwipeKinetic.touchstart = function(event_) {
		var _$element = jQuery(event_.target);

		// store timestamp
		_$element.data('jSwipeKinetic-timestampTouchsstart',event_.timeStamp);

		if(_$element.data('jSwipeKinetic-hasRunningSwipe')) {
			_$element
				// stop animation
				.css('-webkit-transition','all 0s')
				.css('marginLeft', ['', parseInt(_$element.css('marginLeft')),'px'].join('') )
				.data('jSwipeKinetic-hasRunningSwipe',false);

				// remove prevent default body scrolling due to sloppy gestures
				jQuery(document).data('jSwipeKinetic-preventScrolling',false);
		}
	};

	/**
	 * Handles a jGestures-control event,
	 * - removes the flag preventing the default scrolling due to sloppy gestures
	 * @param {Event}, event_
	 * @return {Void}
	 */
	$.fn.jSwipeKinetic.touchend = function(event_) {
		// remove prevent default body scrolling due to sloppy gestures
		jQuery(document).data('jSwipeKinetic-preventScrolling',false);

		var _$element = jQuery(event_.target);
		// kinetic scrolling
		// elasitc snap to bounding box if a swipemove was the last movement
 		if (_$element.data('jSwipeKinetic-hasRunningSwipe') === false ) {

 			var _oValues = _calculateValues(_$element,{lastX:0,lastY:0}, true);
			// prevent default body scrolling due to sloppy gestures
			jQuery(document).data('jSwipeKinetic-preventScrolling',true);

			_$element
				.data('jSwipeKinetic-hasRunningSwipe',true)
				// calculate the time for the kinetic effect in relation to the distance using a natural log and a third (~ 0.7 - 1.5 )
				// .css('-	webkit-transition',['margin ', ( Math.log(Math.abs(_iMoved))*0.33) ,'s ease-out'].join('') )
				// use a fixed value: 1s
				.css('-webkit-transition',['margin ', (_oValues.iDuration === 1)  ? 0 : _oValues.iDuration ,'s ease-out'].join(''))
				.css({
					'marginLeft':['',_oValues.iLeft,'px'].join(''),
					'marginTop':['',_oValues.iTop,'px'].join('')
				});
 		}
	};

	$.fn.jSwipeKinetic.__version = 1.25; // class version
	$.fn.jSwipeKinetic.__class = 'jSwipeKinetic'; // class name

})(jQuery);


