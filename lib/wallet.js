'use strict';
var http = require('http');

class Wallet {
    constructor(hostname, port) {
        this.hostname = hostname || '127.0.0.1';
        this.port = port || 18082;
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

    }

    splitIntegratedAddress(address) {
        return this._body('split_integrated_address', {integrated_address: address});
    }

    stopWallet() {
        return this._request('stop_wallet');
    }
}

// general API wallet request
Wallet.prototype._request = function (body) {
    // encode the request into JSON
    let requestJSON = JSON.stringify(body);

    // set basic headers
    let headers = {};
    headers['Content-Type'] = 'application/json';
    headers['Content-Length'] = Buffer.byteLength(requestJSON, 'utf8');

    // make a request to the wallet
    let options = {
        hostname: this.hostname,
        port: this.port,
        path: '/json_rpc',
        method: 'POST',
        headers: headers
    };
    let requestPromise = new Promise((resolve, reject) => {
        let data = '';
        let req = http.request(options, (res) => {
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', function () {
                let body = JSON.parse(data);
                if (body && body.result) {
                    resolve(body.result);
                } else if (body && body.error) {
                    resolve(body.error);
                } else {
                    resolve('Wallet response error. Please try again.');
                }
            });
        });
        req.on('error', (e) => resolve(e));
        req.write(requestJSON);
        req.end();
    });

    return requestPromise;
};

// build request body
Wallet.prototype._body = function (method, params) {
    let body = {
        jsonrpc: '2.0',
        id: '0',
        method: method,
        params: params
    };
    return this._request(body);
};

/**
 * Wallet Methods
 * @type {Wallet}
 */


// transfer Monero to a single recipient, or a group of recipients
Wallet.prototype.transfer = function (destinations, options) {
    if (typeof options === 'undefined') options = {};
    if (typeof destinations === 'array') {
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
    return this._body(method, params);
};

// split a transfer into more than one tx if necessary
Wallet.prototype.transferSplit = function (destinations, options) {
    if (typeof options === 'undefined') options = {};
    if (typeof destinations === 'array') {
        destinations.forEach((dest) => dest.amount = convert(dest.amount));
    } else {
        destinations.amount = convert(destinations.amount);
        destinations = [destinations];
    }
    let method = 'transfer_split';
    let params = {
        destinations: destinations,
        mixin: parseInt(options.mixin) || 4,
        unlock_time: parseInt(options.unlockTime) || 0,
        payment_id: options.pid || null
    };
    return this._body(method, params);
};

// send all dust outputs back to the wallet with 0 mixin
Wallet.prototype.sweep = function () {
    let method = 'sweep_dust';
    return this._body(method);
};

// return the spend key or view private key (type can be 'mnemonic' seed or 'view_key')
Wallet.prototype.queryKey = function (type) {
    let method = 'query_key';
    let params = {};
    params.key_type = type;
    return this._body(method, params);
};

// make an integrated address from the wallet address and a payment id
Wallet.prototype.integratedAddress = function (pid) {
    let method = 'make_integrated_address';
    let params = {};
    params.payment_id = pid;
    return this._body(method, params);
};

module.exports = Wallet;

// helper function to convert Monero amount to atomic units
function convert(amount) {
    let number = Number(amount) * 1e12;
    // remove any decimals
    number = number.toFixed(0);
    return Number(number);
}
