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

function reset() {
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

                                {/* email */}
                                <div className="d-flex flex-column"> 
                                    <div className="p-2 col-example text-left">
                                        <div className="d-flex flex-row"><label>Email:</label></div>
                                        <Form.Control type="email" placeholder="Email@gmail.com" />
                                    </div>

                                    {/* new password */}
                                    <div className="p-2 col-example text-left">
                                        <div className="d-flex flex-row"><label>New Password:</label></div>
                                        <Form.Control type="password" placeholder="New Password" />
                                    </div>
                                    
                                    {/* confir password baru */}
                                    <div className="p-2 col-example text-left">
                                        <div className="d-flex flex-row"><label>Confir Password:</label></div>
                                        <Form.Control type="password" placeholder="New Password" />
                                    </div>

                                    {/* button reset */}
                                    <div className="p-3 col-example text-left">
                                        <div className="d-grid gap-2">
                                            <button type="submit" className="btn btn-info btn-block">Reset Password</button>
                                        </div>
                                        <p />

                                        {/* button back */}
                                        <div className="d-grid gap-2">
                                            <Link to={`/`} className="btn btn-info" size="sm">Back</Link>{' '}
                                        </div>
                                    </div>
                                </div>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </div>
            </div>
        </div>
    );
}
export default reset;