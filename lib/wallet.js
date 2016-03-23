"use strict";
const Promise = require('bluebird');
const PromiseObject = require('promise-object')(Promise);
const request = Promise.promisifyAll(require('request'));

const Wallet = PromiseObject.create({
    initialize: function($config) {
        this.hostname = $config.hostname || 'http://127.0.0.1',
        this.port = $config.port || '18082'
    },

    // general API wallet request
    _request: function($deferred, body) {
        let options = {
            url: `${this.hostname}:${this.port}/json_rpc`,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: body,
            json: true
        };
        request.postAsync(options)
            .then(function(response){
            if(response.body.result) {
                $deferred.resolve(response.body.result);
            } else {
                $deferred.resolve(response.body.error);
            }
        })
            .catch(function(error){
            $deferred.resolve(error.cause);
        });
    },

    // generate request body
    _body: function(method, params) {
        let body = {
            jsonrpc: '2.0',
            id: '0',
            method: method
        };
        if(params) {body.params = params;}
        return this._request(body);
    },

    /**
     * Wallet Methods
     */

    // return the wallet balance
    balance: function($deferred) {
        let method = 'getbalance';
        $deferred.resolve(this._body(method));
    },

    // return the wallet address
    address: function($deferred) {
        let method = 'getaddress';
        $deferred.resolve(this._body(method));
    },

    // transfer Monero to a single recipient, or a group of recipients
    transfer: function($deferred, destinations, options) {
        if(typeof options === 'undefined') options = {};
        if(typeof destinations === 'array') {
            destinations.forEach((dest) => dest.amount = convert(dest.amount));
        } else {
            destinations.amount = convert(destinations.amount);
            destinations = [destinations];
        }
        let method = 'transfer';
        let params = {
            destinations: destinations,
            mixin: parseInt(options.mixin) || 4,
            unlock_time: parseInt(options.unlockTime) || 0,
            payment_id: options.pid || null
        };
        $deferred.resolve(this._body(method, params));
    },

    // split a transfer into more than one tx if necessary
    transferSplit: function($deferred, destinations, options) {
        if(typeof options === 'undefined') options = {};
        if(typeof destinations === 'array') {
            destinations.forEach((dest) => dest.amount = convert(dest.amount));
        } else {
            destinations.amount = convert(destinations.amount);
            destinations = [destinations];
        }
        let method = 'transfer';
        let params = {
            destinations: destinations,
            mixin: parseInt(options.mixin) || 4,
            unlock_time: parseInt(options.unlockTime) || 0,
            payment_id: options.pid || null
        };
        $deferred.resolve(this._body(method, params));
    },

    // send all dust outputs back to the wallet with 0 mixin
    sweep: function($deferred) {
        let method = 'sweep_dust';
        $deferred.resolve(this._body(method));
    },

    // get a list of incoming payments using a given payment ID
    getPayments: function($deferred, pid) {
        let method = 'get_payments';
        let params = {};
        params.payment_id = pid;
        $deferred.resolve(this._body(method, params));
    },

    // get a list of incoming payments using a single payment ID or list of payment ids from a given height
    getBulkPayments: function($deferred, pids, minHeight) {
        let method = 'get_bulk_payments';
        let params = {};
        params.payment_ids = pids;
        params.min_block_height = minHeight;
        $deferred.resolve(this._body(method, params));
    },

    // return a list of incoming transfers to the wallet (type can be "all", "available" or "unavailable")
    incomingTransfers: function($deferred, type) {
        let method = 'incoming_transfers';
        let params = {};
        params.transfer_type = type;
        $deferred.resolve(this._body(method, params));
    },

    // return the spend key or view private key (type can be 'mnemonic' seed or 'view_key')
    queryKey: function($deferred, type) {
        let method = 'query_key';
        let params = {};
        params.key_type = type;
        $deferred.resolve(this._body(method, params));
    },

    // make an integrated address from the wallet address and a payment id
    integratedAddress: function($deferred, pid) {
        let method = 'make_integrated_address';
        let params = {};
        params.payment_id = pid;
        $deferred.resolve(this._body(method, params));
    },

    // retrieve the standard address and payment id from an integrated address
    splitIntegrated: function($deferred, address) {
        let method = 'split_integrated_address';
        let params = {};
        params.integrated_address = address;
        $deferred.resolve(this._body(method, params));
    },

    // return the current block height
    height: function($deferred) {
        let method = 'getheight';
        $deferred.resolve(this._body(method));
    },

    // stop the current simplewallet process
    stopWallet: function($deferred) {
        let method = 'stop_wallet';
        $deferred.resolve(this._body(method));
    }

});

module.exports = Wallet;

// helper function to convert Monero amount to atomic units
function convert(amount) {
    return Number(amount) * 1e12;
}
