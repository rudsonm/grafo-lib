Array.prototype.firstOrNull = function () {
	return (this.length) ? this[0] : null;
}

Array.prototype.copy = function () {
	return Object.assign([], this);
}

class Arc {
	constructor(source, target, weight = 1) {
		this.source = source;
		this.target = target;
		this.weight = weight;
	}
}

class Grafo {
	constructor(directed, weighted) {
		this.vivaGraph = Viva.Graph.graph();

		this.render = function () {			
			var container = document.getElementById("graphDiv");
			var spans = container.getElementsByTagName("span");
			for(let i = spans.length - 1; i >= 0; i--) {
				spans[i].remove();
			}
			var svg = container.getElementsByTagName("canvas").item(0);
			if(svg) svg.remove();			

			var layout = Viva.Graph.Layout.forceDirected(this.vivaGraph, {
				springLength: 100,
				springCoeff: 0.0008,
				dragCoeff: 0.02,
				gravity: -1.2
			});

			var labels = Object.create(null);
			this.vivaGraph.forEachNode(function (node) {
				var label = document.createElement('span');
				label.classList.add('node-label');
				label.innerText = node.id;
				labels[node.id] = label;
				container.appendChild(label);
			});

			var graphics = Viva.Graph.View.webglGraphics();
			graphics.placeNode(function (ui, pos) {
				var domPos = {
					x: pos.x,
					y: pos.y
				};
				graphics.transformGraphToClientCoordinates(domPos);
				var nodeId = ui.node.id;
				var labelStyle = labels[nodeId].style;
				labelStyle.left = domPos.x + 'px';
				labelStyle.top = domPos.y + 'px';
			});

			this.renderer = Viva.Graph.View.renderer(this.vivaGraph, {
				container: container,
				layout: layout,
				graphics: graphics
			}).run();
		}

		this.directed = directed;
		this.weighted = weighted;
		this.vertices = new Array();
		this.list = new Array();
		this.matrix = new Array();

		this.addVertice = addVertice;
		this.removeVertice = removeVertice;
		this.getIndexOfVertice = getIndexOfVertice;
		this.getVertice = getVertice;
		this.addArc = addArc;
		this.removeArc = removeArc;
		this.addEdge = addEdge;
		this.removeEdge = removeEdge;
		this.getArc = getArc;
		this.isConnected = isConnected;
		this.getNeighbors = getNeighbors;
		this.getNeighborsByIndex = getNeighborsByIndex;

		this.hasTreeCicle = hasTreeCicle;
		this.planarity = planarity;
	}
}

function addVertice(vertice) {
	vertice = vertice || document.getElementById("vertice.nome").value;
	document.getElementById("vertice.nome").value = "";
	
	this.vertices.push(vertice);
	this.list.push(new Array());
	this.matrix.push(new Array());
	for (let i = 0; i < this.matrix.length; i++) {
		for (let j = this.matrix[i].length; j < this.matrix.length; j++) {
			this.matrix[i].push(0);
		}
	}
	
	this.vivaGraph.addNode(vertice);
}

function removeVertice(vertice) {
	let index = this.vertices.filter(v => v == vertice).firstOrNull();
	if (!index)
		return false;
	this.vertices.splice(index, 1);
	this.list.splice(index, 1);
	for (let i = 0; i < this.matrix.length; i++) {
		this.matrix[i].splice(index, 1);
		index = this.list[i].filter(v => v == vertice).firstOrNull();
		if (index)
			this.list[i].splice(index, 1);
	}
}

function getIndexOfVertice(vertice) {
	return this.vertices.indexOf(vertice);
}

function getVertice(vertice) {
	if (typeof (vertice) === "string")
		vertice = this.vertices.indexOf(vertice);
	return this.vertices[vertice];
}

function addEdge(source, target, weight = 1) {
	if(source !== 0 && !source)
		source = document.getElementById("aresta.origem").value;
	document.getElementById("aresta.origem").value = "";
	if (target !== 0 && !target)
		target = document.getElementById("aresta.destino").value;
	document.getElementById("aresta.destino").value = "";	

	if (typeof (source) === "string")
		source = this.vertices.indexOf(source);
	if (typeof (target) === "string")
		target = this.vertices.indexOf(target);	

	this.addArc(source, target, weight);
	this.addArc(target, source, weight);
	this.vivaGraph.addLink(this.vertices[source], this.vertices[target]);
}

function addArc(source, target, weight = 1) {
	if (typeof (source) === "string")
		source = this.vertices.indexOf(source);
	if (typeof (target) === "string")
		target = this.vertices.indexOf(target);
	this.matrix[source][target] = weight;
	let arc = new Arc(source, target, weight);
	this.list[source].push(arc);
}

function removeEdge(source, target) {
	if (typeof (source) === "string")
		source = this.getIndexOfVertice(source);
	if (typeof (target) === "string")
		target = this.getIndexOfVertice(target);
	this.removeArc(source, target);
	this.removeArc(target, source);
}

function removeArc(source, target) {
	if (typeof (source) === "string")
		source = this.getIndexOfVertice(source);
	if (typeof (target) === "string")
		target = this.getIndexOfVertice(target);
	this.matrix[source][target] = 0;
	let index = this.list[source]
		.filter(v => v.source == source && v.target == target)
		.map((v, i) => i)
		.firstOrNull();
	this.list[source].splice(index, 1);
}

function getArc(source, target) {
	if (typeof (source) === "string")
		source = this.vertices.indexOf(source);
	if (typeof (target) === "string")
		target = this.vertices.indexOf(target);
	return this.list[source].filter(arc => arc.target === target).firstOrNull();
}

