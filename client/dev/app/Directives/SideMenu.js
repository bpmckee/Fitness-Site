app.directive('sideMenu',function($timeout, $window){
	return{
		restrict: 'A',
		scope: true,
		controller: 'SideMenuCtrl',
		compile: function(element, attr){
			return function($scope, $element, $attr, sideMenuCtrl){

				// private vars
				var element = $element[0],
					isDragging = false,
					height = 0,
					width = 0,
					orientation = 'landscape';

				//private methods
				var canOpen = function(){
					return width < 1025;
				};

				var setTranslate = function(amt){
					element.style['-webkit-transform'] = 'translate3d('+amt+'px,0,0)';
					$timeout(function(){
						$scope.transX = amt;
					});
				};
				var getTranslate = function(){
					return $scope.transX || 0;
				};
				// private methods -
				var dragFn = function(e){
					if(!canOpen()){
						if(getTranslate() > 0) {
							setTranslate(0);
						}
						e.gesture.srcEvent.preventDefault();
						return false;
					}
					isDragging = true;
					sideMenuCtrl._handleDrag(e);
					e.gesture.srcEvent.preventDefault();
				};

				var dragStop = function(e){
					if(!canOpen()){
						if(getTranslate() > 0) {
							setTranslate(0);
						}
						e.gesture.srcEvent.preventDefault();
						return false;
					}
					isDragging = false;
					sideMenuCtrl._endDrag(e);
				};

				var setScreenInfo = function(){
					height = $window.innerHeight;
					width = $window.innerWidth;
					orientation = (height > width) ? 'portrait' : 'landscape';
				};

				var resize = function(){
					setScreenInfo();
					sideMenuCtrl._handleResize();
				};

				setScreenInfo(); //init screen info

				// add public DOM methods to the controller
				sideMenuCtrl.setCtx({
					setTranslateX: function(amt){
						setTranslate(amt);
					},
					getTranslateX: function(){
						return getTranslate();
					},
					disableAnimation: function(){
						$scope.animationEnabled = false;
						element.classList.remove('animated');
					},
					enableAnimation: function(){
						$scope.animationEnabled = true;
						element.classList.add('animated');
					},
					showOverlay: function(){
						element.classList.add('overlay');
					},
					hideOverlay: function(){
						element.classList.remove('overlay');
					},

					getWidth: function(){
						return width;
					},
					getHeight: function(){
						return height;
					},
					getOrientation: function(){
						return orientation;
					},
					canBeOpen: function(){
						return canOpen();
					}
				});


				// setup event handlers
				var hammer = new Hammer(element);
				hammer.on('dragleft',dragFn);
				hammer.on('dragright',dragFn);
				hammer.on('release',dragStop);

				//--resize handler;
				angular.element($window).bind('resize',function(){
					//TODO: maybe implement some sort of timer to check if screen is done resizing
					// but if the screen resize toggled over the 1025 mark, you update right away.
					resize();
				});

				// Directive cleanup
				$scope.$on('destroy',function(){
					hammer.off('dragleft');
					hammer.off('dragright');
					hammer.off('release');
				});
			};
		}
	};
});