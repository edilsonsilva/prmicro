const PROTO_PATH = "./produto.proto";

const grpc = require("grpc");
const carregarProto = require("@grpc/proto-loader");
const { v4 : uuidv4 } = require("uuid");
const mysql = require("mysql");
const conexaobanco = mysql.createConnection({
    host:"localhost",
    port:"3306",
    user:"root",
    password:"Alunos@123",
    database:"produtodb"
});

const cx = conexaobanco.connect((error)=>{
    if(error)return console.log(`Erro ao conectar o banco ->${error}`)
    console.log(`Conexão estabelecida -> ${conexaobanco.threadId}`);
});


const definicao = carregarProto.loadSync(PROTO_PATH,{
    keepCase:true,
    longs:String,
    enums:String,
    arrays:true
});

const produtosProto = grpc.loadPackageDefinition(definicao);

const server = new grpc.Server();

server.addService(produtosProto.GerenciarProdutos.service,{
    listarTodos:(call,callback) =>{
        conexaobanco.query("select * from produto",(error, produtos)=>{
            if(error) return callback({code:grpc.status.INTERNAL});
            callback(null,{produtos})
        });
    }});


server.bind("127.0.0.1:30043",grpc.ServerCredentials.createInsecure());
console.log("Server running at http://127.0.0.1:30043");
server.start();