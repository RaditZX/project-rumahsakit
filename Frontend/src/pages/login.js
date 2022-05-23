//import react
import React from "react";
import {Link} from 'react-router-dom';

//import boostrap
import  'bootstrap/dist/css/bootstrap.min.css';

//import css
import '../App.css';

//import component react-bootstrap
import {Card} from "react-bootstrap";
import {ListGroup} from "react-bootstrap"; 
import {Form} from "react-bootstrap"

function login() {
    return(
        //form login
        <div className="login">
        <div className="d-flex justify-content-center">
            <div className="" style={{marginTop: "120px"}}>
                {/* card form login  */}
                <Card style={{ width: '25rem' }}>
                    <Card.Header>Form Login</Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <div className="d-flex flex-column"> 
                                <div className="p-2 col-example text-left"></div>
                                <div className="p-2 col-example text-left">
                                    <Form.Control type="email" placeholder="username" />
                                </div>
                                <div className="p-2 col-example text-left">
                                    <Form.Control type="password" placeholder="password" />
                                </div>
                                
                                {/* lupa password */}
                                <div className="p-1 col-example text-left">
                                    <div className="d-flex justify-content-end">
                                        <Link to={`/reset`}  size="sm">Lupa Password?</Link>{' '}
                                    </div>
                                </div>
                                <div className="p-3 col-example text-left">
                                    <div className="d-grid gap-2">
                                        <Link to={`/home`} className="btn btn-info" size="sm">Login</Link>{' '}
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
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </div>
        </div>
        </div>
    );
}
export default login;
