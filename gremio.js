const gremioABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "salaProposta",
				"type": "uint256"
			},
			{
				"name": "VotoGremio",
				"type": "bool"
			}
		],
		"name": "votar",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "salaProposta",
				"type": "uint256"
			}
		],
		"name": "PropostaEleita",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "texto",
				"type": "string"
			},
			{
				"name": "proponente",
				"type": "address"
			},
			{
				"name": "qualQuotaMinimaParaAprovacao",
				"type": "uint256"
			}
		],
		"name": "criarProposta",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "qualAnoExercicio",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "quandoEncerraVotacao",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "enderecoVotante",
				"type": "address"
			},
			{
				"name": "quotaDeVotos",
				"type": "uint256"
			}
		],
		"name": "incluiVotante",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "salaProposta",
				"type": "uint256"
			}
		],
		"name": "pesquisarProposta",
		"outputs": [
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalDePropostas",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "qualAnoExercicio",
				"type": "string"
			},
			{
				"name": "qualDataFimVotacao",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
];

var gremio = web3.eth.contract(gremioABI).at("0x4c9e59c5b05b823743b73c642fa7e3924956472a");
/*gremio.incluiVotante("0x1eAeac2C4A5dB5d00c7820e13F64c32D0d6Aa6B7", 50, {from: contaUsuario, gas: 3000000, value: 0}, function (err, resultado) {
	if (err)    {
			console.log("Erro");
			console.error(err);
	} else {
			console.log("Resultado");
			console.log(resultado);
	}
});*/
/*gremio.criarProposta("Instalar Cerca Elétrica", "0x1eAeac2C4A5dB5d00c7820e13F64c32D0d6Aa6B7", 40, {from: contaUsuario, gas: 3000000, value: 0}, function (err, resultado) {
	if (err) {
			console.log("Erro");
			console.error(err);
	} else {
			console.log("Resultado");
			console.log(resultado);
	}
});*/
var atual = document.getElementById('atual');
var minima = document.getElementById('minima');
var status = document.getElementById('status');
var encerramento = document.getElementById('encerramento');
var proposta_texto = document.getElementById('proposta_texto');

gremio.quandoEncerraVotacao({from: contaUsuario, gas: 3000000, value: 0}, function (err, resultado) {
	if (err) {
			console.log("Erro");
			console.error(err);
	} else {
			console.log("Resultado");
			console.log(resultado);
			encerramento.innerHTML = new Date(resultado.c[0]*1000).toLocaleString();
	}
});

function obtemProposta() {
	gremio.pesquisarProposta(0, {from: contaUsuario, gas: 3000000, value: 0}, function (err, resultado) {
		if (err) {
				console.log("Erro");
				console.error(err);
		} else {
				console.log("Resultado");
				console.log(resultado);
				atual.innerHTML = resultado[2].c[0];
				minima.innerHTML = resultado[3].c[0];
				if(resultado[2].c[0] > resultado[3].c[0]) {
					status.innerHTML('Proposta Aceita!');
				}
				proposta_texto.value = resultado[0];
		}
	});
}
