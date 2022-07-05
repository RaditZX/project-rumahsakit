const Pasien = require('../../model/Pasien');

class ApiUser {
    constructor() {
        // get all users
        this.getusers = (req, res) => {
            Pasien.model.aggregate([
                {
                    $lookup: {
                        from: 'penyakits',
                        localField: 'kode_penyakit',
                        foreignField: '_id',
                        as: 'penyakit'
                    }
                },
                {
                    $lookup: {
                        from: 'biayaperawatans',
                        localField: 'kode_biaya',
                        foreignField: '_id',
                        as: 'biaya'
                    }


                },
                {
                    $lookup: {
                        from: 'kamars',
                        localField: 'kode_kamar',
                        foreignField: '_id',
                        as: 'kamar'

                    }
                },              
                {
                    $project: {
                        _id: 1,
                        nama: 1,
                        alamat: 1,
                        no_telp: 1,
                        jenis_kelamin: 1,
                        dayssince:{
                           $trunc: {
                               $divide: [
                                      {
                                            $subtract: [
                                                new Date(),
                                                "$tanggal_daftar"
                                            ]
                                        },1000*60*60*24
                                    ]
                                }

                        },
                        golongan_darah: 1,
                        penyakit: 1,
                        biaya: 1,
                        kamar: 1,
                        biaya_perawatan: {
                                $sum: "$biaya.harga"
                        },
                        biaya_kamar: {
                                $sum: "$kamar.harga"
                        },
                        biaya_obat: {
                                $sum: "$penyakit.harga_obat"
                        },
                    }
                }
            ], (err, pasien) => {
                if (err)
                    res.send(err);
                res.json(pasien);
            }
            );
        };
        //get user by id
        this.findUsers = (req, res) => {
            Pasien.model.findById(req.params.Id, (err, users) => {
                if (err)
                    res.send(err);
                res.json(users);
            });
        }

        // find user by name
        this.findname = (req, res) => {
            Pasien.model.findOne({ nama: req.params.name }, (err, users) => {
                if (err)
                    res.send(err);
                res.json(users);
            });
        }

        //addUser
        this.addUser = (req, res) => {
            if (!req.body.nama) {
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
            Pasien.model.findOneAndUpdate({ _id: req.params.Id }, req.body, { new: true }, (err, users) => {
                if (err)
                    res.send(err);
                res.json(users);
            });
          
        }

        //update user by name 
        this.updateUserbyname = (req, res) => {
            Pasien.model.findOneAndUpdate({ nama_awal: req.params.name }, req.body, { new: true }, (err, users) => {
                if (err)
                    res.send(err);
                res.json(users);
            });
          
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

