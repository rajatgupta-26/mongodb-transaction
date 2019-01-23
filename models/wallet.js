const mongoose = require('mongoose');
// const paginate = require('mongoose-paginate');
mongoose.set('debug', true);

const WalletSchema = new mongoose.Schema({
        'email': {
            'type': String,
            'required': true
        },
        'amount': {
            'type': Number,
            'required': true,
            'default': 0
        },
        'logs': {
            'type': Array,
        }
    },
    {
        timestamps: true
    });

// WalletSchema.plugin(paginate);
module.exports = mongoose.model('Wallet', WalletSchema);
