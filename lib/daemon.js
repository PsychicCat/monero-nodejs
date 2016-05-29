'use strict';
var http = require('http');

class Daemon {
    constructor(hostname, port) {
        this.hostname = hostname || '127.0.0.1';
        this.port = port || 18081;
    }
}

// general API daemon request

Daemon.prototype._request = function (body) {
    let headers = {};
    headers['Content-Type'] = 'application/json';
 
    let options = {
        hostname: this.hostname,
        port: this.port,
        path: '/get_transaction_pool',
        method: 'GET',
        headers: headers
    };
    
    let requestPromise = new Promise((resolve, reject) => {
            var data = '';
    let req = http.get(options, (res) => {
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                data += chunk;
            });
            res.on('end', function() {
                let body = JSON.parse(data);
                resolve(body)
            })
            req.end()
        })
    })
    return requestPromise;
};

Daemon.prototype.getTransactionPool = function() {
    let method = '/get_transaction_pool';
    return this._request(method);
};

module.exports = Daemon;