const penyakit = require('../../model/penyakit');


class ApiPenyakit{
    constructor(){
        this.getpenyakit =  (req, res) => {
            penyakit.model.find({}, (err, penyakit) => {
                if (err)
                    res.send(err);
                res.json(penyakit);
            });
        }
        this.findpenyakit = (req, res) => {
            penyakit.model.findById(req.params.Id, (err, penyakit) => {
                if (err)
                    res.send(err);
                res.json(penyakit);
            });
        }
        this.addpenyakit = (req, res) => {
            if (!req.body.nama_penyakit) {
                res.json({
                    status: false,
                    message: 'Name is required'
                });
            }else{
            let newpenyakit = new penyakit.model(req.body);
            newpenyakit.save((err, penyakit) => {
                if (err)
                    res.send(err);
                res.json(penyakit);
            });
          }
        }
        this.updatepenyakit = (req, res) => {
            if (!req.body.kode_penyakit, !req.body.nama_penyakit, !req.body.deskripsi, !req.body.solusi) {
                res.json({
                    status: false,
                    message: 'Name is required'
                });
            }else{
            penyakit.model.findOneAndUpdate({ _id: req.params.Id }, req.body, { new: true }, (err, penyakit) => {
                if (err)
                    res.send(err);
                res.json(penyakit);
            });
          }
        }
        this.deletepenyakit = (req, res) => {
            penyakit.model.deleteOne({ _id: req.params.Id }, (err, penyakit) => {
                if (err)
                    res.send(err);
                res.json({ message: 'Successfully deleted' });
            });
        }

      
    }

   
}

module.exports = new ApiPenyakit();
