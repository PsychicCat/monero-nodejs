var moneroWallet = require('./lib/wallet');
var Wallet = new moneroWallet();

// examples

var utils = require('./lib/utilities');


var destinations = [{address: 'ababs', amount: 12.35}, {address: 'jasdfkafls', amount: 12.59}];

console.log(Wallet.transfer(destinations));






