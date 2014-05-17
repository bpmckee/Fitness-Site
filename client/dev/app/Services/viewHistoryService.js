app.service('viewHistoryService',function($window){

	//Private stuff
	var	previousView ,
		currentView,
		nextView,
		historyStack = [],
		historyIndex = -1,
		slide = true;

	var _getViewAtIndex = function(index){
		return (index > -1 && index < historyStack.length) ? historyStack[index] : null;
	};

	var _setHistoryHelpers = function(){
		previousView = _getViewAtIndex(historyIndex - 1);
		currentView = _getViewAtIndex(historyIndex);
		nextView = _getViewAtIndex(historyIndex + 1);
		console.log(historyStack);
	};

	var _clearFutureHistory = function(){
		for(var i = historyStack.length-1; i > historyIndex; i--){
			historyStack.pop();
		}
	};

	// Public API
	this.empty = function(){
		return historyStack.length === 0;
	};

	this.getNext = function(){
		return nextView;
	};
	this.getPrev = function(){
		return previousView;
	};

	this.goBack = function(){
//		$window.history.back();
		historyIndex--;
		slide = currentView.slide;
		_setHistoryHelpers();
	};

	this.goForward = function(){
//		$window.history.forward();
		historyIndex++;
		slide = nextView.slide;
		_setHistoryHelpers();
	};

	this.addView = function(view){
		var newView = angular.extend(view, {slide: slide});
		_clearFutureHistory();
		historyIndex++;
		historyStack.push(newView);
		_setHistoryHelpers();
	};

	this.slide = slide;
	var self = this; //NOTE: for whatever reason, this only works if I say this.slide... weird
	this.getSlide = function(){
		return self.slide;
	};

	this.setSlide = function(param){
		self.slide = !!param;
	};
});