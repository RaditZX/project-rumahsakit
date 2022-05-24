import React,{useState,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import {Link} from 'react-router-dom';

//boostrap react
import 'bootstrap/dist/css/bootstrap.min.css';

//import component react-bootstrap
import {Card} from "react-bootstrap";
import {ListGroup} from "react-bootstrap"; 
import {Form} from "react-bootstrap"

function t_biaya() {
    return(
        //form reset
        <div className="register">
            <div className="d-flex justify-content-center">
                <div className="reset" style={{marginTop: "130px"}}>

                    {/* card form reset password  */}
                    <Card style={{ width: '25rem' }}>
                        <Card.Header className="card-header">Form tambah data biaya</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                
                                {/* Email */}
                                <div className="d-flex flex-column"> 
                                    <div className="p-2 col-example text-left">
                                        <div className="d-flex flex-row">
                                            <label>Kode Biaya:</label>
                                        </div>
                                        <Form.Control type="email" placeholder="kode biaya" />
                                    </div>

                                    <div className="p-2 col-example text-left">
                                        <div className="d-flex flex-row">
                                            <label>Nama Biaya</label>
                                        </div>
                                        <Form.Control type="email" placeholder="nama biaya" />
                                    </div>

                                    {/* username */}
                                    <div className="p-2 col-example text-left">
                                        <div className="d-flex flex-row">
                                            <label>Harga:</label>
                                        </div>
                                        <Form.Control type="email" placeholder="harga" />
                                    </div>

                                    {/* password */}
                                    <div className="p-2 col-example text-left">
                                        <div className="d-flex flex-row">
                                            <label>Status:</label>
                                        </div>
                                        <Form.Control type="email" placeholder="status" />
                                    </div>

                                    <div className="d-flex flex-row-reverse">
                                        <div className="p-2">
                                            <div className="p-2"><Link to={`/biaya`} className="btn btn-primary" size="sm">Batal</Link>{' '}</div>
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
export default t_biaya;