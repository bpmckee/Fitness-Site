app.directive('menuToggle',function(){
	return {
		restrict: 'AC',
		scope: true,
		require: '^sideMenu',
		link: function($scope, $element, $attr, sideMenuCtrl){
			var side = $scope.$eval($attr.menuToggle) || 'left';
			var element = $element[0];
			var hammer = new Hammer(element);

			hammer.on('tap', function(){
				if(side == 'left'){
					sideMenuCtrl.toggleLeft();
				}else if (side == 'right'){
					sideMenuCtrl.toggleRight();
				}
			});

			$scope.$on('destroy',function(){
				hammer.off('tap');
			});
		}
	};
});

//TODO: Fix this bug...
// Go to trackFood.edit, open nav and navigate to trackFood.index
// It will close the nav while redirecting. BUT won't close overlay.
// When you click the overlay it will move the screen all the way to the left.
// and it'll get stuck until you do some weird sliding.