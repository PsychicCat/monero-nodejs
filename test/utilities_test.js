var assert = require('assert');
var utilities = require('../lib/utilities');

describe('Utilities', function() {
    describe('#toAtomic()', function() {
        it('should convert a float to atomic units', function() {
            assert.equal(utilities.toAtomic(1.337), 1337000000000);
        });
    });

    describe('#toFloat()', function() {
        it('should convert atomic units to float', function() {
            assert.equal(utilities.toFloat(1337000000000), 1.337);
        })
    });

    describe('#paymentId()', function() {
        it('should generate a 64 character standard payment id', function() {
            utilities.generatePaymentId().should.be.a.String();

        })
    })
});