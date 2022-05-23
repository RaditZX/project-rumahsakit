const mongoose = require('mongoose');

class Kamar{
    constructor(){
        this.options = {
            timestamps: true
        };
        this.schema = mongoose.Schema({
            nama_kamar: String,
            lantai: String,
            harga: Number,
            status: String
        }, this.options);
        this.model = mongoose.model('kamar', this.schema);
    }
}

module.exports = new Kamar();