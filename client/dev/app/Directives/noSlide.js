app.directive('noSlide',function(viewHistoryService){
	return {
		restrict: 'AC',
		link: function($scope, $element){
			var element = $element[0],
				hammer = new Hammer(element);

			hammer.on('tap',function(){
				viewHistoryService.setSlide(false);
			});

			$scope.$on('destroy',function(){
				hammer.off(element,'tap');
			});
		}
	};
});