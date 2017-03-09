/* 
 *  TODO:
 *      - ng-hide para Preço total enquanto estiver na lista de Listas
 *      ou mover o conteiner
 *      - Mascara para os campos
 *      - Validação dos campos
 *      - Upload de imagem (imgur) e/ou conversão para base64
 *      - Firebase
 *      - Fallback css&js
 *      - AngularJS template ng-view
 */
(function () {
    "use strict";
}());

var app = angular.module('ListaDeCompras', []);
app.controller('cLista', function cLista($scope, $filter) {

    var scp = $scope;
    scp.listaID = scp.listaNome = scp.listas = scp.produtos =
        scp.produtoID = scp.produtoNome = scp.produtoImagem =
        scp.produtoPreco = scp.produtostatus = scp.produtoQuantidade = scp.imgURL = '';

/* Listas */
    scp.listas = [
        {
            id: 0,
            nome: 'Front-end Challenge'
        }
    ];

/* Lista inicial de produtos */
    scp.produtos = [
        {
            id_lista: 0,
            id: 0,
            imagem: 'img/tomate.png',
            nome: 'Tomate',
            preco: 2.15,
			status: 'comprado',
            quantidade: 1
        },
        {
            id_lista: 0,
            id: 1,
            imagem: 'img/bacon.png',
            nome: 'Bacon',
            preco: 6.70,
			status: 'comprado',
            quantidade: 1
        },
        {
            id_lista: 0,
            id: 2,
            imagem: 'img/hamburger.png',
            nome: 'Hamburger',
            preco: 3.45,
			status: 'comprado',
            quantidade: 1
        }
    ];
	
/* Selecionar lista */
    scp.selecionarLista = function (idx) {
        scp.listaID = idx;

    };

/* Salvar produto */
    scp.salvarProduto = function (idx) {
        if (scp.produtoNome === '') {
            return;
        }
        if (idx === '') {
            return alert('Você precisa de uma lista.');
        }
        if (scp.produtoID === '') {
            var id_aux;
            if (scp.produtos.length < 1) {
                id_aux = 0;
            } else {
                id_aux = scp.produtos[scp.produtos.length - 1].id;
            }
            id_aux += 1;
            scp.produtos.push({
                id_lista: scp.listaID,
                id: id_aux,
                nome: scp.produtoNome,
                imagem: scp.produtoImagem,
                preco: scp.produtoPreco,
				status: scp.produtostatus,
                quantidade: scp.produtoQuantidade
            });
        } else {
            var i, max = scp.produtos.length;
            for (i = 0; i < max; i++) {
                if (scp.produtos[i].id === scp.produtoID) {
                    scp.produtos[i].id_lista = scp.listaID;
                    scp.produtos[i].nome = scp.produtoNome;
                    scp.produtos[i].imagem = scp.produtoImagem;
                    scp.produtos[i].preco = scp.produtoPreco,
					scp.produtos[i].status = scp.produtostatus,
                    scp.produtos[i].quantidade = scp.produtoQuantidade;
                }
            }
        }
        scp.produtoID = scp.produtoNome = scp.produtoImagem = scp.produtoPreco = scp.produtostatus = scp.produtoQuantidade = '';
    };

/* Editar produto */
    scp.editarProduto = function (lista_idx, idx, nome, img, preco, status, qtd) {
        scp.listaID = lista_idx;
        scp.produtoID = idx;
        scp.produtoNome = nome;
        scp.produtoImagem = img;
        scp.produtoPreco = preco;
		scp.produtostatus = status;
        scp.produtoQuantidade = qtd;
    };
	
/* Remover produto */
    scp.removerProduto = function (idx) {
        var antProduto = scp.produtos;
        scp.produtos = [];
        angular.forEach(antProduto, function (produto) {
            if (produto.id !== idx) {
                scp.produtos.push(produto);
            }
        });
    };
	
/* Preço total */
    scp.precoTotal = function (idx) {
        var total = 0,
            antProduto = scp.produtos;
        angular.forEach(antProduto, function (produto) {
            if (produto.id_lista === idx) {
                total += produto.preco * produto.quantidade;
            }
        });
        scp.precoTotalData = total;
        return scp.precoTotalData;
    };

/* Produto imagem */	
    scp.produtoImgUrl = function () {
        scp.produtoImagem = scp.imgURL;
        scp.imgURL = '';
    };

});

app.filter('DefaultImg', function () {
    return function (input) {
        if (typeof (input) === 'undefined' || input === '') {
            return "img/camera.png";
        } else {
            return input;
        }
    };
});


// Menu[lista]
$(function () {
    $('#menu a:last').tab('show');
});