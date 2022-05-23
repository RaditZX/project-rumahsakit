const mongoose = require('mongoose');
class UserAuth{
    constructor(){
        this.options = {
            timestamps: true
        };
        this.schema = mongoose.Schema({
            nama: String,
            password: String,
            role: String,
            email: String,
            status: String,
            created_at: Date,
            updated_at: Date
        }, this.options);
        this.model = mongoose.model('users', this.schema);
    }
}
module.exports = new UserAuth();