'use strict';
const moneroWallet = require('../lib/wallet');

// Run npm test script with params to match your own hostname, port, RPC username (if RPC login enabled,) and RPC password.
// npm --port=38082 --host=127.0.0.1 --user=user --password=password run test

const PORT = process.env.npm_config_port || 38082;
const HOST_NAME = process.env.npm_config_host || '127.0.0.1';
const USER = process.env.npm_config_user || '';
const PASSWORD = process.env.npm_config_password || '';

describe('moneroWallet', () => {
    const Wallet = new moneroWallet(HOST_NAME, PORT, USER, PASSWORD);

    describe('constructor', () => {
        it('should return appropriate object', () => {
            const Wallet = new moneroWallet(HOST_NAME, PORT, USER, PASSWORD);
            Wallet.hostname.should.equal(HOST_NAME);
            Wallet.port.should.equal(PORT);
            Wallet.user.should.equal(USER);
            Wallet.pass.should.equal(PASSWORD);
        });
        // it(`should have default host set to "127.0.0.1"`, () => {
        //     new moneroWallet().hostname.should.equal('127.0.0.1');
        // });
        //
        // it('should have default port set to 18082', () => {
        //     new moneroWallet().port.should.equal(18082);
        // });
    });

    describe('methods', () => {
        describe('create_wallet()', () => {
            it('should create a new wallet monero_wallet (if monero_wallet doesn\'t exist)', (done) => {
                Wallet.create_wallet('monero_wallet').then(function(result){
                    if (result.hasOwnProperty('error')) {
                        if (result.hasOwnProperty('error')) {
                            if (result.error.code === -21) {
                                result.error.code.should.be.equal(-21)
                            }
                        }
                    } else {
                        result.should.be.a.Object();
                    }
                    done();
                })
            })
        })

        describe('open_wallet()', () => {
            it('should open monero_wallet', (done) => {
                Wallet.open_wallet('monero_wallet').then(function(result){
                    result.should.be.a.Object();
                    done();
                })
            })
        })

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

        describe('getPayments()', () => {
            it('should return empty object, because there was not payments with such pid', (done) => {
                Wallet.getPayments('60900e5603bf96e3').then(function(result){
                    result.should.be.a.Object().and.empty();
                    done();
                });
            });
        });

        describe('getBulkPayments()', () => {
            it('should return list of payments', (done) => {
                Wallet.getBulkPayments().then(function(result){
                    result.payments.should.be.a.Array();
                    done();
                });
            });
        });

        describe('incomingTransfers()', () => {
            it('should return list of all transfers', (done) => {
                Wallet.incomingTransfers('all').then(function(result){
                    result.transfers.should.be.a.Array();
                    done();
                });
            });
        });

        describe('incomingTransfers()', () => {
            it('should return list of available transfers', (done) => {
                Wallet.incomingTransfers('available').then(function(result){
                    result.transfers.should.be.a.Array();
                    done();
                });
            });
        });

        describe('incomingTransfers()', () => {
            it('should return list of unavailable transfers', (done) => {
                Wallet.incomingTransfers('unavailable').then(function(result){
                    result.transfers.should.be.a.Array();
                    done();
                });
            });
        });

        describe('queryKey()', () => {
            it('should return mnemonic key string', (done) => {
                Wallet.queryKey('mnemonic').then(function(result){
                    result.key.should.be.a.String();
                    done();
                });
            });
        });

        describe('height()', () => {
            it('should return blockchain height', (done) => {
                Wallet.height().then(function(result){
                    result.height.should.be.a.Number();
                    done();
                });
            });
        });


        describe('stopWallet()', () => {
            it('should return empty object', (done) => {
                Wallet.stopWallet().then(function(result){
                    result.should.be.a.Object().and.empty();
                    done();
                })
            })
        })
    })
})
