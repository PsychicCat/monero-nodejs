var moneroWallet = require('./lib/wallet.js');
var Wallet = new moneroWallet();

Wallet.integratedAddress().then(function(result){
    console.log(result);
});

