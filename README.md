# monero-nodejs

A Node.js wallet manager for interacting with Monero's simplewallet over JSON-RPC. 

For more information about Monero, visit: https://getmonero.org/home

Donations:

XMR: `47Vmj6BXSRPax69cVdqVP5APVLkcxxjjXdcP9fJWZdNc5mEpn3fXQY1CFmJDvyUXzj2Fy9XafvUgMbW91ZoqwqmQ6RjbVtp`

## Install the package 

### via NPM
```
npm install monero-nodejs
```

### Or clone the Github repository
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

* `callback` - a callback function that responds with an error or the response data in the following order: (*error, data*)
    
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

* `callback` - a callback function that responds with an error or the response data in the following order: (*error, data*)

Example response:

```
{ address: '47Vmj6BXSRPax69cVdqVP5APVLkcxxjjXdcP9fJWZdNc5mEpn3fXQY1CFmJDvyUXzj2Fy9XafvUgMbW91ZoqwqmQ6RjbVtp' }
```

### transfer
Usage:

```
Wallet.transfer(destinations, options, callback);
```

Transfers Monero to a single recipient OR a group of recipients in a single transaction. Responds with the transaction hash of the payment.

Parameters:

* `destinations` - an object OR an array of objects in the following format: `{amount: (*number*), address: (*string*)}`
* `options` - an object with the following properties (*optional*)
    
        {   
            mixin: (*number*), // amount of existing transaction outputs to mix yours with (default is 4)
            unlockTime: (*number*), // number of blocks before tx is spendable (default is 0)
            pid: (*string*) // optional payment ID (a 64 character hexadecimal string used for identifying the sender of a payment) 
        }
    
* `callback` - a callback function that responds with an error or the response data in the following order: (*error, data*)

Example response:

```
{ tx_hash: '<b9272a68b0f242769baa1ac2f723b826a7efdc5ba0c71a2feff4f292967936d8>', tx_key: '' }
```

### transferSplit
Usage:

```
Wallet.transferSplit(destinations, options, callback);
```

Same as `transfer`, but can split into more than one transaction if necessary. Responds with a list of transaction hashes.

Additional property available for the `options` parameter:

* `new_algorithm` - `true` to use the new transaction construction algorithm. defaults to `false`. (*boolean*)

Example response:

```
{ tx_hash_list: [ '<f17fb226ebfdf784a0f5814e1c5bb78c19ea26930a0d706c9dc1085a250ceb37>' ] }
```

### sweep
Usage:

```
Wallet.sweep(callback);
```

Sends all dust outputs back to the wallet, to make funds easier to spend and mix. Responds with a list of the corresponding transaction hashes.

Parameters:

* `callback` - a callback function that responds with an error or the response data in the following order: (*error, data*)

Example response:

```
{ tx_hash_list: [ '<75c666fc96120a643321a5e76c0376b40761582ee40cc4917e8d1379a2c8ad9f>' ] }
```

### getPayments
Usage:

```
Wallet.getPayments(paymentID, callback);
```

Returns a list of incoming payments using a given payment ID.

Parameters:

* `paymentID` - the payment ID to scan wallet for included transactions (*string*)
* `callback` - a callback function that responds with an error or the response data in the following order: (*error, data*)


### getBulkPayments
Usage:

```
Wallet.getBulkPayments(paymentIDs, minHeight, callback);
```

Returns a list of incoming payments using a single payment ID or a list of payment IDs from a given height.

Parameters:

* `paymentIDs` - the payment ID or list of IDs to scan wallet for (*array*)
* `minHeight` - the minimum block height to begin scanning from (example: 800000) (*number*)
* `callback` - a callback function that responds with an error or the response data in the following order: (*error, data*)

### incomingTransfers
Usage:

```
Wallet.incomingTransfers(type, callback);
```

Returns a list of incoming transfers to the wallet.

Parameters:

* `type` - accepts `"all"`: all the transfers, `"available"`: only transfers that are not yet spent, or `"unavailable"`: only transfers which have been spent (*string*)
* `callback` - a callback function that responds with an error or the response data in the following order: (*error, data*)

### queryKey
Usage:

```
Wallet.queryKey(type, callback);
```

Returns the wallet's spend key (mnemonic seed) or view private key.

Parameters:

* `type` - accepts `"mnemonic"`: the mnemonic seed for restoring the wallet, or `"view_key"`: the wallet's view key (*string*)
* `callback` - a callback function that responds with an error or the response data in the following order: (*error, data*)

### integratedAddress
Usage:

```
Wallet.integratedAddress(paymentID, callback);
```

OR:

```
Wallet.integratedAddress(callback);
```

Make and return a new integrated address from your wallet address and a payment ID.

Parameters:

* `paymentID` - a 64 character hex string. if not provided, a random payment ID is generated. (*string*, optional)
* `callback` - a callback function that responds with an error or the response data in the following order: (*error, data*)

Example response:

```
{ integrated_address: '4HCSju123guax69cVdqVP5APVLkcxxjjXdcP9fJWZdNc5mEpn3fXQY1CFmJDvyUXzj2Fy9XafvUgMbW91ZoqwqmQ96NYBVqEd6JAu9j3gk' }
```

### splitIntegrated
Usage:

```
Wallet.splitIntegrated(address, callback);
```

Returns the standard address and payment ID corresponding to a given integrated address.

Parameters:

* `address` - an integrated Monero address (*string*)
* `callback` - a callback function that responds with an error or the response data in the following order: (*error, data*)

Example response:

```
{ payment_id: '<61eec5ffd3b9cb57>',
  standard_address: '47Vmj6BXSRPax69cVdqVP5APVLkcxxjjXdcP9fJWZdNc5mEpn3fXQY1CFmJDvyUXzj2Fy9XafvUgMbW91ZoqwqmQ6RjbVtp' }
```

### height 
Usage

```
Wallet.height(callback);
```

Returns the current block height of the daemon.

Parameters:

* `callback` - a callback function that responds with an error or the response data in the following order: (*error, data*)

Example response:

```
{ height: 874458, status: 'OK' }
```