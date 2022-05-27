const Auth = require('../../model/Auth')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

class Authentication {
    constructor() {
        //login
        this.login = (req, res) => {
            //find user by email
            Auth.model.findOne({ email: req.body.email }, (err, user) => {
                //if error or user not found
                if (err)
                    res.send(err);

                if (!user) {
                    res.json({
                        status: false,
                        message: 'Authentication failed. User not found.'
                    });
                } 
                else {
                     //comparing passwords
                     var passwordIsValid = bcrypt.compareSync(
                         req.body.password,
                         user.password
                    );
                     // checking if password was valid and send response accordingly
                    if (!passwordIsValid) {
                        return res.status(401)
                        .send({
                            auth:false,
                            accessToken: null,
                            message: "Invalid Password!"
                        });
                    }
                     //signing token with user id
                     var token = jwt.sign({
                         id: user._id
                         },"jwtsecret", {
                         expiresIn: 86400
                     });

                    //responding to client request with user profile success message and  access token .
                    res.status(200).json({
                        user: {
                            id: user._id,
                            email: user.email,
                            nama: user.nama,
                            role: user.role
                        },
                        auth: true,
                        message: "Login successfull",
                        accessToken: token,
                        });
                }
            });
            
         };
         //register
        this.register = async (req, res) => {
                //check input fields
                if(!req.body.email,!req.body.password,!req.body.nama){
                    res.status(400).json({message:'silahkan isi data dengan lengkap'});
                }
                //check if the user already exists
                const userFound =  await Auth.model.findOne({email:req.body.email});
                if(userFound){
                    res.status(400).json({message:'email sudah terdaftar'});
                }
                else{
                //hash password
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(req.body.password, salt);

                
                //create new user
                const newUser = new Auth.model({
                    email: req.body.email,
                    password: hash,
                    nama: req.body.nama,
                    role: req.body.role
                });
                //save user
                newUser.save((err, user) => {
                    if (err)
                        res.send(err);
                    res.json(user);
                });
              }
            };

            //get user
            this.getUser = (req, res) => {
                Auth.model.find({}, (err, user) => {
                    if (err)
                        res.send(err);
                    res.json(user);
                });
            }

            this.getUserById = (req, res) => {
                Auth.model.findById(req.params.Id, (err, user) => {
                    if (err)
                        res.send(err);
                    res.json(user);
                });
            }

            this.updateUser = (req, res) => {
                Auth.model.findOneAndUpdate({ _id: req.params.Id }, req.body, { new: true }, (err, user) => {
                    if (err)
                        res.send(err);
                    res.json(user);
                });
            }

            this.authenticated = (req, res, next) => {
                const token = req.headers['x-access-token'];
                if (!token)
                    return res.status(401).send({ auth: false, message: 'No token provided.' });
                jwt.verify(token, 'jwtsecret', (err, decoded) => {
                    if (err)
                        return res.send({ auth: false, message: 'Failed to authenticate token.' });
                    else{
                        res.send({ auth: true, message: 'Token authenticated.' });
                    }
                });
            }

    }
}
module.exports = new Authentication();

            