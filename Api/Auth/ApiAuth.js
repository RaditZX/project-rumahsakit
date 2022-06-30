const Auth = require('../../model/Auth')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
const multer = require('multer')



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
                            nama: user.nama_awal,
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
                if(!req.body.email,!req.body.password){
                    res.status(400).json({message:'silahkan isi data dengan lengkap'});
                }
                //check if the user already exists
                const userFound =  await Auth.model.findOne({email:req.body.email});
                if(userFound){
                    res.status(400).json({message:'email sudah terdaftar'});
                }
                else{
                    //hash password
                    const salt = await bcrypt.genSalt(10);
                    const hashedPassword = await bcrypt.hash(req.body.password, salt);
                    //create new user
                    const user = new Auth.model({
                        email: req.body.email,
                        password: hashedPassword,
                        role: req.body.role,
                        verifikasi: req.body.verifikasi
                    });
                    //save user
                    await user.save();

                    //sign token
                    const token = jwt.sign({
                        id: user._id
                        },"jwtsecret", {
                        expiresIn: 86400
                    });

                    //send emailverification
                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        host: 'smtp.gmail.com',
                        port: 465,
                        secure: true,
                        auth: {
                            user: 'r29069992@gmail.com',
                            pass: 'ndwmmzeciketoxxk'
                        },
                    });
                    const mailOptions = {
                        from: 'Rumah Sakit',
                        to: user.email,
                        subject: 'Verifikasi Email',
                        text: 'Klik link berikut untuk verifikasi email anda : http://localhost:3001/verifikasi/'+token
                    };
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });
                    //send response
                    res.status(200).json({message:'berhasil mendaftar,Silahkan cek email untuk verfikasi'});
              }
            };

            //send email reset password
            this.forgotPassword = async (req, res) => {
                //check input fields
                if(!req.body.email){
                    res.status(400).json({message:'silahkan isi data dengan lengkap'});
                }

                // find email address
                const userFound =  await Auth.model.findOne({email:req.body.email});
                if(userFound){
                    //generate token
                    const token = jwt.sign({
                        id: userFound._id
                        },"jwtsecret", {
                        expiresIn: 86400
                    });
                    //send email
                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        host: 'smtp.gmail.com',
                        port: 465,
                        secure: true,
                        auth: {
                            user: 'r29069992@gmail.com',
                            pass: 'ndwmmzeciketoxxk'

                        }
                    });
                    const mailOptions = {
                        from: 'RumahSakit',
                        to: req.body.email,
                        subject: 'Reset Password',
                        text: 'Click the link to reset your password: http://localhost:3001/reset/'+token
                    };
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });
                    res.status(200).json({message:'email telah dikirim, silahkan cek email anda'});
                }
                else{
                    res.status(400).json({message:'email tidak terdaftar'});
                }
            };

            //reset password
            this.resetPassword = async (req, res) => {
                //check input fields
                if(!req.body.password){
                    res.status(400).json({message:'silahkan isi data dengan lengkap'});
                }

                //jwt decode
                const decoded = jwt.verify(req.params.token, 'jwtsecret');
                //find user by id
                const userFound =  await Auth.model.findByIdAndUpdate(decoded.id);
                if(userFound){
                    //hash password
                    const salt = bcrypt.genSaltSync(10);
                    const hash = bcrypt.hashSync(req.body.password, salt);
                    //update password
                    userFound.password = hash;
                    userFound.save((err, user) => {
                        if (err)
                            res.send(err);
                        res.json(user);
                    });
                }
                
            };

            //send email verify email
            this.verifyEmail = async (req, res) => {
               //check input fields
               if(!req.body.email){
                     res.status(400).json({message:'silahkan isi data dengan lengkap'});
                 }

            // find email address
            const userFound =  await Auth.model.findOne({email:req.body.email});
            if(userFound){
                //generate token
                const token = jwt.sign({
                    id: userFound._id
                    },"jwtsecret", {
                    expiresIn: 86400
                });

                //send emailverification
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    auth: {
                        user: 'r29069992@gmail.com',
                        pass: 'ndwmmzeciketoxxk'
                    },
                });
                const mailOptions = {
                    from: 'Rumah Sakit',
                    to: req.body.email,
                    subject: 'Verifikasi Email',
                    text: 'Klik link berikut untuk verifikasi email anda : http://localhost:3001/verifikasi/'+token
                };
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
                //send response
                res.status(200).json({message:'berhasil mendaftar,Silahkan cek email untuk verfikasi'});
            }
          }

            //verify email
            this.verify = async (req, res) => {
                //jwt decode
                const decoded = jwt.verify(req.params.token, 'jwtsecret');
                //find user by id
                const userFound =  await Auth.model.findByIdAndUpdate(decoded.id);
                if(userFound){
                    //update verifikasi
                    userFound.verifikasi = true;
                    userFound.save((err, user) => {
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

            //get user by id
            this.getUserById = (req, res) => {
                Auth.model.findById(req.params.Id, (err, user) => {
                    if (err)
                        res.send(err);
                    res.json(user);
                });
            }

            //update user
            this.updateUser = (req, res) => {
                Auth.model.findOneAndUpdate({ _id: req.params.Id }, req.body,{ new: true }, (err, user) => {
                    if (err)
                        res.send(err);
                    res.json(user);
                });
            }

            // Authencication
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

            