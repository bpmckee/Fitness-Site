app.constant('popoverConfig', {
	openClass: 'open'
})

.service('popoverService', function($document) {
	var openScope = null; //the controller instance's scope.  essentially access controller methods & variables

	//---- private methods
	var closePopover = function() {
		openScope.$apply(function() {
			openScope.openVal = false;
		});
	};

	var escapeKeyBind = function( evt ) {
		if ( evt.which === 27 ) {
			closePopover();
		}
	};

	//---- public API
	this.open = function( popoverScope ) {

		// initially setup document handlers to close the drop-down menu
		if ( !openScope ) {
			$document.bind('click', closePopover);
			$document.bind('keydown', escapeKeyBind);
		}

		// close other drop-downs when trying to open this one.
		if ( openScope && openScope !== popoverScope ) {
			openScope.openVal = false;
		}

		// save scope so it can be closed by things other than the directive
		openScope = popoverScope;
	};

	this.close = function( popoverScope ) {
		// if the scopes don't match, that scope's popover is already closed.
		// this function is all cleanup anyway.
		if ( openScope === popoverScope ) {
			openScope = null;
			$document.unbind('click', closePopover);
			$document.unbind('keydown', escapeKeyBind);
		}
	};
})

.controller('popoverCtrl', function($scope, $attrs, $parse, popoverService) {
	var self = this,
		scope = $scope.$new(), // create a child scope so we are not polluting original one
		getIsOpen;

	//---- API available to the directive.
	this.init = function( element ) {
		self.$element = element;

		if ( $attrs.isOpen ) {
			getIsOpen = $parse($attrs.isOpen);

			$scope.$watch(getIsOpen, function(value) {
				scope.openVal = !!value;
			});
		}
	};

	this.toggle = function( open ) {
		scope.openVal = arguments.length ? !!open : !scope.openVal;
	};

	// Allow other directives to watch status (ARIA stuff).
	this.isOpen = function() {
		return scope.openVal;
	};

	//---- API available to the service

	//watchers
	scope.$watch('openVal', function( isOpen ) {
		if ( isOpen ) {
			popoverService.open( scope );
		} else {
			popoverService.close( scope );
		}
	});
	$scope.$on('$locationChangeSuccess', function() {
		scope.openVal = false;
	});

	$scope.$on('$destroy', function() {
		scope.$destroy();
	});
})

.directive('popover',function($compile, popoverConfig, $templateCache){
	return {
		restrict: 'CA',
		controller: 'popoverCtrl',
		scope: {
			content: "=",
			tplUrl: "@templateUrl",
			init: "=",
			maxWidth: "="
		},
		link: function($scope, $element, $attrs, popoverCtrl){
			if(!popoverCtrl) { return; }

			var initialized = false,
				$popover = null,
				maxWidth = $scope.maxWidth,
				halfWidth = maxWidth/2;

			popoverCtrl.init($element);
			$scope.open = popoverCtrl.isOpen();

			var initPopover = function(){
				if(initialized) {return;}


				var templateUrl = $scope.tplUrl || 'templates/dropdownList.html';
				var templateHtml = $templateCache.get(templateUrl);

				$popover = angular.element(templateHtml);
				var style = position();
				$popover.css({'left':style.left,'right':style.right});


				$element.after($popover);
				var x = $compile($popover)($scope);



				initialized = true;
			};

			var togglePopover = function() {
				if ( !$element.hasClass('disabled') && !$attrs.disabled ) {
					$scope.$apply(function() {
						popoverCtrl.toggle();
					});
				}
			};

			var position = function(){
				var w = window,
					d = document,
					e = d.documentElement,
					g = d.getElementsByTagName('body')[0],
					x = w.innerWidth || e.clientWidth || g.clientWidth,
					y = w.innerHeight|| e.clientHeight|| g.clientHeight;

				var triggerRect = $element[0].getBoundingClientRect();
				var distToLeftEdge = triggerRect.left;
				var distToRightEdge = x - triggerRect.right;

				var left = halfWidth - (triggerRect.width/2);
				var right = left;

				var addToLeft = right - distToRightEdge;
				var addToRight = left - distToLeftEdge;

				left += (addToLeft > 0) ? addToLeft : 0;
				right += (addToRight > 0) ? addToRight: 0;

				var styleLeft = Math.min(left, distToLeftEdge);
				var styleRight = Math.min(right, distToRightEdge);

				return {
					left: (-styleLeft)+'px',
					right: (-styleRight)+'px'
				};
			};

			initPopover();

			// setup handler
			var hammer = new Hammer($element[0]);
			$element.bind('click',function(evt){ // Hammer 'tap' isn't the same as a 'click'.
				evt.preventDefault();
				evt.stopPropagation();
			});
			hammer.on('tap',togglePopover);


			window.onresize = function(){
				if($popover && $popover[0].nextElementSibling){
					var style = position();
					$popover[0].nextElementSibling.style.left = style.left;
					$popover[0].nextElementSibling.style.right = style.right;
				}
			};


			//---- Watchers
			$scope.$watch(popoverCtrl.isOpen, function( isOpen ) {
				$scope.open = isOpen;
				$element[0].focus();
				$element[isOpen ? 'addClass': 'removeClass'](popoverConfig.openClass);
			});

			$scope.$on('$destroy', function() {
				hammer.off('tap',togglePopover);
				$element.unbind('click');
			});
		}
	};
});


/*
How directive logic should go:

* build options for directive
* pass options (& directive scope) into controller to initialize it

* watch for content changes, apply them to the scope.content so they update in the tpl.

* setup event handlers.


How controller logic should go:


 */