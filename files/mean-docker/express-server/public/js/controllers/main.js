angular.module('todoController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Todos', function($scope, $http, Todos) {
		$scope.formData = {};

		$scope.idLocation = $scope.todos.length;
		$scope.createData = {};
		$scope.landData = {};
		$scope.showData = {};

		$scope.updateData = {};
		$scope.loading = true;
		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Todos.get()
			.success(function(data) {
				$scope.todos = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createTodo = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.createData.username != undefined && $scope.createData.password != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Todos.create($scope.createData)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.createData = {}; // clear the form so our user is ready to enter another
						$scope.todos = data; // assign our new list of todos
					});
			}


		};

		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteTodo = function(id) {
			$scope.loading = true;

			Todos.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.todos = data; // assign our new list of todos
				});
		};
		
		//更新用户存款
		$scope.updateBalance = function(id) {
			$scope.loading = true;
			//设置id序号
			$scope.updateData.id = $scope.idLocation;
			$scope.idLocation = $scope.idLocation + 1;
			Todos.update(id,$scope.updateData)
				.success(function(data){
					$scope.loading = false;
					$scope.updateData = {}; // clear the form so our user is ready to enter another
					$scope.todos = data; // assign our new list of todos
				});
			$scope.loading = false;
		};
		
		//登陆
		$scope.land = function(){
			$scope.loading = true;
			Todos.userland($scope.landData)
				.success(function(data){
					$scope.loading = false;
					$scope.landData = {};
					$scope.showData = data;
			});
		}
		//通过删除的方法更新用户存款（没用了）
		/*$scope.updateBalance2 = function(id,name) {
			$scope.loading = true;
			$scope.updateData.username = name;
			Todos.delete(id)
				.success(function(data) {
					$scope.todos = data; // assign our new list of todos
				});
			Todos.create($scope.updateData)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.formData = {}; // clear the form so our user is ready to enter another
					$scope.todos = data; // assign our new list of todos
				});
		};*/
	}]);
