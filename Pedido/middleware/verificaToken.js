//importação do módulo jsonwebtoken
const jwt = require("jsonwebtoken");
const cfg = require("../config/cfg");

//Verfificar se o token foi criado. Assim o usuário poderá acessar alguns contéudos bloqueados
//Se o usuário não tiver token, ele será redirecionado para o login
function verificaToken(req, res, next) {
  const token_enviado = req.headers.token;

  if (!token_enviado) {
    return res.status(401).send({
      retorno: "Não existe token. realize o processo de autenticação",
    });
  }

  jwt.verify(token_enviado, cfg.jwt_secret, (erro, resultado) => {
    if (erro)
      return res.status(500).send({ retorno: `Erro interno -> ${erro}` });
    req.content = {
      id: resultado.idusuario,
      usuario: resultado.nomeusuario,
      email: resultado.email,
    };
    return next();
  });
}

module.exports = verificaToken;
