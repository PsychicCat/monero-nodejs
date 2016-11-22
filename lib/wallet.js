'use strict';
var request = require('request');
var Utilities = require('../lib/utilities');

class Wallet {
    constructor(hostname, port) {
        this.hostname = hostname || '127.0.0.1';
        this.port = port || 18082;
    }

    _request(method, params = {}) {
        let options = {
            uri: `${this.hostname}:${this.port}/json_rpc`,
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: {
                jsonrpc: '2.0',
                id: '0',
                method: method,
                params: params
            }
        };

        return new Promise((resolve, reject) => {
            request(options, function(err, res, body){
                resolve(body);
            });
        })
    }

    address() {
        return this._request('address');
    }

    balance() {
        return this._request('getbalance');
    }

    height() {
        return this._request('getheight');
    }

    incomingTransfers(type) {
        return this._request('incoming_transfers', {transfer_type: type});
    }

    getPayments(paymentId) {
        return this._request('get_payments', {payment_id: paymentId});
    }

    getBulkPayments(paymentIds, minBlockHeight) {
        return this._request('get_bulk_payments', {payment_ids: paymentIds, min_block_height: minBlockHeight});
    }

    makeIntegratedAddress(paymentId) {
        return this._request('make_integrated_address', {payment_id: paymentId});
    }

    splitIntegratedAddress(address) {
        return this._request('split_integrated_address', {integrated_address: address});
    }

    store() {
        return this._request('store');
    }

    stopWallet() {
        return this._request('stop_wallet');
    }

    transfer(destinations, options = {}, method = 'transfer') {
        if (Array.isArray(destinations)) {
            destinations.forEach((dest) => dest.amount = Utilities.toAtomic(dest.amount));
        } else {
            destinations.amount = Utilities.toAtomic(destinations.amount);
            destinations = [destinations];
        }
        let params = {
            destinations: destinations,
            mixin: parseInt(options.mixin) || 4,
            unlock_time: parseInt(options.unlockTime) || 0,
            payment_id: options.pid || null
        };
        return this._request(method, params);
    }

    transferSplit(destinations, options) {
        return this.transfer(destinations, options, 'transfer_split');
    }
}

module.exports = Wallet;

