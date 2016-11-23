require('dotenv').config();
var moneroWallet = require('./lib/wallet');
var Wallet = new moneroWallet(process.env.MONERO_HOST);
var Util = require('./lib/utilities');

// examples

Wallet.balance()
    .then((result) => console.log(result))
    .catch((error) => console.log(error));




