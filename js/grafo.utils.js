// verifica se um vértice já foi visitado
function verticeVisitado(vertice, visitados) {
	for (var i = 0; i < visitados.length; i++)
		if(visitados[i] === vertice)
			return true;
	return false;
}

// obtém todos os vertices adjascentes
function obterVizinhos(vertice, adjascentes) {
	var vizinhos = [];
	for (var i = 0; i < adjascentes.length; i++) {
		if(i !== vertice && adjascentes[vertice][i])
			vizinhos.push(i);
	}
	return vizinhos;
}

// obtém primeiro vértice não visitado
function obterPrimeiroVerticeNaoVisitado(vertices, visitados, compareByName = true) {
	for(var i = 0; i < vertices.length; i++) {
		if(!compareByName) {
			i = vertices[i];
		}
		var visitado = false;
		for(var j = 0; j < visitados.length; j++)
			if(visitados[j] === i)
				visitado = true;
		if(!visitado)
			return i;
	}
	return null;
}

// obtém vértices adjascentes ainda não visitados
function obterVizinhosNaoVisitados(vizinhos, visitados) {
	var naoVisitados = []
	for (var i = 0; i < vizinhos.length; i++)
		if(!verticeVisitado(vizinhos[i], visitados))
			naoVisitados.push(vizinhos[i]);
	return naoVisitados;
}

function buscarEmLargura(grafo, atual, destino = null, fila = [], visitados = []) {
	if(verticeVisitado(atual, visitados))
		return visitados;
	if(!visitados.length)
		fila.push(atual);
	visitados.push(atual);
	if(visitados.length === grafo.V.length || (destino && atual === destino))
		return visitados;
	var vizinhos = obterVizinhosNaoVisitados(obterVizinhos(atual, grafo.a), visitados);
	for (var i = 0; i < vizinhos.length; i++)
		if(!verticeVisitado(vizinhos[i], fila))
			fila.push(vizinhos[i]);
	fila.splice(0, 1);
	if(!fila.length)
		fila.push(obterPrimeiroVerticeNaoVisitado(grafo.V, visitados));
	return buscarEmLargura(grafo, fila[0], destino, fila, visitados);
}

function buscarEmProfundidade(grafo, atual, destino = null, pilha = [], visitados = []) {
	pilha.push(atual);
	visitados.push(atual);
	if(destino && destino === atual)
		return visitados;
	var vizinhos = obterVizinhosNaoVisitados(obterVizinhos(atual, grafo.a), visitados);
	if(!vizinhos.length)
		pilha.pop();
	var proximo = (vizinhos.length) ? vizinhos[0] : obterPrimeiroVerticeNaoVisitado(grafo.V, visitados);
	return (proximo) ? buscarEmProfundidade(grafo, proximo, destino, pilha, visitados) : visitados;
}

// prepara estrutura de dados para o algoritmo de dijkstra
function dijkstraModelBuild(n) {
    var vertices = [];
    for (var i = 0; i < n; i++)
        vertices.push({
        	posicao: i,
            distancia: Infinity,
            anterior: null,
            aberto: true
        });
    return vertices;
}

// retrocede recursivamente o caminho do destino até o começo
function caminharAteComeco(vertices, atual, caminho = []) {
	caminho.push(atual);
	if(vertices[atual].distancia)
		return caminharAteComeco(vertices, vertices[atual].anterior, caminho);
	return caminho;
}

function dijkstra(matriz, atual, destino) {
    var vertices = dijkstraModelBuild(matriz.length);
    vertices[atual].distancia = 0;
    do {
    	if(atual === destino)
    		return caminharAteComeco(vertices, atual);
    	// atribuir distancia aos vizinhos
    	var vizinhos = obterVizinhos(atual, matriz);
    	for(var i = 0; i < vizinhos.length; i++) {
    		var v = vizinhos[i];
    		var caminhada = vertices[atual].distancia + matriz[atual][v];
    		if(caminhada < vertices[v].distancia) {
				vertices[v].distancia = caminhada;
				vertices[v].anterior = atual;    				
    		}
    	}
    	// definir proximo vertice aberto finito com menor distancia
    	vertices[atual].aberto = false;
    	var menorDistancia = Infinity;
    	var existeVerticeAbertoFinito = false;
    	for(var i = 0; i < vertices.length; i++) {
			if(vertices[i].aberto && vertices[i].distancia < Infinity) {
				existeVerticeAbertoFinito = true;
				if (vertices[i].distancia < menorDistancia) {
					atual = i;
				}
			}
    	}
    } while(existeVerticeAbertoFinito);
    return vertices;
}