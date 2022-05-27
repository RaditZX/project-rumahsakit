module.exports = (app) => {

const user = require('../Api/pasien/ApiPasien')
const auth = require('../Api/auth/ApiAuth')
const kamar = require('../Api/kamar/ApiKamar')
const penyakit = require('../Api/penyakit/ApiPenyakit')
const biaya = require('../Api/Biayaperawatan/ApiBiaya')



// Route pasien
app.get('/pasien', user.getusers ) 
app.get('/pasien/:Id', user.findUsers ) 
app.post('/addpasien', user.addUser )
app.put('/edit/:Id', user.updateUser )
app.delete('/pasien/:Id', user.deleteUser )

// Route auth
app.post('/login', auth.login )
app.post('/register', auth.register )
app.get('/user', auth.getUser )
app.get('/user/:Id', auth.getUserById )
app.put('/user/:Id', auth.updateUser )
app.get('/authenticated', auth.authenticated )

// Route penyakit
app.get('/penyakit', penyakit.getpenyakit )
app.get('/penyakit/:Id', penyakit.findpenyakit )
app.post('/addpenyakit', penyakit.addpenyakit )
app.put('/editpenyakit/:Id', penyakit.updatepenyakit )
app.delete('/penyakit/:Id', penyakit.deletepenyakit )

// Route kamar
app.get('/kamar', kamar.getkamar )
app.get('/kamar/:Id', kamar.findKamar )
app.post('/addkamar', kamar.addKamar )
app.put('/editkamar/:Id', kamar.updateKamar )
app.delete('/kamar/:Id', kamar.deleteKamar )

// Route biaya
app.get('/biaya', biaya.getbiaya )
app.get('/biaya/:Id', biaya.findbiaya )
app.post('/addbiaya', biaya.addbiaya )
app.put('/editbiaya/:Id', biaya.updatebiaya )
app.delete('/biaya/:Id', biaya.deletebiaya )





}


