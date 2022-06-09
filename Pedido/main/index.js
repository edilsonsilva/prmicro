/*
Projeto backend para uma aplicação comercial. 
Vamos usar módulos para executar nosso projeto.
*/
//importação do módulo express
const express = require("express");

//importação do módulo cors
const cors = require("cors");

//Vamos utilizar o módulo express aplicando em uma constante chamada app
const app = express();

//Aplicar ao servidor o trabalho de trato com os dados no formato JSON
app.use(express.json());

//Aplica o CORS no projeto. Uso de protocolos diferentes(http, https..)
app.use(cors());


//Importar as rotas dos objetos
const rotaPedidos = require("../routes/pedidos");

//Usando as rotas na nossa aplicação
app.use("/pedidos", rotaPedidos);

//definindo a porta de comunicação do servidor
// Carregar a porta de comunicação definida no ambiente
// do servidor pipe
app.listen(5000, () =>
  console.log(`Servidor online em http://localhost:5000}`)
);
