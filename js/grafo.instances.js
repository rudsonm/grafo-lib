var A_INSTANCE = Grafo(true, true);

A_INSTANCE.adicionarVertice('A');
A_INSTANCE.adicionarVertice('B');
A_INSTANCE.adicionarVertice('C');
A_INSTANCE.adicionarVertice('D');
A_INSTANCE.adicionarVertice('E');
A_INSTANCE.adicionarVertice('F');
A_INSTANCE.adicionarVertice('G');

A_INSTANCE.adicionarArco(0, 3, 1);
A_INSTANCE.adicionarArco(2, 0, 2);
A_INSTANCE.adicionarArco(1, 2, 3);
A_INSTANCE.adicionarArco(1, 4, 4);
A_INSTANCE.adicionarArco(3, 1, 5);
A_INSTANCE.adicionarArco(3, 4, 5);
A_INSTANCE.adicionarArco(4, 2, 4);
A_INSTANCE.adicionarArco(4, 5, 3);
A_INSTANCE.adicionarArco(5, 1, 2);
A_INSTANCE.adicionarArco(6, 1, 1);

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