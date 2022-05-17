module.exports = (app) => {

const user = require('../Api/user/ApiPasien')
const auth = require('../Api/auth/ApiAuth')


app.get('/user', user.getusers ) 
app.get('/user/:Id', user.findUsers ) 
app.post('/adduser', user.addUser )
app.put('/user/:Id', user.updateUser )
app.delete('/user/:Id', user.deleteUser )

app.post('/login', auth.login )
app.post('/register', auth.register )

app.get('/', (req, res) => {
    res.send('Hello World!')
})


}


