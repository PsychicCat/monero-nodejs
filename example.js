var moneroWallet = require('./lib/wallet.js');

var Wallet = new moneroWallet();

var destinations = {
    amount: 1,
    address: '47Vmj6BXSRPax69cVdqVP5APVLkcxxjjXdcP9fJWZdNc5mEpn3fXQY1CFmJDvyUXzj2Fy9XafvUgMbW91ZoqwqmQ6RjbVtp'
};

Wallet.transfer(destinations, function(err, data) {
    if(err){
        console.log(err);
    }
    console.log(data);
});
