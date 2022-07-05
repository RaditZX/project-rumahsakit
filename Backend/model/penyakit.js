const mongoose = require('mongoose');

class Penyakit{
    constructor(){
        this.options = {
            timestamps: true
        };
        this.schema = mongoose.Schema({
            nama_penyakit: String,
            deskripsi: String,
            obat: String,
            harga_obat: Number,

        }, this.options);
        this.model = mongoose.model('penyakit', this.schema);
    }
}
module.exports = new Penyakit();