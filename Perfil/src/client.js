const PROTO_PATH = "./produto.proto";

const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
});

const GerenciarProdutos = grpc.loadPackageDefinition(packageDefinition).GerenciarProdutos;
const client = new GerenciarProdutos(
    "localhost:30043",
    grpc.credentials.createInsecure()
);

module.exports = client;