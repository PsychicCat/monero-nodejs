var request = require('request');

// constructor
function Wallet(host, port) {
    this.hostname = host || 'http://127.0.0.1',
    this.port = port || '18082',
    this.path = '/json_rpc'
}

Wallet.prototype = {
    constructor: Wallet,

    // general API request
    request: function(body, callback) {
        var options = {
            url: this.hostname + ':' + this.port + this.path,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: body,
            json: true
        };
        request.post(options, function(err, res, body){
            callback(err, body.result);
        });
        return this;
    },

    // generate body of request
    body: function(method, params, callback) {
        var body = {
            jsonrpc: '2.0',
            id: '0',
            method: method
        };
        if(params){
            body.params = params;
        }
        return this.request(body, callback);
    },

    /*
    WALLET METHODS
     */

    // return the wallet balance
    balance: function(callback) {
        var method = 'getbalance';
        return this.body(method, null, callback);
    },

    // return the wallet address
    address: function(callback) {
        var method = 'getaddress';
        return this.body(method, null, callback);
    },

    // transfer Monero to a single recipient
    transfer: function(destination, amount, options, callback) {
        if(typeof options === 'function') {
            callback = options;
            options = {};
        }
        var method = 'transfer';
        var destination = {
            amount: parseInt(amount) * 1e12,
            address: destination
        };
        var params = {
            destinations: [destination],
            mixin: parseInt(options.mixin) || 4,
            unlock_time: parseInt(options.unlockTime) || 0,
            payment_id: options.pid || null
        };
        return this.body(method, params, callback)
    }
};


module.exports = Wallet;