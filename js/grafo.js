function Arco(posicao, valor, peso) {
	return {
		posicao: posicao,
		valor: valor,
		peso: peso
	}
}

function Grafo(direcionado = false, ponderado = false) {
	var cyGraph = cytoscape({
		container: document.getElementById("graph-container"),
		style: cytoscape.stylesheet()
				.selector('node')
				.css({
					'content': 'data(name)'
				})
	});
	return {
		interface: cyGraph,
		V: [],
		A: [],
		a: [],
		direcionado: direcionado,
		ponderado: ponderado,

		adicionarVertice: function (nome) {
			this.V.push(nome);
			this.A.push([]);
			this.a.push([]);
			for (var i = 0; i < this.a.length; i++)
				for (var j = this.a[i].length; j < this.V.length; j++)
					this.a[i].push(0);
			this.interface.add({
				group: "nodes",
				data: { id: this.V.length-1, name: nome }
			});
			this.interface.layout({
				name: 'random'
			}).run();
		},

		removerVertice: function (nome) {
			this.V.forEach(function(v, indice) {
				if(v === nome) {
					this.V.splice(indice, 1);
					this.A.splice(indice, 1);
					this.a.splice(indice, 1);
					this.a.forEach(function(j) {
						j.splice(indice, 1);
					});
				}
			});
		},

		adicionarAresta: function(origem, destino, peso) {
			if(this.direcionado) return this.adicionarArco(origem, destino, peso);
			peso = (this.ponderado) ? peso || 1 : 1;
			this.a[origem][destino] = peso;
			this.a[destino][origem] = peso;
			this.A[origem].push(Arco(destino, this.V[destino]));
			this.A[destino].push(Arco(origem, this.V[origem], peso));
			this.interface.add({ group: "edges", data: { id: origem+" "+destino, source: origem, target: destino } });
		},

		removerAresta: function(origem, destino) {
			if(this.direcionado) return this.removerArco(origem, destino);
			this.a[origem][destino] = 0;
			this.a[destino][origem] = 0;
			for (var i = 0; i < this.A[origem].length; i++) {
				if(this.A[origem][i].posicao === destino)
					this.A[origem].splice(i, 1);
			}
			for (var i = 0; i < this.A[destino].length; i++) {
				if(this.A[destino][i].posicao === origem)
					this.A[destino].splice(i, 1);
			}			
		},

		adicionarArco: function(origem, destino, peso) {
			peso = (this.ponderado) ? peso || 1 : 1;
			if(!this.direcionado) return this.adicionarAresta(origem, destino);			

			this.a[origem][destino] = peso;
			this.A[origem].push(Arco(destino, this.V[destino], peso));
		},

		removerArco: function(origem, destino) {
			if(!this.direcionado) return this.removerAresta(origem, destino);
			this.a[origem][destino] = 0;
			for (var i = 0; i < this.A[origem].length; i++) {
				if(this.A[origem][i].posicao === destino)
					this.A[origem].splice(i, 1);
			}
		},

		retornarVertice: function(nome) {
			var retorno = false;
			this.V.forEach(function(v) {
				if(nome === v)
					retorno = true;
			});
			return retorno;
		},

		retornarPosicaoVertice: function(nome) {
			this.V.forEach(function(v, posicao) {
				if(nome === v) {
					return posicao;
				}
			});
			return 0;
		},
		
		existeAresta: function(origem, destino) {
			return this.a[origem][destino];
		},

		retornarArestas: function(origem) {
			var adjascentes = [];
			for (var i = 0; i < this.V.length; i++)
				if(i !== origem && this.a[origem][i])
					adjascentes.push(i);
			return adjascentes;
		},
		
		obterVizinhos: function(origem) {
			return this.retornarArestas(origem);
		}
	}
}