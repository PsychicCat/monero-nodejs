var moneroWallet = require('./lib/wallet');
var Daemon = require('./lib/wallet').daemon;
var daemon = new Daemon();

// execute a GET to your Monero daemon at /get_transaction_pool
daemon.getTransactionPool().then(function(result) {
    if(result.status == 'OK' && result.transactions){
        let transactions = result.transactions;

        // iterate through the transactions and check to see if it contains a payment ID
        transactions.forEach(function(transaction) {
            let tx = JSON.parse(transaction.tx_json);
            
            // if the first 3 bytes match this, then the following 32 bytes are the payment ID 
            if(tx.extra[0] == 2 && tx.extra[1] == 33 && tx.extra[2] == 0){
                let paymentID = '';
                for(let i = 3; i < 35; i++) {
                   paymentID += tx.extra[i].toString(16)
                }
                // handle the payment ID
                console.log(`Transaction ${transaction.id_hash} detected with payment ID: ${paymentID}`);
            } else {
                // report the tx without payment ID
                console.log(`Transaction ${transaction.id_hash} does not contain a payment ID.`);
            } 
        })
    } else {
        console.log(result)
    }
})






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
// Wallet.incomingTransfers('all').then(function(result){
//     console.log(result);
// });

//var destination = {};
//destination.address = '47Vmj6BXSRPax69cVdqVP5APVLkcxxjjXdcP9fJWZdNc5mEpn3fXQY1CFmJDvyUXzj2Fy9XafvUgMbW91ZoqwqmQ6RjbVtp';
//destination.amount = 1;
//
//Wallet.transfer(destination).then(function(result){
//    console.log(result);
//});



