import React,{useState,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import {Link} from 'react-router-dom';

//boostrap react
import 'bootstrap/dist/css/bootstrap.min.css';

//import css

//import component react-bootstrap
import {Card} from "react-bootstrap";
import {ListGroup} from "react-bootstrap"; 
import {Form} from "react-bootstrap"

function t_pasien() {
    return(
        //form login
        <div className="login">
        <div className="d-flex justify-content-center">
            <div className="" style={{marginTop: "120px"}}>
                {/* card form login  */}
                <Card style={{ width: '60rem' }}>
                    <Card.Header>Form tambah data pasien</Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <div className="d-flex flex-column">
                                <div className="p-2 col-example text-left">
                                    <div className="d-flex justify-content-start">
                                        <div className="p-2 col-example text-left">
                                            <label>Nama Pasien: </label>
                                            <Form.Control type="email" placeholder="nama pasien" />
                                        </div>
                                        <div className="p-2 col-example text-left">
                                            <label>No Telepon:</label>
                                            <Form.Control type="email" placeholder="no telepon" />
                                        </div>
                                        <div className="p-2 col-example text-left">
                                            <label>Kode Penyakit:</label>
                                            <Form.Control type="email" placeholder="kode penyakit" />
                                        </div>
                                        <div className="p-2 col-example text-left">
                                            <label>Jenis Kelamin:</label>
                                            <Form.Select size="sm">
                                                <option>Laki-Laki</option>
                                                <option>Perempuan</option>
                                            </Form.Select>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-2 col-example text-left">
                                    <div className="d-flex justify-content-start">
                                        <div className="p-2 col-example text-left">
                                            <label>Kode Biaya:</label>
                                            <Form.Control type="email" placeholder="kode biaya" />
                                        </div>
                                        <div className="p-2 col-example text-left">
                                            <label>Kode Kamar:</label>
                                            <Form.Control type="email" placeholder="kode kamar" />
                                        </div>
                                        <div className="p-2 col-example text-left">
                                            <label>Tanggal Daftar</label>
                                            <Form.Control type="date" placeholder="name@example.com" />
                                        </div>
                                        <div className="p-2 col-example text-left">
                                            <label>Golongan Darah:</label>
                                            <Form.Select size="sm">
                                                <option>A</option>
                                                <option>B</option>
                                                <option>AB</option>
                                                <option>O</option>
                                            </Form.Select>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-2 col-example text-left">
                                    <div className="d-flex justify-content-start">
                                        <div className="p-2 col-example text-left">
                                            <label>Alamat:</label>
                                            <Form.Control as="textarea" rows={3} style={{width: "55rem"}} />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-2 col-example text-left">
                                    <div className="d-flex flex-row-reverse">
                                        <div className="p-2"><Link to={`/tambah`} className="btn btn-primary" size="sm">Tambah Data</Link>{' '}</div>
                                        <div className="p-2"><Link to={`/pasien`} className="btn btn-primary" size="sm">Batal</Link>{' '}</div>
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
export default t_pasien;
