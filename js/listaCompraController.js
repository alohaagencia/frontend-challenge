angular.module("listaCompra", []).controller("listaCompraController", function($scope){

	$scope.produtos = [
		{
			"_id": 1,
			"title": "Tomate",
			"status": 1,
			"price": 2.15,
			"created_at":  "2017-03-03T19:08:06.005Z"
		},

		{
			"_id": 2,
			"title": "Bacon",
			"status": 1,
			"price": 6.70,
			"created_at":  "2017-03-03T19:08:06.005Z"
		},

		{
			"_id": 3,
			"title": "Hamburger",
			"status": 1,
			"price": 3.45,
			"created_at":  "2017-03-03T19:08:06.005Z"
		}
	];

	$scope.formNovoProduto = false;
	$scope.valorTotal = 0;
	$scope.produto = {
		"_id": 3,
		"title": "",
		"status": 1,
		"price": 0,
		"created_at": new Date()

	};

	calculaTotal = function(){
		$scope.valorTotal = 0;

		angular.forEach($scope.produtos, function(item) {
			$scope.valorTotal = $scope.valorTotal + item.price;
		});
	}

	$scope.showForm = function(){
		$scope.formNovoProduto = true;
	}

	$scope.hideForm = function(){
		$scope.formNovoProduto = false;

		$scope.produto.title = '';
		$scope.produto.price = 0;
		$scope.produto.status = 1;
	}

	$scope.salvarNovo = function(produto){
		$scope.produto._id++;

		$scope.produtos.push(angular.copy(produto));

		$scope.produto.title = '';
		$scope.produto.price = 0;
		$scope.produto.status = 1;

		$scope.formNovoProduto = false;

		calculaTotal();
	}

	$scope.excluiItem = function(item){
		console.log(item)

		var index = $scope.produtos.indexOf(item);
  		$scope.produtos.splice(index, 1);

  		calculaTotal();
	}
});