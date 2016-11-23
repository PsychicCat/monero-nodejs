var Big = require('big.js');
var Random = require('random-js');
var engine = Random.engines.nativeMath;
var distribution = Random.hex(false);


class Utilities {
    /**
     * Generate a random payment id.
     * @param type {string} use 'short' to generate a 16 char payment id for integrated addresses.
     * @returns {*}
     */
    static generatePaymentId(type = 'std') {
        let length = (type == 'short') ? 16 : 64;
        let paymentId = distribution(engine, length);
        return type == 'short' ? zeropad(paymentId, 48) : paymentId;
    }

    /**
     * Convert atomic units to float.
     * @param atomic
     * @returns {number}
     */
    static toFloat(atomic) {
        let big = new Big(atomic);
        return Number(big.div(1e12));
    }

    /**
     * Convert a float to atomic units.
     * @param float
     * @returns {number}
     */
    static toAtomic(float) {
        let big = new Big(float);
        return Number(big.times(1e12))
    }
}

function zeropad(str, length) {
    let arr = new Array(length);
    arr.fill(0);
    return str + arr.join('');
}

module.exports = Utilities;