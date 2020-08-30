web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

web3.eth.defaultAccount = web3.eth.accounts[0];

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
				"name": "",
				"type": "address"
			}
		],
		"name": "voters",
		"outputs": [
			{
				"name": "voted",
				"type": "bool"
			},
			{
				"name": "vote",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
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
		"name": "getMydude",
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
		"constant": true,
		"inputs": [],
		"name": "mydude",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];
ADDR = '0x7284892cf13FE9F04114F94a1e5855c40a94779C';
var contract = new web3.eth.Contract(ABI, ADDR);


contract.methods.getProposal(0).call(function (error, result) {
    $("#displaytext").html(result[0] + result[1]);
})


$('#change').click(function () {
    const name = $("#name").val();
    console.log(name);
    contract.methods.createProposal(name).send({ from: '0x94120fe8b2dd8954b3b4d7c0dbade52b2790125f' });
});

$('#vota').click(function () {
    const name = $("#prop").val();
    console.log(name);
    contract.methods.vote(name).send({ from: '0x2Fe4eAb33CDe230B3b3572E1Aca75fA65F5D0345' });
});