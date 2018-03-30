var moneroWallet = require('./lib/wallet');
var Wallet = new moneroWallet();

// examples

Wallet.create_wallet('monero_wallet').then(function(result){
    console.log(result);
});

Wallet.open_wallet('monero_wallet').then((result) => {
    console.log(result);
});

Wallet.address().then((result) => {
    console.log(result);
});

Wallet.balance().then((result) => {
    console.log(result);
});
