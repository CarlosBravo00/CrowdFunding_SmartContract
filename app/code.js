web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

web3.eth.defaultAccount = web3.eth.accounts[0];

ABI = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "num",
                "type": "uint256"
            }
        ],
        "name": "store",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "retreive",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];
ADDR = '0xCc1164D70cD14F690a4820F1f43D14B90E13Eed8';
var contract = new web3.eth.Contract(ABI, ADDR);

console.log(contract);

contract.methods.retreive().call(function (error, result) {
    $("#displaytext").html('Valor: ' + result);
})


$('#change').click(function () {
    const value = $("#store").val();
    console.log(web3.eth.accounts[0]);
    contract.methods.store(value).send({ from: '0x1475e5cee0a65acf57de0facfbad3d3853acdda6' });
});

$('#update').click(function () {
    contract.methods.retreive().call(function (error, result) {
        $("#displaytext").html('Valor: ' + result);
    })
});