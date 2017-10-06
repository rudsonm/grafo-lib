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

var EXERCICIO_1_INSTANCE = Grafo(false, false);

EXERCICIO_1_INSTANCE.adicionarVertice("A");
EXERCICIO_1_INSTANCE.adicionarVertice("B");
EXERCICIO_1_INSTANCE.adicionarVertice("C");
EXERCICIO_1_INSTANCE.adicionarVertice("D");
EXERCICIO_1_INSTANCE.adicionarVertice("E");
EXERCICIO_1_INSTANCE.adicionarVertice("F");

EXERCICIO_1_INSTANCE.adicionarAresta(0, 3);
EXERCICIO_1_INSTANCE.adicionarAresta(0, 5);
EXERCICIO_1_INSTANCE.adicionarAresta(1, 2);
EXERCICIO_1_INSTANCE.adicionarAresta(1, 4);
EXERCICIO_1_INSTANCE.adicionarAresta(2, 5);
EXERCICIO_1_INSTANCE.adicionarAresta(3, 4);
EXERCICIO_1_INSTANCE.adicionarAresta(4, 1);

var EXERCICIO_2_INSTANCE = Grafo(false, false);

EXERCICIO_2_INSTANCE.adicionarVertice("A");
EXERCICIO_2_INSTANCE.adicionarVertice("B");
EXERCICIO_2_INSTANCE.adicionarVertice("C");
EXERCICIO_2_INSTANCE.adicionarVertice("D");
EXERCICIO_2_INSTANCE.adicionarVertice("E");

EXERCICIO_2_INSTANCE.adicionarAresta(0, 1);
EXERCICIO_2_INSTANCE.adicionarAresta(0, 2);
EXERCICIO_2_INSTANCE.adicionarAresta(1, 3);
EXERCICIO_2_INSTANCE.adicionarAresta(2, 4);
EXERCICIO_2_INSTANCE.adicionarAresta(3, 4);

var EXERCICIO_3_INSTANCE = Grafo(false, false);

EXERCICIO_3_INSTANCE.adicionarVertice("A");
EXERCICIO_3_INSTANCE.adicionarVertice("B");
EXERCICIO_3_INSTANCE.adicionarVertice("C");
EXERCICIO_3_INSTANCE.adicionarVertice("D");
EXERCICIO_3_INSTANCE.adicionarVertice("E");

EXERCICIO_3_INSTANCE.adicionarAresta(0, 1);
EXERCICIO_3_INSTANCE.adicionarAresta(0, 2);
EXERCICIO_3_INSTANCE.adicionarAresta(0, 3);
EXERCICIO_3_INSTANCE.adicionarAresta(0, 4);
EXERCICIO_3_INSTANCE.adicionarAresta(1, 2);
EXERCICIO_3_INSTANCE.adicionarAresta(1, 3);
EXERCICIO_3_INSTANCE.adicionarAresta(1, 4);
EXERCICIO_3_INSTANCE.adicionarAresta(2, 3);
EXERCICIO_3_INSTANCE.adicionarAresta(2, 4);
EXERCICIO_3_INSTANCE.adicionarAresta(3, 4);

var EXERCICIO_4_INSTANCE = Grafo(false, true);

EXERCICIO_4_INSTANCE.adicionarVertice("A");
EXERCICIO_4_INSTANCE.adicionarVertice("B");
EXERCICIO_4_INSTANCE.adicionarVertice("C");
EXERCICIO_4_INSTANCE.adicionarVertice("D");
EXERCICIO_4_INSTANCE.adicionarVertice("E");
EXERCICIO_4_INSTANCE.adicionarVertice("F");

EXERCICIO_4_INSTANCE.adicionarVertice(0, 1, 1);
EXERCICIO_4_INSTANCE.adicionarVertice(0, 2, 5);
EXERCICIO_4_INSTANCE.adicionarVertice(1, 3, 4);
EXERCICIO_4_INSTANCE.adicionarVertice(1, 4, 6);
EXERCICIO_4_INSTANCE.adicionarVertice(2, 4, 1);
EXERCICIO_4_INSTANCE.adicionarVertice(2, 5, 2);
EXERCICIO_4_INSTANCE.adicionarVertice(3, 5, 15);
EXERCICIO_4_INSTANCE.adicionarVertice(4, 5, 7);