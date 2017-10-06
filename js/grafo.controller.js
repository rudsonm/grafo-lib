(function() {

angular.module("Module", []);
angular.module("Module").controller("GrafoController", GrafoController);
function GrafoController($scope) {
	'use strict';

	var EXERCICIO_4_INSTANCE = Grafo(false, true);
	
	EXERCICIO_4_INSTANCE.adicionarVertice("A");
	EXERCICIO_4_INSTANCE.adicionarVertice("B");
	EXERCICIO_4_INSTANCE.adicionarVertice("C");
	EXERCICIO_4_INSTANCE.adicionarVertice("D");
	EXERCICIO_4_INSTANCE.adicionarVertice("E");
	EXERCICIO_4_INSTANCE.adicionarVertice("F");
	
	EXERCICIO_4_INSTANCE.adicionarAresta(0, 1, 1);
	EXERCICIO_4_INSTANCE.adicionarAresta(0, 2, 5);
	EXERCICIO_4_INSTANCE.adicionarAresta(1, 3, 4);
	EXERCICIO_4_INSTANCE.adicionarAresta(1, 4, 6);
	EXERCICIO_4_INSTANCE.adicionarAresta(2, 4, 1);
	EXERCICIO_4_INSTANCE.adicionarAresta(2, 5, 2);
	EXERCICIO_4_INSTANCE.adicionarAresta(3, 5, 15);
	EXERCICIO_4_INSTANCE.adicionarAresta(4, 5, 7);

	$scope.Grafo = EXERCICIO_4_INSTANCE;

	colorirGrafo($scope.Grafo, dSatur($scope.Grafo));
	//colorirGrafo($scope.Grafo, welshPowell($scope.Grafo));

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
		console.log($scope.busca.sequencia);
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