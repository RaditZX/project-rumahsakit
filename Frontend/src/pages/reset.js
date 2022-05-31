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
import {Form} from "react-bootstrap";
import lambang from "../image/icon.png";


function reset() {
    return(
        //form reset
        <div className="login">
            <div className="d-flex justify-content-center">
                <div style={{marginTop: "130px"}}>

                    {/* card form reset password  */}
                    <Card className="card">
                        <Card.Header className="card-header">Form riset password</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <div className="d-flex justify-content-center"><img alt = "image" height = "90" width = "150" align="center" src={lambang}  /></div>

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
                                            <button type="submit" className="btn btn-primary btn-block">Reset Password</button>
                                        </div>
                                        <p />

                                        {/* button back */}
                                        <div className="d-grid gap-2">
                                            <Link to={`/`} className="btn btn-primary" size="sm">Back</Link>{' '}
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