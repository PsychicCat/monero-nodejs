var moneroWallet = require('./lib/wallet.js');

var Wallet = new moneroWallet();

Wallet.transfer('489aMnxwT65NCHAVTvdDQrVw8655oAn1xS28dnvzijmAc2Ru1ksVbgR5bkhHSfEdFfYQM5SveRgE9g3jJzqaPJBe2oPXMTV', 1, function(err, data) {
    if(err){
        console.log(err);
    }
    console.log(data);
});


