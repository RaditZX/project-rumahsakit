//import react
import {useState,useEffect} from "react";
import {Link,useHistory,Redirect} from 'react-router-dom';
import axios from 'axios';

//import boostrap
import  'bootstrap/dist/css/bootstrap.min.css';

//import css
import '../App.css';

//import component react-bootstrap
import {Card} from "react-bootstrap";
import {ListGroup} from "react-bootstrap"; 
import {Form} from "react-bootstrap"
import lambang from "../image/icon.png";

function Login() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');
    const [auth,setAuth] = useState([]);
    const history = useHistory();
    const  Id = localStorage.getItem('id')

    const autorization = () => {
        axios.get(`http://localhost:3000/authenticated`,{
            headers: {
                "x-access-token": localStorage.getItem('token')
            }})
        .then(res => {
            console.log(res.data.auth);
            if(res.data.auth === true){
                history.push('/home');
            }
        })
        .catch(err => {
            console.log(err.response.message);
        })
    }

    useEffect(() => {
        autorization();
    },[]);



    const handelSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/login',{
            email,
            password
        })
        .then(res => {
            console.log(res.data);
            localStorage.setItem('token',res.data.accessToken);
            localStorage.setItem('id',res.data.user.id);
            history.push('/home');

        })
        .catch(err => {
            console.log(err);
            setError('Email atau Password Salah');
        })
    }
 
    return(
        //form login
        <div className="login">
        <div className="d-flex justify-content-center">
            <div className="" style={{marginTop: "120px"}}>
                {/* card form login  */}
                <Card className="card" >
                    <Card.Header>Form Login</Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Form onSubmit={handelSubmit}>
                                <div className="d-flex justify-content-center"><img alt = "image" height = "90" width = "150" align="center" src={lambang}  /></div>
                            
                                <div className="d-flex flex-column"> 
                                    <div className="p-2 col-example text-left"></div>
                                    <div className="p-2 col-example text-left">
                                        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="username" />
                                    </div>
                                    <div className="p-2 col-example text-left">
                                        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
                                    </div>
                                    
                                    {/* lupa password */}
                                    <div className="p-1 col-example text-left">
                                        <div className="d-flex justify-content-end">
                                            <Link to={`/reset`}  size="sm">Lupa Password?</Link>{' '}
                                        </div>
                                    </div>
                                    <div className="p-3 col-example text-left">
                                        <div className="d-grid gap-2">
                                           <button className="btn btn-primary" type="submit">Login</button>
                                        </div>
                                    </div>
                                    
                                    {/* button registrasi */}
                                    <div className="p-0 col-example text-left">
                                        <div className="d-flex justify-content-center">
                                            <a>Belum punya akun?</a>
                                            <Link to={`/register`}  size="sm">Daftar sekarang</Link>{' '}
                                        </div>
                                    </div>
                                </div>
                                < br/>
                            </Form>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </div>
        </div>
        </div>
    );
    
}
export default Login;
