const Pasien = require('../../model/Pasien');

class ApiUser {
    constructor() {
        // get all users
        this.getusers = (req, res) => {
            Pasien.model.find({}, (err, users) => {
                if (err)
                    res.send(err);
                res.json(users);
            });
        };
        //get user by id
        this.findUsers = (req, res) => {
            Pasien.model.findById(req.params.Id, (err, users) => {
                if (err)
                    res.send(err);
                res.json(users);
            });
        }
        //addUser
        this.addUser = (req, res) => {
            if (!req.body.nama, !req.body.alamat, !req.body.no_telp, !req.body.jenis_kelamin, !req.body.tanggal_lahir) {
                res.json({
                    status: false,
                    message: 'Name is required'
                });
            }else{
            let newUser = new Pasien.model(req.body);
            newUser.save((err, users) => {
                if (err)
                    res.send(err);
                res.json(users);
            });
          }
        };
        //update user
        this.updateUser = (req, res) => {
            if (!req.body.nama, !req.body.alamat, !req.body.no_telp, !req.body.jenis_kelamin, !req.body.tanggal_lahir) {
                res.json({
                    status: false,
                    message: 'Name is required'
                });
            }else{
            Pasien.model.findOneAndUpdate({ _id: req.params.Id }, req.body, { new: true }, (err, users) => {
                if (err)
                    res.send(err);
                res.json(users);
            });
          }
        }
        //delete user
        this.deleteUser = (req, res) => {
            Pasien.model.deleteOne({ _id: req.params.Id }, (err, users) => {
                if (err)
                    res.send(err);
                res.json({ message: 'Successfully deleted' });
            });
        }
    }
}
module.exports = new ApiUser();

