//import react
import {useState} from "react";
import {Link,useHistory,Redirect} from 'react-router-dom';

//import boostrap
import  'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

//import css
import '../App.css';

//import component react-bootstrap
import {Card} from "react-bootstrap";
import {ListGroup} from "react-bootstrap"; 
import {Form} from "react-bootstrap"

function Register() {
    const [nama,setNama] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3000/register',{
            nama,
            email,
            password
        })
        .then(res => {
            console.log(res.data);
            navigate.push('/');
        })
        .catch(err => {
            console.log(err);
        })
    }
    if (localStorage.getItem('token')) {
        return <Redirect to='/home'/>
    }
    else {
    return(
        //form reset
        <div className="register">
            <div className="d-flex justify-content-center">
                <div className="reset" style={{marginTop: "130px"}}>
                    {/* card form reset password  */}
                    <Card style={{ width: '25rem' }}>
                        <Card.Header className="card-header">Form Register</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Form onSubmit={handleSubmit}>
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
                                                <button type="submit" className="btn btn-info btn-block">Register</button>
                                            </div>
                                            <p />

                                            {/* button back */}
                                            <div className="d-grid gap-2">
                                                <Link to={`/`} className="btn btn-info" size="sm">Back</Link>{' '}
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
}
export default Register;