var moneroWallet = require('./lib/wallet');
var Wallet = new moneroWallet();

// examples

// Wallet.integratedAddress().then(function(result){
//     console.log(result);
// });

// Wallet.balance().then(function(response){
//     console.log(response);
// });
//
// Wallet.address().then(function(response){
//     console.log(response);
// });
//
// Wallet.height().then(function(height){
//     console.log(height);
// });
//
Wallet.incomingTransfers('all').then(function(result){
    console.log(result);
});

//var destination = {};
//destination.address = '47Vmj6BXSRPax69cVdqVP5APVLkcxxjjXdcP9fJWZdNc5mEpn3fXQY1CFmJDvyUXzj2Fy9XafvUgMbW91ZoqwqmQ6RjbVtp';
//destination.amount = 1;
//
//Wallet.transfer(destination).then(function(result){
//    console.log(result);
//});



