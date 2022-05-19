module.exports = (app) => {

const user = require('../Api/user/ApiPasien')
const auth = require('../Api/auth/ApiAuth')


app.get('/pasien', user.getusers ) 
app.get('/pasien/:Id', user.findUsers ) 
app.post('/adduser', user.addUser )
app.put('/edit/:Id', user.updateUser )
app.delete('/pasien/:Id', user.deleteUser )

app.post('/login', auth.login )
app.post('/register', auth.register )

app.get('/', (req, res) => {
    res.send('Hello World!')
})


}


