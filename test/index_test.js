'use strict';
var moneroWallet = require('../lib/wallet');

describe('moneroWallet', () => {
    const Wallet = new moneroWallet();

    describe('constructor', () => {
        it('should have default host set to `127.0.0.1`', () => {
            new moneroWallet().hostname.should.equal('127.0.0.1');
        });

        it('should have default port set to 18082', () => {
            new moneroWallet().port.should.equal(18082);
        });
    });

    describe('methods', () => {
        describe('balance()', () => {
            it('should retrieve the account balance', (done) => {
                Wallet.balance().then(function(result){
                    result.balance.should.be.a.Number();
                    done();
                })
            })
        })

        describe('address()', () => {
            it('should return the account address', (done) => {
                Wallet.address().then(function(result){
                    result.address.should.be.a.String();
                    done();
                })
            })
        })
    })
})
