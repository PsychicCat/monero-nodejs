'use strict';
var moneroWallet = require('../lib/wallet');

describe('moneroWallet', function () {
    const Wallet = new moneroWallet();

    describe('constructor', function () {
        it('should have default host set to `127.0.0.1`', () => {
            new moneroWallet().hostname.should.equal('127.0.0.1');
        });

        it('should have default port set to 18082', () => {
            new moneroWallet().port.should.equal(18082);
        });
    });

    describe.skip('methods', function () {
        describe('balance()', function () {
            it('should retrieve the account balance', (done) => {
                Wallet.balance().should.eventually.have.property('balance');
                done();
            })
        })

        describe('address()', function () {
            it('should return the account address', (done) => {
                Wallet.address().then(function (result) {
                    result.address.should.be.a.String();
                    done();
                })
            })
        })
    })
})
