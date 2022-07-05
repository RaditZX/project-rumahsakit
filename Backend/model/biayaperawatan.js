const mongoose = require('mongoose');

class biayaperawatan{
    constructor(){
        this.options = {
            timestamps: true
        };
        this.schema = mongoose.Schema({
            nama_biaya: String,
            harga: Number,
            status: String,
            deskripsi: String
        }, this.options);
        this.model = mongoose.model('biayaperawatan', this.schema);
    }
}
module.exports = new biayaperawatan();