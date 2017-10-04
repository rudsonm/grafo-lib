function getInstanceFile(path, callback) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
	 		callback(this.responseText);
		}
	};
	xhttp.open("GET", "instances/"+path, true);
	xhttp.send();
}

function getInstance(path, callback) {
	getInstanceFile(path, function(file) {
		var grafo = Grafo(false, false);
		var vertices = file.split("*Edges")[0]
						   .replace("ellipse", "")
						   .replace("box", "")
						   .replace("Vertices", "")
						   .match(/[A-Za-z]+/g);
		for(var i = 0; i < vertices.length; i++)
			if(vertices[i] !== "box" && vertices[i] !== "ellipse")
				grafo.adicionarVertice(vertices[i]);
		
		var arcos = file.split("*Edges")[1].match(/[0-9]+/g);
		for(var i = 0; i+3 < arcos.length; i += 3)
			grafo.adicionarArco(arcos[i]-1, arcos[i+1]-1, arcos[i+2]-1);
		
		callback(grafo);
	});		
}