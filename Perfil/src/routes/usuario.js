const express = require("express");
const bcrypt = require("bcrypt");
const Usuario = require("../model/usuario");
const Cliente = require("../model/cliente");
const criar_token = require("../utils/criartoken");
const cfg = require("../config/cfg");
const verificar_token = require("../middleware/verificartoken");
const { v4: uuidv4 } = require("uuid");
const route = express.Router();

const client = require("../client");

route.get("/", (req, res) => {
  Usuario.find((erro, dados) => {
    if (erro)
      return res
        .status(500)
        .send({ output: `Erro ao processar dados -> ${erro}` });
    res.status(200).send({ output: "ok", payload: dados });
  });
});

route.post("/cadastro", (req, res) => {
  bcrypt.hash(req.body.senha, cfg.salt, (erro, result) => {
    if (erro)
      return res
        .status(500)
        .send({ output: `Erra ao tentar gerar a senha -> ${erro}` });
    req.body.senha = result;
    req.body.apikey = uuidv4();

    const dados = new Usuario(req.body);
    dados
      .save()
      .then((result) => {
        res.status(201).send({ output: "Cadastro realizado", payload: result });
      })
      .catch((erro) =>
        res.status(500).send({ output: `Erro ao cadastrar -> ${erro}` })
      );
  });
});

route.post("/login", (req, res) => {
  Usuario.findOne({ nomeusuario: req.body.nomeusuario }, (erro, result) => {
    if (erro)
      return res
        .status(500)
        .send({ output: `Erro ao tentar localizar -> ${erro}` });
    if (!result)
      return res.status(400).send({ output: `Usuário não localizado` });
    bcrypt.compare(req.body.senha, result.senha, (erro, same) => {
      if (erro)
        return res
          .status(500)
          .send({ output: `Erro ao validar a senha ->${erro}` });
      if (!same) return res.status(400).send({ output: `Senha inválida` });
      console.log(result.apikey);
      Cliente.findOne({ apikey: result.apikey }, (error, cliente) => {
        console.log(cliente);
        if (error)
          return res
            .status(500)
            .send({ output: `Erro interno apikey cliente -> ${error}` });

        const gerar_token = criar_token(
          result._id,
          result.usuario,
          result.email
        );
        if (!cliente) {
          return res.status(200).send({
            output: "Autenticado",
            message: `Cadastre o cliente em: http://localhost:3000/cliente/cadastro`,
            token: gerar_token,
            apikey: result.apikey,
          });
        } else {
          client.ListarTodos(null, (err, data) => {
            if (!err) {
              res.status(200).send({ token: gerar_token, produtos: data });
            }
          });
        }
      });
    });
  });
});

route.put("/atualizar/:id", verificar_token, (req, res) => {
  Usuario.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (erro, dados) => {
      if (erro)
        return res
          .status(500)
          .send({ output: `Erro ao processar a atualização-> ${erro}` });
      if (!dados)
        return res
          .status(400)
          .send({ output: `Não foi possível atualizar -> ${erro}` });
      return res.status(202).send({ output: "Atualizado", payload: dados });
    }
  );
});

route.delete("/apagar/:id", (req, res) => {
  Usuario.findByIdAndDelete(req.params.id, (erro, dados) => {
    if (erro)
      return res
        .status(500)
        .send({ output: `Erro ao tentar apagar -> ${erro}` });
    res.status(204).send({});
  });
});
module.exports = route;
