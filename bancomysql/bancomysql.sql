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

insert into produtodb.produto(
    nomeproduto,
    descricao,
    categoria,
    preco,
    quantidade
)
values(
    "Mouse sem fio Logitech",
    "Mouse sem fio Logitech M280 com Conexão USB e Pilha Inclusa - Preto CX 1 UN",
    "Informática",
    96.60,
    30
),
(
    "Webcam",
    "Webcam Logitech C270, HD 720p com Microfone Embutido e 3 MP para Chamadas e Gravações em Vídeo Widescreen CX 1 UN",
    "Informática",
    215.91,
    10
),
(
    "Pen Drive",
    "Pen Drive 64gb USB 2.0 Cruzer Blade SanDisk BT 1 UN",
    "Informática",
    52.60,
    20
),
(
    "Mesa Digitalizadora",
    "Mesa Digitalizadora Wacom Tablet Intuos Creative pequena, Preta, CTL4100, Wacom - CX 1 UN",
    "Informática",
    392.26,
    15
)