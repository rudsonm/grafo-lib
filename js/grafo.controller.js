(function() {

angular.module("Module", []);
angular.module("Module").controller("GrafoController", GrafoController);
function GrafoController($scope) {
	'use strict';
	$scope.Grafo;
	getInstance("costa/sawmill.net", function(instancia) {
		$scope.Grafo = instancia;
		$scope.$apply();
	});

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