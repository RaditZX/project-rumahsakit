const mongoose = require('mongoose');

class Pasien {
    constructor() {
        this.options = {
            timestamps: true
        };
        this.schema = mongoose.Schema({
            nama: String,
            alamat: String,
            no_telp: String,
            jenis_kelamin: String,
            tanggal_lahir: String,
        }, this.options);
        this.model = mongoose.model('pasien', this.schema);

        }
}

 module.exports = new Pasien();