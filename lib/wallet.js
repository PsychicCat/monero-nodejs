'use strict';
var fetch = (typeof self === 'undefined' || self.fetch) || require('node-fetch');
var Utilities = require('../lib/utilities');

class Wallet {
    constructor(hostname, port, secure) {
        this.hostname = hostname || '127.0.0.1';
        this.port = port || 18082;
        this.protocol = secure === true ? 'https' : 'http';
        this.params = {};
    }

    /**
     * Get the standard public address of this wallet.
     * @returns {object}
     */
    address() {
        this.method = 'getaddress';
        return _request(this);
    }

    /**
     * Get the current balance of this wallet.
     * @returns {object}
     */
    balance() {
        this.method = 'getbalance';
        return _request(this);
    }

    /**
     * Get the current block height of this wallet.
     * @returns {object}
     */
    height() {
        this.method = 'getheight';
        return _request(this);
    }

    /**
     * Get incoming transfers to this wallet.
     * @param type {string} must be one of: 'all', 'available', or 'unavailable'
     * @returns {object}
     */
    incomingTransfers(type) {
        this.method = 'incoming_transfers'
        this.params = {transfer_type: type}
        return _request(this);
    }

    /**
     * Get payments to this wallet from a single payment id.
     * @param paymentId
     * @returns {object}
     */
    getPayments(paymentId) {
        this.method = 'get_payments';
        this.params = {payment_id: paymentId}
        return _request(this);
    }

    /**
     * Get payments to this wallet from a list of payment ids.
     * @param paymentIds
     * @param minBlockHeight
     * @returns {object}
     */
    getBulkPayments(paymentIds, minBlockHeight) {
        this.method = 'get_bulk_payments';
        this.params.paymentIds = paymentIds;
        this.params.minBlockHeight = minBlockHeight;
        return _request(this);
    }

    makeIntegratedAddress(paymentId) {
        this.method = 'make_integrated_address';
        this.params.payment_id = paymentId;
        return _request(this);
    }

    splitIntegratedAddress(address) {
        return _request('split_integrated_address', {integrated_address: address});
    }

    store() {
        return _request('store');
    }

    stopWallet() {
        return _request('stop_wallet');
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
        return _request(method, params);
    }

    transferSplit(destinations, options) {
        return this.transfer(destinations, options, 'transfer_split');
    }

    getTransfers(options) {
        this.method = 'get_transfers'
        this.params = options
        return _request(this);
    }
}

// private method for making RPC requests
function _request(self) {
    let body = {
        jsonrpc: '2.0',
        id: '0',
        method: self.method,
        params: self.params
    };
    let options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    };

    return new Promise((resolve, reject) => {
        fetch(`${self.protocol}://${self.hostname}:${self.port}/json_rpc`, options)
        .then((response) => {
            if(response.ok) {
                response.json().then((json) => {
                    if (json && json.result) {
                        resolve(json.result);
                    } else if (json && json.error) {
                        reject(json.error);
                    } else {
                        reject(response);
                    }
                })
            } else {
                reject(response);
            }
        })
        .catch(reject);
    });
}

module.exports = Wallet;

