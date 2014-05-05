app.controller('StateCtrl', function($scope, viewHistoryService, $window, $state, navService){

	// private vars
	var hist = viewHistoryService;

	// scope vars
	$scope.data = {};
	$scope.current = $state.current.name;
	$scope.testContent = ["1","3","5","7"];
	$scope.navLinks = navService.links;

	// Scope listeners
	$scope.$on('$locationChangeStart',function(evt,newUrl,oldUrl){
		var reverse = false,
			prev = hist.getPrev(),
			next = hist.getNext();

		if(newUrl == oldUrl && !hist.empty()){
			//Trying to navigate to the same page they were just on
			evt.preventDefault();
			return;

		} else if (prev && newUrl == prev.url){
			reverse = true;
			hist.goBack();

		} else if (next && newUrl == next.url){
			hist.goForward();

		} else {
			hist.addView({ url: newUrl });
		}

		$scope.slide = hist.slideEnabled();
		$scope.reverse = reverse;
		hist.enableSlide();
	});

	$scope.$on('$stateChangeSuccess',function(evt, toState){
		var toStateData = toState.data;
		var showBackBtn = true;
		if(toStateData){
			$scope.data = toStateData;
			if(toStateData.base){
				showBackBtn = false;
			}
		}
		$scope.data.showBackBtn = showBackBtn;
		$scope.current = toState.name;
	});

	// public api
	$scope.back = function(){
		$window.history.back();
	};
});