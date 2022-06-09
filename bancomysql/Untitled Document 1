Banco de dados MySQL

create database produtodb character set utf8 collate utf8_general_ci;
use produtodb;
create table produto(
idproduto bigint auto_increment primary key,
nomeproduto varchar(50) not null,
descricao text not null,
categoria varchar(30),
preco decimal(7,2) not null,
quantidade int not null default 1
)engine InnoDB character set utf8 collate utf8_general_ci;

create database pedidodb  character set utf8 collate utf8_general_ci;
use pedidodb;
create table pedido(
idpedido bigint auto_increment primary key,
idcliente varchar(200),
apikey varchar(200) not null,
idproduto bigint not null,
quantidade int not null default 1,
precovenda decimal(7,2),
subtotal decimal(10,2),
datacompra timestamp default current_timestamp()
)engine InnoDB character set utf8 collate utf8_general_ci;

