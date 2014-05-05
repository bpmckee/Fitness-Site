app.service('navService',function(){
	this.links = [
		{ label: 'Home', ref: '/', icon: 'home' },
		{ label: 'Track', ref: 'trackFood.index', icon: 'plus' },
		{ label: 'Nutrition', ref: 'test.tester', icon: 'cutlery' },
		{ label: 'Workouts', ref: 'foodLog.index', icon: 'dribbble' },
		{ label: 'Knowledge', ref: '#', icon: 'lightbulb-o' },
		{ label: 'Stats', ref: '#', icon: 'bar-chart-o' },
		{ label: 'Forums', ref: '#', icon: 'comments-o' },
		{ label: 'Challenges', ref: '#', icon: 'trophy' },
		{ label: 'Profile', ref: '#', icon: 'user' }
	];
});