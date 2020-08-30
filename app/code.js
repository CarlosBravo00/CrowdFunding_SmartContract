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
	}
];
ADDR = '0xF3ecB00649cc470Dc1969Ca231ad908d78e06575';
var contract = new web3.eth.Contract(ABI, ADDR);

console.log(contract);

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