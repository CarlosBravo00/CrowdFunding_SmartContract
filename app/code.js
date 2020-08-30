web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

web3.eth.defaultAccount = web3.eth.accounts[0];


web3.eth.getBlockNumber()
	.then(console.log);


ABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "proposal",
				"type": "uint256"
			}
		],
		"name": "vote",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getVoter",
		"outputs": [
			{
				"name": "",
				"type": "bool"
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
		"constant": false,
		"inputs": [
			{
				"name": "_name",
				"type": "string"
			}
		],
		"name": "createProposal",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "proposal",
				"type": "uint256"
			}
		],
		"name": "getProposal",
		"outputs": [
			{
				"name": "",
				"type": "string"
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
		"name": "TopProposal",
		"outputs": [
			{
				"name": "topProposal_",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "voter",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "proposal",
				"type": "uint256"
			}
		],
		"name": "voted",
		"type": "event"
	}
];
ADDR = '0x0901ab3829AbEfeB9B5Ad342Fb6af7E3B376A171';
var contract = new web3.eth.Contract(ABI, ADDR);




$(document).ready(function () {
	contract.getPastEvents('voted', {
		fromBlock: 0,
		toBlock: 'latest'
	}, function (error, events) { console.log(events); })
		.then(function (events) {
			var list = "";
			for (i = 0; i < events.length; i++) {
				console.log(events[i].returnValues[0]);
				list += "<li class='list-group-item'>" + events[i].returnValues[0] + " Voto por: " + events[i].returnValues[1] + "</li>";
			}
			$("#eventList").append(list)
		});
});

$('#subir').click(function () {
	const name = $("#name").val();
	console.log($("#addrs").val());
	contract.methods.createProposal(name).send({ from: $("#addrs").val() }, function (error, result) {
		if (error == null) {
			$('#votoexito').show();
			$('#votomalo').hide();
		} else {
			$('#votomalo').show();
			$('#votoexito').hide();
		}
	})
});

$('#apoyo').click(function () {
	const idprop = $("#prop").val();
	contract.methods.vote(idprop).send({ from: $("#addrs").val() }, function (error, result) {
		if (error == null) {
			$('#votoexito').show();
			$('#votomalo').hide();
		} else {
			$('#votomalo').show();
			$('#votoexito').hide();
		}
	})
});

$('#checarVoter').click(function () {
	contract.methods.getVoter().call({ from: $("#addrs").val() }, function (error, result) {
		if (error == null) {
			console.log(result);
			if (result[0]) {
				$("#displaytextvoter").html(" Votaste por: " + result[1]);
			} else {
				$("#displaytextvoter").html("Disponible para votar");
			}
		} else {
			$("#displaytextvoter").html("No Encontrado");
		}
	})
});

$('#checar').click(function () {
	contract.methods.getVoter().call(function (error, result) {
		contract.methods.getProposal($("#prop").val()).call(function (error, result) {
			if (error == null) {
				$("#displaytext").html(result[0] + " Votos: " + result[1]);
			} else {
				$("#displaytext").html("NOT FOUND");
			}
		})
	})
});