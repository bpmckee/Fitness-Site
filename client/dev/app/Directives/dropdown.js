app.constant('dropdownConfig', {
	openClass: 'open'
})

.service('dropdownService', function($document) {
	var openScope = null; //the controller instance's scope.  essentially access controller methods & variables

	//---- private methods
	var closeDropdown = function() {
		openScope.$apply(function() {
			openScope.openVal = false;
		});
	};

	var escapeKeyBind = function( evt ) {
		if ( evt.which === 27 ) {
			closeDropdown();
		}
	};

	//---- public API
	this.open = function( dropdownScope ) {

		// initially setup document handlers to close the drop-down menu
		if ( !openScope ) {
			$document.bind('click', closeDropdown);
			$document.bind('keydown', escapeKeyBind);
		}

		// close other drop-downs when trying to open this one.
		if ( openScope && openScope !== dropdownScope ) {
			openScope.openVal = false;
		}

		// save scope so it can be closed by things other than the directive
		openScope = dropdownScope;
	};

	this.close = function( dropdownScope ) {
		// if the scopes don't match, that scope's dropdown is already closed.
		// this function is all cleanup anyway.
		if ( openScope === dropdownScope ) {
			openScope = null;
			$document.unbind('click', closeDropdown);
			$document.unbind('keydown', escapeKeyBind);
		}
	};
})

.controller('DropdownController', function($scope, $attrs, $parse, dropdownService) {
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
			dropdownService.open( scope );
		} else {
			dropdownService.close( scope );
		}
	});
	$scope.$on('$locationChangeSuccess', function() {
		scope.openVal = false;
	});

	$scope.$on('$destroy', function() {
		scope.$destroy();
	});
})

.directive('dropdown',function($compile, dropdownConfig, $templateCache){
	return {
		restrict: 'CA',
		controller: 'DropdownController',
		scope: {
			content: "=",
			tplUrl: "@templateUrl",
			init: "="
		},
		link: function($scope, $element, $attrs, dropdownCtrl){
			if(!dropdownCtrl) { return; }

			console.log('TEMPLATE URL',$scope.tplUrl);

			var initialized = false;

			dropdownCtrl.init($element);
			$scope.ddOpen = dropdownCtrl.isOpen();

			var initDropdown = function(){
				if(initialized) {return;}
				var templateUrl = $scope.tplUrl || 'templates/dropdownList.html';
				var menuTemplateHtml = $templateCache.get(templateUrl);

				var $menuElement = $compile(angular.element(menuTemplateHtml))($scope);
				$element.after($menuElement);
				initialized = true;
			};

			var toggleDropdown = function() {
				if ( !$element.hasClass('disabled') && !$attrs.disabled ) {
					$scope.$apply(function() {
						dropdownCtrl.toggle();
					});
				}
			};

			initDropdown();


			// setup handler
			var hammer = new Hammer($element[0]);
			$element.bind('click',function(evt){ // Hammer 'tap' isn't the same as a 'click'.
				evt.preventDefault();
				evt.stopPropagation();
			});
			hammer.on('tap',toggleDropdown);

			//---- Watchers
			$scope.$watch(dropdownCtrl.isOpen, function( isOpen ) {
				$scope.ddOpen = isOpen;
				$element[0].focus();
				$element[isOpen ? 'addClass': 'removeClass'](dropdownConfig.openClass);
			});

			$scope.$on('$destroy', function() {
				hammer.off('tap',toggleDropdown);
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