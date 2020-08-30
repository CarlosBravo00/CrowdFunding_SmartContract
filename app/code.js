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
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "proposals",
		"outputs": [
			{
				"name": "owner",
				"type": "address"
			},
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "voteCount",
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
				"name": "winningProposal_",
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
ADDR = '0x7799055db2066b122a8C782d57eCCd7A6bC5Bb72';
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
	contract.methods.createProposal(name).send({ from: $("#addrs").val() })
});

$('#apoyo').click(function () {
	const idprop = $("#prop").val();
	contract.methods.vote(idprop).send({ from: $("#addrs").val() });
});

$('#checar').click(function () {
	contract.methods.getProposal($("#prop").val()).call(function (error, result) {
		if (error == null) {
			$("#displaytext").html(result[0] + " Votos: " + result[1]);
		} else {
			$("#displaytext").html("NOT FOUND");
		}
	})
})