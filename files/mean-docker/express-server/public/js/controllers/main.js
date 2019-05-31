angular.module('todoController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Todos', function($scope, $http, Todos) {
		$scope.idLocation = 0;
		$scope.createData = {};//储存注册信息
		$scope.landData = {}; //储存登陆信息
		$scope.showData = {};//储存当前已登陆信息
		$scope.todos = [];
		$scope.depositData = {};//储存存款信息
		$scope.transferData = {};//储存转账信息
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
				//设置id序号
				$scope.createData.id = $scope.todos.length;
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
		};
		$scope.deposit = function(id,oldBalance){
			$scope.loading = true;
			$scope.updateData.balance= $scope.depositData.balance+ oldBalance;

			Todos.update($scope.todos[id]._id,$scope.updateData)
				.success(function(data){
				$scope.loading = false;
				$scope.depositData = {};
				$scope.todos = data;
				$scope.showData = $scope.todos[id]; //更新当前登陆的用户的值
			});
		};

		$scope.transfer = function(fromID){
			$scope.loading = true;

			//更新转账者的数据
			$scope.updateData.balance = $scope.showData.balance - $scope.transferData.balance;
			Todos.update($scope.todos[fromID]._id,$scope.updateData)
				.success(function(data){
				$scope.todos = data;
			});
			$scope.updateData.balance = $scope.todos[$scope.transferData.id].balance + $scope.transferData.balance;//计算增加后的余额
			//更新被转账者的数据
			Todos.update($scope.todos[$scope.transferData.id]._id,$scope.updateData)
				.success(function(data){
				$scope.loading = false;
				$scope.transferData = {};
				$scope.todos = data;
				$scope.showData = $scope.todos[fromID];
			});
		};

	}]);
