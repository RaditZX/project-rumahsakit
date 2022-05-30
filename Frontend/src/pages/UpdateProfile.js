import React,{useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory,useParams, Link } from 'react-router-dom';
import Navbar from "../compenents/navbar";

//import react boostrap
import {Card} from 'react-bootstrap';
import {ListGroup} from 'react-bootstrap';
import {Form} from 'react-bootstrap';

//import react router dom

function UpdateProfile(){
    return(
        <div className="home">
            <Navbar />
            <div className='container'>
                <div className="d-flex flex-row">
                    <div className="p-2">
                        <Card style={{ width: '18rem' }}>
                            <Card.Header style={{ height: 'auto' }}>
                                <div className="d-flex justify-content-center">
                                    <div className="d-flex flex-column">
                                        {/* foto */}
                                        <div className="p-2 col-example text-left">
                                            <img className="rounded-circle" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" />
                                        </div>

                                        {/* nama */}
                                        <div className="p-2 col-example text-left">
                                            <div className="d-flex justify-content-center">
                                                <h2>gduwd</h2>
                                            </div>
                                        </div>

                                        {/* nama */}
                                        <div className="p-2 col-example text-left">
                                            <div className="d-flex justify-content-center">
                                                <p>hfwhefi</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card.Header>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Cras justo odio</ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </div>
                    <div className="p-2">
                        <div >
                            {/* card form login  */}
                            <Card style={{ width: '45rem' }}>
                                <Card.Header><h2>Pasien</h2></Card.Header>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Form>
                                        <div className="row mt-2">
                                            <div className="col-md-6">
                                                <label className="labels">Nama Awal: </label> 
                                                <Form.Control type="text"  placeholder="nama awal" />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="labels">Nama Akhir:</label>
                                                <Form.Control type="text"  placeholder="nama akhir" />
                                            </div>
                                        </div><br />
                                        <div className="row mt-2">
                                            <div className="col-md-6">
                                                <label className="labels">No Telepon: </label> 
                                                <Form.Control type="text"  placeholder="08xxx" />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="labels">Alamat Email:</label>
                                                <Form.Control type="text"  placeholder="anda@gmail.com" />
                                            </div>
                                        </div><br />
                                        <div className="row mt-2">
                                            <div className="col-md-6">
                                                <label className="labels">Passcode: </label> 
                                                <Form.Control type="text"  placeholder=" xxx" />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="labels">Alammat rumah:</label>
                                                <Form.Control type="text"  placeholder="Jalan xxx" />
                                            </div>
                                        </div><br />
                                        <div className="d-flex flex-row-reverse">
                                            <button className="btn btn-primary" type="submit">Simpan</button>
                                        </div>
                                        
                                        </Form>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateProfile;