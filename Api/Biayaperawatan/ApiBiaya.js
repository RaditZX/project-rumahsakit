const biaya = require('../../model/biayaperawatan');


class Biaya {
    constructor() {
        this.getbiaya = (req, res) => {
            biaya.model.find({}, (err, biaya) => {
                if (err)
                    res.send(err);
                res.json(biaya);
            });
        }
        this.findbiaya = (req, res) => {
            biaya.model.findById(req.params.Id, (err, biaya) => {
                if (err)
                    res.send(err);
                res.json(biaya);
            });
        }
        this.addbiaya = (req, res) => {
            if ( !req.body.nama_biaya ) {
                res.json({
                    status: false,
                    message: 'Name is required'
                });
            }else{
            let newbiaya = new biaya.model(req.body);
            newbiaya.save((err, biaya) => {
                if (err)
                    res.send(err);
                res.json(biaya);
            });
          }
        }
        this.updatebiaya = (req, res) => {
            if (!req.body.kode_biaya, !req.body.nama_biaya, !req.body.harga, !req.body.status) {
                res.json({
                    status: false,
                    message: 'Name is required'
                });
            }else{
            biaya.model.findOneAndUpdate({ _id: req.params.Id }, req.body, { new: true }, (err, biaya) => {
                if (err)
                    res.send(err);
                res.json(biaya);
            });
          }
        }
        this.deletebiaya = (req, res) => {
            biaya.model.deleteOne({ _id: req.params.Id }, (err, biaya) => {
                if (err)
                    res.send(err);
                res.json({ message: 'Successfully deleted' });
            });
        };

    }    

}

module.exports = new Biaya();