# monero-nodejs

A Node.js wallet manager for interacting with Monero's simplewallet over JSON-RPC. 

## Install the package via NPM

```
npm install monero-nodejs
```

## Or clone the Github repository
```
git clone https://github.com/PsychicCat/monero-nodejs.git
```

## Initializing a wallet

Require the module:

```
var moneroWallet = require('monero-nodejs');
```

Create a new instance of the wallet:

```
var Wallet = new moneroWallet();
```

This creates a wallet using the following simplewallet default RPC settings:
   
* `host` - http://127.0.0.1
* `port` - 18082

To connect to a wallet with different settings, create an instance with these parameters:

```
var Wallet = new moneroWallet(host, port);
```

## Wallet Methods

### balance
Usage:

```
Wallet.balance(callback);
```

Responds with the current balance and unlocked (spendable) balance of the wallet in atomic units. Divide by 1e12 to convert.

Parameters:

* `callback` - a callback function that responds with an error or the response data in the following order: (error, data)
    
Example response: 

```
{ balance: 3611980142579999, unlocked_balance: 3611980142579999 }
```

### address
Usage:

```
Wallet.address(callback);
```

Responds with the Monero address of the wallet.

Parameters:

* `callback` - a callback function that responds with an error or the response data in the following order: (error, data)

Example response:

```
{ address: '47Vmj6BXSRPax69cVdqVP5APVLkcxxjjXdcP9fJWZdNc5mEpn3fXQY1CFmJDvyUXzj2Fy9XafvUgMbW91ZoqwqmQ6RjbVtp' }
```

### transfer
Usage:

```
Wallet.transfer(address, amount, options, callback);
```

Transfers Monero to a single recipient. Responds with the transaction hash of the payment.

Parameters:

* `address` - a Monero address (*string*)
* `amount` - the amount of Monero to transfer (*number*)
* `options` - an object with the following properties (*optional*)
    
        {   
            mixin: (*number*), // amount of existing transaction outputs to mix yours with (default is 4)
            unlockTime: (*number*), // number of blocks before tx is spendable (default is 0)
            pid: (*string*) // optional payment ID (a 64 character hexadecimal string used for identifying the sender of a payment) 
        }
    
* `callback` - a callback function that responds with an error or the response data in the following order: (error, data)

Example response:

```
{ tx_hash: '<b9272a68b0f242769baa1ac2f723b826a7efdc5ba0c71a2feff4f292967936d8>', tx_key: '' }
```
    