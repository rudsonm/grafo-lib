(function() {

angular.module("Module", []);
angular.module("Module").controller("GrafoController", GrafoController);
function GrafoController($scope) {
	'use strict';
	var B_INSTANCE = Grafo(false, false);
	
	B_INSTANCE.adicionarVertice('A');
	B_INSTANCE.adicionarVertice('B');
	B_INSTANCE.adicionarVertice('C');
	B_INSTANCE.adicionarVertice('D');
	B_INSTANCE.adicionarVertice('E');
	B_INSTANCE.adicionarVertice('F');
	
	B_INSTANCE.adicionarAresta(2, 1, 1);
	B_INSTANCE.adicionarAresta(3, 1, 1);
	B_INSTANCE.adicionarAresta(3, 2, 1);
	B_INSTANCE.adicionarAresta(5, 0, 1);
	B_INSTANCE.adicionarAresta(5, 1, 1);
	B_INSTANCE.adicionarAresta(5, 2, 1);
	B_INSTANCE.adicionarAresta(5, 3, 1);
	B_INSTANCE.adicionarAresta(5, 4, 1);
	$scope.Grafo = B_INSTANCE;
	var verticesColoridos = dSatur($scope.Grafo);
	console.log(verticesColoridos);
	colorirGrafo($scope.Grafo, verticesColoridos);

	// colorirGrafo($scope.Grafo, dSatur($scope.Grafo));
	// getInstance("costa/strike.net", function(instancia) {
	// 	$scope.Grafo = instancia;
	// 	$scope.$apply();

	// 	var verticesColoridos = dSatur($scope.Grafo);
	// 	colorirGrafo($scope.Grafo, verticesColoridos);
	// });

	$scope.buscarEmProfundidade = function(origem, destino = null) {
		$scope.busca = {
			tipo: "Profundidade",
			sequencia: buscarEmProfundidade($scope.Grafo, origem, destino)
		}
	}

	$scope.buscarEmLargura = function(origem, destino = null) {
		$scope.busca = {
			tipo: "Largura",
			sequencia: buscarEmLargura($scope.Grafo, origem, destino)
		}
	}

	$scope.dijkstra = function(origem, destino = null) {
		$scope.busca = {
			tipo: "Dijkstra",
			sequencia: dijkstra($scope.Grafo.a, origem, destino)
		}
	}

	$scope.instanciarGrafo = function(direcionado, ponderado) {
		$scope.Grafo = Grafo(direcionado, ponderado);
		console.log($scope.Grafo);
	}

	$scope.existeVertice = function(nome) {
		alert($scope.Grafo.retornarVertice(nome));
	}

	$scope.existeAresta = function(origem, destino) {
		alert($scope.Grafo.existeAresta(origem, destino));
	}
}

})();