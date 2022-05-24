import { useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';


function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState([]);
    const navigate = useNavigate();
    
    // middleware 
    useEffect(()=>{
        if(localStorage.getItem('token')){
            navigate('/pasien');
        }
    },[])

    // post data
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/login',{
            email,
            password
        })
        // receive response
        .then(res=>{
            console.log(res);
            console.log(res.data);
            localStorage.setItem('token',res.data.accessToken);
            navigate('/pasien');
        })
        // catch error
        .catch(err=>{
            setError(err.response.data.message);
            console.log(err.response.data.message);
        })
    }

    // receive error
    const getError = () => {
        if(error.length > 0){
        return(
            <div className="alert alert-danger" role="alert">
                {error}
            </div>
            )
        }

        
    }
    return(
        <div className="container">
            <div className="row">
                <div className="col-md-4 mx-auto">
                    <div className="card mt-5">
                        <div className="card-body">
                            <h3 className="text-center">Login</h3>
                            
                                {getError()}
                            
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email"  value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Username" />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Password" />
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