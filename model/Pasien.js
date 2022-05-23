const mongoose = require('mongoose');

class Pasien {
    constructor() {
        // set timestamps in schema
        this.options = {
            timestamps: true
        };
        // create schema for pasien
        this.schema = mongoose.Schema({
            nama: String,
            alamat: String,
            no_telp: Number,
            jenis_kelamin: String,
            tanggal_daftar: Date,
            Golongan_darah: String,
            kode_penyakit: {type:mongoose.Schema.Types.ObjectId},
            kode_kamar: {type:mongoose.Schema.Types.ObjectId},
            kode_biaya: {type:mongoose.Schema.Types.ObjectId},
        }, this.options);
        // create model for pasien
        this.model = mongoose.model('pasien', this.schema);

        }
}

 module.exports = new Pasien();