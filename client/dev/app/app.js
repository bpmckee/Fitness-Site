var app = angular.module('app',['ui.router','ngAnimate','templates.common']);

app.config(function($stateProvider, $urlRouterProvider){

	//state provider config
	$stateProvider
		.state('trackFood',{
			abstract: true,
			url: '/track',
			templateUrl: 'templates/root.html',
			controller: 'FoodTableCtrl',
			data: {
				title: "Track",
				tabs: [
					{ state: 'trackFood.index', name: 'Food' },
					{ state: 'trackFood.edit', name: 'Exercise' }
				]
			}
		})
		.state('trackFood.index',{
			url: '/food',
			data: {
				base: true,
				actions:[
					{
						txt: "Back",
						icon: "fa-shopping-cart",
						toState: "trackFood.edit"
					},
					{
						txt: "Edit",
						icon: "fa-pencil",
						type: "dropdown",
						content: [1,3,5]
					},
					{
						txt: "Add",
						icon: "fa-plus",
						classes: 'no-slide',
						toState: 'trackFood.edit'
					},
					{
						txt: "Calendar",
						icon: "fa-calendar",
						type: "calendar",
						content: [1,3,5],
						tplUrl: 'templates/popover_calendar.html'
					}
				]
			},
			views: {
				"header": { templateUrl: 'templates/header.html'},
				"main": { templateUrl: 'views/trackFood.html' },
				"tabs": { templateUrl: 'templates/tabs.html' }
			}
		})
		.state('trackFood.edit',{
			url: '/food/edit',
			data: {
				header: {
					title: 'Edit'
				},
				noSlide: true
			},
			views: {
				'header': { templateUrl: 'templates/header.html' },
				'main': { templateUrl: 'views/trackFoodEdit.html' },
				"tabs": { templateUrl: 'templates/tabs.html' }
			}
		})
		.state('trackFood.search',{
			url: 'food/search',
			views: {
				'header': { templateUrl: 'templates/header.html'},
				'main': { templateUrl: 'views/trackFoodSearch.html' },
				"tabs": { templateUrl: 'templates/tabs.html' }
			}
		})
		.state('test',{
			abstract: true,
			url: '/test',
			templateUrl: 'templates/root.html',
			data: {
				header: {
					title: "Ahh yeaaa"
				}
			}
		})
		.state('test.tester',{
			url: '/tester',
			data: {
				base: true
			},
			views: {
				"header": { templateUrl: 'templates/header.html'},
				"main": { templateUrl: 'views/tester.html' },
				"tabs": { templateUrl: 'templates/tabs.html' }
			}
		})
		.state('foodLog',{
			abstract: true,
			data: {
				header: {
					title: 'Track Food!'
				}
			},
			templateUrl: 'templates/root.html',
			url: '/food'
		})
		.state('foodLog.index',{
			url: '/ahhhYeaa',
			data: {
				base: true
			},
			views: {
				"header": { templateUrl: 'templates/header.html'},
				"tabs": { templateUrl: 'templates/tabs.html' },
				"main": { templateUrl: 'views/foodTable.html', controller: 'FoodTableCtrl' }
			}
		});

	$urlRouterProvider.otherwise('/track/food');
});