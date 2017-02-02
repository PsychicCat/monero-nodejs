var moneroWallet = require('./lib/wallet');
var Wallet = new moneroWallet();
var Util = require('./lib/utilities');


// examples

// Wallet.balance()
//     .then((result) => console.log(result))
//     .catch((error) => console.log(error));


Wallet.getTransfers({pool: true})
    .then(result => console.log(result))
    .catch(error => console.log(error))

