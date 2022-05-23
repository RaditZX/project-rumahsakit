import React,{useState,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import {Link} from 'react-router-dom';

//boostrap react
import 'bootstrap/dist/css/bootstrap.min.css';

//import component react-bootstrap
import {Card} from "react-bootstrap";
import {ListGroup} from "react-bootstrap"; 
import {Form} from "react-bootstrap"

function t_penyakit() {
    return(
        //form reset
        <div className="register">
            <div className="d-flex justify-content-center">
                <div className="reset" style={{marginTop: "130px"}}>

                    {/* card form reset password  */}
                    <Card style={{ width: '25rem' }}>
                        <Card.Header className="card-header">Form tambah data penyakit</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                
                                {/* Email */}
                                <div className="d-flex flex-column"> 
                                    <div className="p-2 col-example text-left">
                                        <div className="d-flex flex-row">
                                            <label>Nama Penyakit:</label>
                                        </div>
                                        <Form.Control type="email" placeholder="nama penyakit" />
                                    </div>

                                    {/* username */}
                                    <div className="p-2 col-example text-left">
                                        <div className="d-flex flex-row">
                                            <label>Deskripsi:</label>
                                        </div>
                                        <Form.Control as="textarea" rows={3}  />
                                    </div>

                                    {/* password */}
                                    <div className="p-2 col-example text-left">
                                        <div className="d-flex flex-row"><label>Solusi:</label></div>
                                        <Form.Control as="textarea" rows={3}  />
                                    </div>

                                    <div className="d-flex flex-row-reverse">
                                        <div className="p-2">
                                            <div className="p-2"><Link to={`/penyakit`} className="btn btn-primary" size="sm">Batal</Link>{' '}</div>
                                        </div>
                                        <div className="p-2">
                                            <div className="p-2"><Link to={`/tambah`} className="btn btn-primary" size="sm">Tambah Data</Link>{' '}</div>
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
export default t_penyakit;