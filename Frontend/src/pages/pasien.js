import {useState,useEffect} from 'react';
import {BrowserRouter , Routes, Route, Link,useHistory,Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../compenents/navbar";
import "../App.css";

//import react boostrap
import {Card} from 'react-bootstrap';
import {Form} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Table} from 'react-bootstrap';
import {Pagination} from 'react-bootstrap';

//import react-icons
import * as BsIcons from 'react-icons/bs';
import * as MdIcons from 'react-icons/md';

function pasien(){
    return(
        <div>
            <Navbar />
            <div className="container">

                {/* header pasien */}
                <Card.Header className="card" >Pasien</Card.Header>
                <br />

                {/* fitur pasien */}
                <Card className="pasien">
                    <div className="d-flex flex-row">

                        {/* fitur tambah data */}
                        <div className="p-3">
                            <Link to={`/t_pasien`} className="btn btn-primary" size="sm">Tambah Data</Link>{' '}
                        </div>
                    </div>

                    {/* fitur filter */}
                    <div className="d-flex justify-content-between">
                        <div className="p-2 col-example text-left">
                            <div className="d-flex flex-row">
                                <div className="p-2">Filter:</div>
                                <div className="p-2">
                                    <Form.Select size="sm">
                                        <option>Small select</option>
                                    </Form.Select>
                                </div>
                            </div>
                        </div>

                       {/* fitur cari */}
                        <div className="p-2 col-example text-left">
                            <div className="d-flex flex-row-reverse">
                                <div className="p-2">
                                    <Button variant="outline-primary" size="sm"><BsIcons.BsSearch /></Button>{' '}
                                </div>
                                <div className="p-2">
                                    <Form.Control size="sm" type="text" placeholder="Cari" />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* tabel data pasien */}
                    <div className="d-flex justify-content-center">
                        <Table striped bordered hover size="sm" className="tabel-pasien">
                            <thead>
                                <tr className="header-tabel">
                                    <th>No</th>
                                    <th>Nama</th>
                                    <th>Alamat</th>
                                    <th>No Telepon</th>
                                    <th>Jenis Kelamin</th>
                                    <th>Tanggal Daftar</th>
                                    <th>Golongan Darah</th>
                                    <th>Kode Penyakit</th>
                                    <th>Kode Kamar</th>
                                    <th>Kode Biaya</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td>ewhfiw</td>
                                    <td>ewhfiw</td>
                                    <td>ewhfiw</td>
                                    <td>ewhfiw</td>
                                    <td>ewhfiw</td>
                                    <td>ewhfiw</td>
                                    <td>
                                        <Link to={'/edit'} className="btn btn-outline-info"><MdIcons.MdEdit /></Link>
                                        <button type="submit" className="btn btn-outline-danger"><MdIcons.MdDelete /></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td>ewhfiw</td>
                                    <td>ewhfiw</td>
                                    <td>ewhfiw</td>
                                    <td>ewhfiw</td>
                                    <td>ewhfiw</td>
                                    <td>ewhfiw</td>
                                    <td>
                                        <Link to={'/edit'} className="btn btn-outline-info"><MdIcons.MdEdit /></Link>
                                        <button type="submit" className="btn btn-outline-danger"><MdIcons.MdDelete /></button>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>

                    {/* pagination */}
                    <div className="d-flex flex-row-reverse">
                        <Pagination>
                            <Pagination.First />
                            <Pagination.Prev />
                            <Pagination.Item>{1}</Pagination.Item>
                            <Pagination.Ellipsis />
                        
                            <Pagination.Ellipsis />
                            <Pagination.Item>{20}</Pagination.Item>
                            <Pagination.Next />
                            <Pagination.Last />
                        </Pagination>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default pasien;