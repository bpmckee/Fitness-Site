app.service('viewHistoryService',function(){

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
		nextView.slide = slide;
		_setHistoryHelpers();
	};

	this.addView = function(view){
		var newView = angular.extend(view, {slide: slide});
		_clearFutureHistory();
		historyIndex++;
		historyStack.push(newView);
		_setHistoryHelpers();
	};

	this.getSlide = function(){
		return slide;
	};

	this.setSlide = function(param){
		slide = !!param;
	};
});