function getNeighbors(source) {
	let index = this.vertices.indexOf(source);
	return this.getNeighborsByIndex(index);
}

function getNeighborsByIndex(source) {
	return this.list[source].map(s => this.getVertice(s.target));
}

function isConnected(source, target) {	
	if (typeof (source) === "string")
		source = this.vertices.indexOf(source);
	if (typeof (target) === "string")
		target = this.vertices.indexOf(target);
	return Boolean(this.matrix[source][target]);
}

function hasTreeCicle() {
	for (const first of this.vertices) {
		let firstNeighbors = this.getNeighbors(first);
		for (const second of firstNeighbors) {
			let secondNeighbors = this.getNeighbors(second);
			for (const third of secondNeighbors) {
				if (this.isConnected(first, third))
					return true;
			}
		}
	}
}

function planarity() {
	let numberOfNodes = this.vertices.length;	
	if (numberOfNodes <= 2)
		return true;
	let numberOfEdges = this.list.map(edges => edges.length).reduce((a, b) => a + b);
	if (!this.directed)
		numberOfEdges /= 2;	
	if(this.hasTreeCicle() && numberOfNodes >= 3 && numberOfEdges <= 3 * numberOfNodes - 6)
		return true;
	if(!this.hasTreeCicle() && numberOfNodes >= 3 && numberOfEdges <= 2 * numberOfNodes - 4)
		return true;

	return false;
}

var grafo = new Grafo(false, true);

grafo.addVertice("A");
grafo.addVertice("B");
grafo.addVertice("C");
grafo.addVertice("D");
grafo.addVertice("E");
grafo.addVertice("F");
// grafo.addVertice("G");

grafo.addEdge("A", "D");
grafo.addEdge("A", "E");
grafo.addEdge("A", "F");
grafo.addEdge("B", "D");
grafo.addEdge("B", "E");
grafo.addEdge("B", "F");
grafo.addEdge("C", "D");
grafo.addEdge("C", "E");
grafo.addEdge("C", "F");

// grafo.addEdge("A", "B", 10);
// grafo.addEdge("A", "C", 9);
// grafo.addEdge("B", "C", 8);
// grafo.addEdge("D", "E", 7);
// grafo.addEdge("D", "F", 6);
// grafo.addEdge("D", "A", 5);
// grafo.addEdge("E", "B", 4);
// grafo.addEdge("E", "A", 3);
// grafo.addEdge("F", "B", 2);
// grafo.addEdge("G", "A", 1);
// grafo.addEdge("G", "B", 2);
// grafo.addEdge("G", "D", 3);
// grafo.addEdge("G", "E", 4);

function prim(grafo) {
	let edges = new Array();
	let vertices = grafo.vertices.copy();
	let nextRemovedVertice = Math.random() * vertices.length - 1;
	nextRemovedVertice = vertices.splice(nextRemovedVertice, 1).firstOrNull();
	let removedVertices = [nextRemovedVertice];
	while (vertices.length) {
		let minArc = new Arc(null, null, Infinity);
		for (let vertice of removedVertices) {
			let neighbors = grafo.getNeighbors(vertice).filter(n => vertices.some(v => v === n));
			for (let neighbor of neighbors) {
				let arc = grafo.getArc(vertice, neighbor);
				if (arc.weight < minArc.weight) {
					minArc = new Arc(arc.source, arc.target, arc.weight);
					nextRemovedVertice = neighbor;
				}
			}
		}
		edges.push(minArc);
		let indexOfVertice = vertices.indexOf(nextRemovedVertice);
		vertices.splice(indexOfVertice, 1);
		removedVertices.unshift(nextRemovedVertice);
	}

	let primGraph = new Grafo(grafo.directed, grafo.weighted);
	for (let v of grafo.vertices)
		primGraph.addVertice(v);
	for (let edge of edges)
		primGraph.addEdge(edge.source, edge.target, edge.weight);
	alert(edges.map(e => e.weight).reduce((a,b) => a + b));
	return primGraph;
}

function kruskal(grafo) {
	let edges = new Array();
	let removedEdges = new Array();
	for(let edges of grafo.list)
		removedEdges = removedEdges.concat(edges);
	
	let forest = grafo.vertices.map(v => [v]);
	removedEdges.sort((a, b) => b.weight - a.weight);
	while(edges.length < grafo.vertices.length - 1) {
		let minEdge = removedEdges.pop();
		let source = grafo.getVertice(minEdge.source);
		let target = grafo.getVertice(minEdge.target);
		let sourceTree = forest.map((t, i) => [i, t]).filter(tree => tree[1].some(v => v === source)).firstOrNull();
		let targetTree = forest.map((t, i) => [i, t]).filter(tree => tree[1].some(v => v === target)).firstOrNull();
		if(sourceTree[0] !== targetTree[0]) {
			edges.push(minEdge);
			forest[sourceTree[0]] = forest[sourceTree[0]].concat(forest[targetTree[0]]);
			forest.splice(targetTree[0], 1);
		}
	}
	let kruskalGraph = new Grafo(false, true);
	for(let vertice of forest.filter(tree => tree.length).firstOrNull())
		kruskalGraph.addVertice(vertice);
	for(let edge of edges)
		kruskalGraph.addEdge(edge.source, edge.target, edge.weight);

	alert(edges.map(e => e.weight).reduce((a,b) => a + b));
	return kruskalGraph;
}
