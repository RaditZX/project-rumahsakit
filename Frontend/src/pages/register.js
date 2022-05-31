//import react
import {useState,useEffect} from "react";
import {Link,useHistory,Redirect} from 'react-router-dom';

//import boostrap
import  'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

//import css
import '../App.css';

//import component react-bootstrap
import {Card} from "react-bootstrap";
import {ListGroup} from "react-bootstrap"; 
import {Form} from "react-bootstrap";
import lambang from "../image/icon.png";


function Register() {
    const [nama,setNama] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
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


    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3000/register',{
            nama,
            email,
            password
        })
        .then(res => {
            console.log(res.data);
            history.push('/');
        })
        .catch(err => {
            console.log(err);
        })
    }
    return(
        //form register
        <div className="login">
            <div className="d-flex justify-content-center">
                <div className="reset" style={{marginTop: "130px"}}>
                    <Card className="card">
                        <Card.Header className="card-header">Form Register</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Form onSubmit={handleSubmit}>
                                    <div className="d-flex justify-content-center"><img alt = "image" height = "90" width = "150" align="center" src={lambang}  /></div>
                                    
                                    {/* Email */}
                                    <div className="d-flex flex-column"> 
                                        <div className="p-2 col-example text-left">
                                            <div className="d-flex flex-row">
                                                <label>Email:</label>
                                            </div>
                                            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email@gmail.com" />
                                        </div>

                                        {/* username */}
                                        <div className="p-2 col-example text-left">
                                            <div className="d-flex flex-row">
                                                <label>Username</label>
                                            </div>
                                            <Form.Control type="text" value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Username" />
                                        </div>

                                        {/* password */}
                                        <div className="p-2 col-example text-left">
                                            <div className="d-flex flex-row"><label>Password:</label></div>
                                            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                                        </div>

                                        {/* button register */}
                                        <div className="p-3 col-example text-left">
                                            <div className="d-grid gap-2">
                                                <button type="submit" className="btn btn-primary btn-block">Register</button>
                                            </div>
                                            <p />

                                            {/* button back */}
                                            <div className="d-grid gap-2">
                                                <Link to={`/`} className="btn btn-primary" size="sm">Back</Link>{' '}
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </div>
            </div>
        </div>
    );
    
}
export default Register;