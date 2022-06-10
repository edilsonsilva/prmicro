//importação do módulo mysql
const mysql = require("mysql");

// Estabelecer a conexão com o banco de dados mysql
// vamos passar nome de usuario, senha, banco de dados e servidor de banco
const conexao = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pedidodb",
});

//Testar a conexao com o banco de dados
conexao.connect((erro) => {
  if (erro) {
    console.error(`Erro ao conectar com banco -> ${erro}`);
    return;
  }
  console.log(`Banco de dados conectado -> ${conexao.threadId}`);
});

module.exports = conexao;
