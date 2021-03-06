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
			var vertice = vertices[i];
			if(vertice.aberto && vertice.distancia < Infinity) {
				existeVerticeAbertoFinito = true;
				if (vertice.distancia < menorDistancia) {
					menorDistancia = vertice.distancia;
					atual = i;
				}
			}
    	}
    } while(existeVerticeAbertoFinito);
    return vertices;
}

function coloracaoModelBuild(grafo) {
	var coloracaoModel = [];
	for(let i = 0; i < grafo.V.length; i++) {
		coloracaoModel.push({
			posicao: i,
			nome: grafo.V[i],
			grau: grafo.obterVizinhos(i).length,
			saturacao: 0,
			cor: null
		});
	}
	coloracaoModel.sort((a, b) => b.grau - a.grau);
	return coloracaoModel;
}

function existeVizinhoComMesmaCor(grafo, atual, vertices, cor) {
	for(let i = 0; i < vertices.length; i++) {
		vertice = vertices[i];
		var vizinhos = Boolean(grafo.a[atual.posicao][vertice.posicao]);
		if(vizinhos && vertice.cor === cor)
			return true;
	}
	return false;
}

function obterCoresPadrao() {
	return ['#2ecc71', '#f1c40f', '#2980b9', '#e74c3c', '#2c3e50', '#8e44ad', '#d35400', '#16a085', '#7f8c8d'];
}

function welshPowell(grafo, cores) {
	cores = cores || obterCoresPadrao();
	var verticesNaoColoridos = coloracaoModelBuild(grafo);
	var verticesColoridos = [];
	do {
		var corAtual = cores.shift();
		for(let i = 0; i < verticesNaoColoridos.length; i++) {
			var vertice = verticesNaoColoridos[i];
			var existeVizinho = existeVizinhoComMesmaCor(grafo, vertice, verticesColoridos, corAtual);
			if(!existeVizinho) {
				vertice.cor = corAtual;
				verticesNaoColoridos.splice(i--, 1);
				verticesColoridos.push(vertice);
			}
		}
	} while(verticesNaoColoridos.length && cores.length);
	return verticesColoridos;
}

function dSatur(grafo, cores) {
	cores = cores || obterCoresPadrao();
	var verticesNaoColoridos = coloracaoModelBuild(grafo);
	var verticesColoridos = [verticesNaoColoridos.shift()];
	verticesColoridos[0].cor = cores[0];
	do {
		var vertice = verticesNaoColoridos[0];
		var indice = 0;
		for(let i = 1; i < verticesNaoColoridos; i++) {
			var satAtual = verticesNaoColoridos[i].saturacao;
			var sat = vertice.saturacao;
			if(satAtual > sat || (satAtual === sat && verticesNaoColoridos[i].grau > vertice.grau)) {
				vertice = verticesNaoColoridos[i];
				indice = i;
			}
		}
		for(let i = 0; i < cores.length; i++) {
			var cor = cores[i];
			if(!existeVizinhoComMesmaCor(grafo, vertice, verticesColoridos, cor)) {
				for(let vizinho of verticesNaoColoridos) {
					if(Boolean(grafo.existeAresta(vertice.posicao, vizinho.posicao))) {
						if(!existeVizinhoComMesmaCor(grafo, vizinho, verticesColoridos, cor)){
							vizinho.saturacao++;
						}
					}
				}
				vertice.cor = cor;
				verticesNaoColoridos.splice(indice, 1);
				verticesColoridos.push(vertice);
				break;
			}
		}
	} while(verticesNaoColoridos.length && cores.length);
	return verticesColoridos;
}

function colorirGrafo(grafo, vertices) {
	for(let i = 0; i < vertices.length; i++) {
		var vertice = vertices[i];
		grafo.interface.$("#"+vertice.posicao).css("background-color", vertice.cor);
	}
	grafo.interface.layout({
		name: 'random'
	}).run();
}