const mongoose = require('mongoose');
class UserAuth{
    constructor(){
        this.options = {
            timestamps: true
        };
        this.schema = mongoose.Schema({
            nama_awal: String,
            nama_akhir: String,
            password: String,
            role: String,
            email: String,
            alamat: String,
            no_telp: String,
            profile: String,
            pekerjaan: String,
            verifikasi: Boolean,
            created_at: Date,
            updated_at: Date
        }, this.options);
        this.model = mongoose.model('users', this.schema);
    }
}
module.exports = new UserAuth();