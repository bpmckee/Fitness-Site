app.controller('FoodTableCtrl',['$scope',function($scope){
	$scope.dataLog = [
		{
			name:'Meal',
			type:'meal',
			nutrition:[1,2,3,4,5,6],
			children:[]
		},
		{
			name:'Meal Ingr',
			type:'meal',
			nutrition:[1,2,3,4,5,6],
			children: [
				{
					name: 'Meal Ingr',
					type: 'ingr',
					brand: 'Roundy\'s',
					servings: '12" sub',
					nutrition:[1,2,3,4,5,6]
				}
			]
		},
		{
			name:'Meal Ingr Ingr',
			type:'meal',
			nutrition:[1,2,3,4,5,6],
			children: [
				{
					name: 'Meal Ingr Ingr',
					type: 'ingr',
					brand: 'Roundy\'s',
					servings: '12" sub',
					nutrition:[1,2,3,4,5,6]
				},
				{
					name: 'Meal Ingr Ingr',
					type: 'ingr',
					brand: 'Roundy\'s',
					servings: '12" sub',
					nutrition:[1,2,3,4,5,6]
				}
			]
		},
		{
			name:'Meal Ingr Ingr Ingr',
			type:'meal',
			nutrition:[1,2,3,4,5,6],
			children: [
				{
					name: 'Meal Ingr Ingr Ingr',
					type: 'ingr',
					brand: 'Roundy\'s',
					servings: '12" sub',
					nutrition:[1,2,3,4,5,6]
				},
				{
					name: 'Meal Ingr Ingr Ingr',
					type: 'ingr',
					brand: 'Roundy\'s',
					servings: '12" sub',
					nutrition:[1,2,3,4,5,6]
				}
			]
		},
		{
			name:'Meal Food',
			type:'food',
			nutrition:[1,2,3,4,5,6],
			children: [
				{
					name: 'Meal Food',
					type: 'food',
					children: [],
					nutrition:[1,2,3,4,5,6]
				}
			]
		},
		{
			name:'Meal Food Food',
			type:'food',
			nutrition:[1,2,3,4,5,6],
			children: [
				{
					name: 'Meal Food Food',
					type: 'food',
					nutrition:[1,2,3,4,5,6],
					children: []
				},
				{
					name: 'Meal Food Food',
					type: 'food',
					nutrition:[1,2,3,4,5,6],
					children: []
				}
			]
		},
		{
			name:'Meal Food Food Food',
			type:'food',
			nutrition:[1,2,3,4,5,6],
			children: [
				{
					name: 'Meal Food Food Food',
					type: 'food',
					nutrition:[1,2,3,4,5,6],
					children: []
				},
				{
					name: 'Meal Food Food Food',
					type: 'food',
					nutrition:[1,2,3,4,5,6],
					children: []
				},
				{
					name: 'Meal Food Food Food',
					type: 'food',
					nutrition:[1,2,3,4,5,6],
					children: []
				}
			]
		},
		{
			name: 'Meal Ingr Food',
			type: 'meal',
			nutrition:[1,2,3,4,5,6],
			children: [
				{
					name: 'Meal Ingr Food',
					type: 'ingr',
					brand: 'test brand',
					servings: 'test servings',
					nutrition:[1,2,3,4,5,6],
				},
				{
					name: 'Meal Ingr Food',
					type:'food',
					nutrition:[1,2,3,4,5,6],
					children:[]
				}
			]
		},
		{
			name: 'Meal Food Ingr',
			type: 'meal',
			nutrition:[1,2,3,4,5,6],
			children: [
				{
					name: 'Meal Food Ingr',
					type:'food',
					nutrition:[1,2,3,4,5,6],
					children:[]
				},
				{
					name: 'Meal Food Ingr',
					type: 'ingr',
					brand: 'test brand',
					servings: 'test servings',
					nutrition:[1,2,3,4,5,6],
				}
			]
		},
		{
			name: 'Meal Ingr Food Ingr',
			type: 'meal',
			nutrition:[1,2,3,4,5,6],
			children: [
				{
					name: 'Meal Ingr Food Ingr',
					type: 'ingr',
					brand: 'test brand',
					servings: 'test servings',
					nutrition:[1,2,3,4,5,6],
				},
				{
					name: 'Meal Ingr Food Ingr',
					type:'food',
					nutrition:[1,2,3,4,5,6],
					children:[]
				},
				{
					name: 'Meal Ingr Food Ingr',
					type: 'ingr',
					brand: 'test brand',
					servings: 'test servings',
					nutrition:[1,2,3,4,5,6]
				}
			]
		},
		{
			name: 'Meal Food Ingr Food',
			type: 'meal',
			nutrition:[1,2,3,4,5,6],
			children: [
				{
					name: 'Meal Food Ingr Food',
					type:'food',
					nutrition:[1,2,3,4,5,6],
					children:[]
				},
				{
					name: 'Meal Food Ingr Food',
					type: 'ingr',
					brand: 'test brand',
					servings: 'test servings',
					nutrition:[1,2,3,4,5,6]
				},
				{
					name: 'Meal Food Ingr Food',
					type:'food',
					nutrition:[1,2,3,4,5,6],
					children:[]
				}
			]
		},
		{
			name: 'Meal Food - Ingr',
			type: 'meal',
			nutrition:[1,2,3,4,5,6],
			children: [
				{
					name: 'Meal Food - Ingr',
					type:'food',
					nutrition:[1,2,3,4,5,6],
					children:[
						{
							name: 'Meal Food - Ingr',
							type: 'ingr',
							brand: 'test brand',
							servings: 'test servings',
							nutrition:[1,2,3,4,5,6]
						}
					]
				}
			]
		},
		{
			name: 'Meal Food - Ingr Ingr',
			type: 'meal',
			nutrition:[1,2,3,4,5,6],
			children: [
				{
					name: 'Meal Food - Ingr Ingr',
					type:'food',
					nutrition:[1,2,3,4,5,6],
					children:[
						{
							name: 'Meal Food - Ingr Ingr',
							type: 'ingr',
							brand: 'test brand',
							servings: 'test servings',
							nutrition:[1,2,3,4,5,6]
						},
						{
							name: 'Meal Food - Ingr Ingr',
							type: 'ingr',
							brand: 'test brand',
							servings: 'test servings',
							nutrition:[1,2,3,4,5,6]
						}
					]
				}
			]
		},
		{
			name: 'Meal Food - Ingr Ingr Ingr',
			type: 'meal',
			nutrition:[1,2,3,4,5,6],
			children: [
				{
					name: 'Meal Food - Ingr Ingr Ingr',
					type:'food',
					nutrition:[1,2,3,4,5,6],
					children:[
						{
							name: 'Meal Food - Ingr Ingr Ingr',
							type: 'ingr',
							brand: 'test brand',
							servings: 'test servings',
							nutrition:[1,2,3,4,5,6]
						},
						{
							name: 'Meal Food - Ingr Ingr Ingr',
							type: 'ingr',
							brand: 'test brand',
							servings: 'test servings',
							nutrition:[1,2,3,4,5,6]
						},
						{
							name: 'Meal Food - Ingr Ingr Ingr',
							type: 'ingr',
							brand: 'test brand',
							servings: 'test servings',
							nutrition:[1,2,3,4,5,6]
						}
					]
				}
			]
		},
		{
			name: 'Meal Food - Ingr, Ingr',
			type: 'meal',
			nutrition:[1,2,3,4,5,6],
			children: [
				{
					name: 'Meal Food - Ingr, Ingr',
					type:'food',
					nutrition:[1,2,3,4,5,6],
					children:[
						{
							name: 'Meal Food - Ingr, Ingr',
							type: 'ingr',
							brand: 'test brand',
							servings: 'test servings',
							nutrition:[1,2,3,4,5,6]
						}
					]
				},
				{
					name: 'Meal Food - Ingr, Ingr',
					type: 'ingr',
					brand: 'test brand',
					servings: 'test servings',
					nutrition:[1,2,3,4,5,6]
				}
			]
		}
	];
}]);