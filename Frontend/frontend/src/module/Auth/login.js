import { useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';


function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const Navigate = useNavigate();
    


    useEffect(()=>{
        axios.post('/login',{
            email:email,
            password:password
            })
        .then(res=>{
            console.log(res);
            console.log(res.data);
            if(res.data.status === 'success'){
                Navigate('/pasien');
            }
            
        })
        .catch(err=>{
            console.log(err);
        })
    },[])
    return(
        <div className="container">
            <div className="row">
                <div className="col-md-4 mx-auto">
                    <div className="card mt-5">
                        <div className="card-body">
                            <h3 className="text-center">Login</h3>
                            <form>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" className="form-control" placeholder="Username" />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" className="form-control" placeholder="Password" />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )

}

export default Login;