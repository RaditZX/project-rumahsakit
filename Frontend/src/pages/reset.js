//import react
import React,{useState,useEffect} from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useHistory,useParams } from 'react-router-dom';


//import boostrap
import  'bootstrap/dist/css/bootstrap.min.css';

//import css
import '../App.css';

//import component react-bootstrap
import {Card} from "react-bootstrap";
import {ListGroup} from "react-bootstrap"; 
import {Form} from "react-bootstrap"

function Reset() {
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [error,setError] = useState('');
    const history = useHistory();
    const {token} = useParams();

    const handelSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword){
            return false
        }
        else{
            axios.put(`http://localhost:3000/reset/${token}`,{
                password,
                confirmPassword
            })
            .then(res => {
                console.log(res.data);
                history.push('/');
            })
            .catch(err => {
                console.log(err.response.message);
            })
        }
    }


    return(
        //form reset
        <div className="register">
            <div className="d-flex justify-content-center">
                <div className="reset" style={{marginTop: "130px"}}>

                    {/* card form reset password  */}
                    <Card style={{ width: '25rem' }}>
                        <Card.Header className="card-header">Form riset password</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Form onSubmit={handelSubmit}>
                                    {/* email */}
                                    <div className="d-flex flex-column"> 

                                        {/* new password */}
                                        <div className="p-2 col-example text-left">
                                            <div className="d-flex flex-row"><label>New Password:</label></div>
                                            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New Password" />
                                        </div>
                                        
                                        {/* confir password baru */}
                                        <div className="p-2 col-example text-left">
                                            <div className="d-flex flex-row"><label>Confir Password:</label></div>
                                            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New Password" />
                                        </div>

                                        {/* button reset */}
                                        <div className="p-3 col-example text-left">
                                            <div className="d-grid gap-2">
                                                <button type="submit" className="btn btn-primary btn-block">Reset Password</button>
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
export default Reset;