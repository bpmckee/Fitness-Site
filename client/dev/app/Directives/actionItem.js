app.directive('actionItem',function($compile){
	return {
		scope: {
			templateURl: "@",
			template: "=",
			type: "@",
			action: "="
		},
		link: function($scope, $element){
			var tpl;
			$scope.isReady = false;
			if(angular.template){
				console.log('action item is a template.. not implemented');
			}else if(angular.templateUrl){
				console.log('action item is a templateURL... not implemented');
			}else {
				switch($scope.type){
					case "dropdown":
						tpl = '<a href="#" class="dropdown action-btn" data-content="action.content"><i class="fa" ng-class="{{\'action.icon\'}}" ng-if="action.icon"></i></a>';
						break;
					case "calendar":
						tpl = '<button type="button" class="dropdown action-btn" data-content="action.content" data-template-url="{{action.tplUrl}}"><i class="fa" ng-class="{{\'action.icon\'}}" ng-if="action.icon"></i></button>';
						break;
					default:
						tpl = '<a ui-sref="{{action.toState}}" class="action-btn '+$scope.action.classes+'"><i class="fa" ng-class="{{\'action.icon\'}}" ng-if="action.icon"></i></a>';
				}
			}

			var el = angular.element(tpl);
			$element.append(el);
			$compile(el)($scope);
		}
	};
});