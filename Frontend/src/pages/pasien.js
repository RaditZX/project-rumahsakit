import {useState,useEffect} from 'react';
import {BrowserRouter , Routes, Route, Link,useHistory,Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../compenents/navbar";
import "../App.css";
import axios from 'axios';
import ReactPaginate from 'react-paginate';

//import react boostrap
import {Card} from 'react-bootstrap';
import {Form} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Table} from 'react-bootstrap';
import {Pagination} from 'react-bootstrap';

//import react-icons
import * as BsIcons from 'react-icons/bs';
import * as MdIcons from 'react-icons/md';

function Pasien(){
    const [pasien,setPasien] = useState([]);
    const [search,setSearch] = useState('');
    const [currentPage,setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);
   
    
    useEffect(()=>{
        getPasien();
    },[])

    const getPasien = () => {
        axios.get('http://localhost:3000/pasien')
        .then(res => {
            setPasien(res.data);
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const deletePasien = (id) => {
        axios.delete(`http://localhost:3000/pasien/${id}`)
        .then(res => {
            getPasien();
        })
        .catch(err => {
            console.log(err);
        })
    }

    if (localStorage.getItem('token') === null) {
        return <Redirect to="/" />
    }
    else {
    return(
        <div>
            <Navbar />
            <div className="container">
                <div className="wrapper">

                {/* header pasien */}
                <div className="header">
                    <h1>Pasien</h1>
                    
                </div>
                <br />

                {/* fitur pasien */}
            
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
                    
                    <div class="table-responsive">
                        <Table striped bordered hover size="sm" className="table">
                            <thead>
                                <tr className="header-tabel">
                                    <th>No</th>
                                    <th>Nama</th>
                                    <th>Alamat</th>
                                    <th>No Telepon</th>
                                    <th>Jenis Kelamin</th>
                                    <th>Total hari</th>
                                    <th>G_Darah</th>
                                    <th>Kode Penyakit</th>
                                    <th>Kode Kamar</th>
                                    <th>Kode Biaya</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pasien.slice(currentPage * postsPerPage - postsPerPage, currentPage * postsPerPage).map((pasien,index) => {
                                    return(
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>{pasien.nama}</td>
                                            <td>{pasien.alamat}</td>
                                            <td>{pasien.no_telp}</td>
                                            <td>{pasien.jenis_kelamin}</td>
                                            <td>{pasien.dayssince}</td>
                                            <td>{pasien.golongan_darah}</td>
                                            {pasien.penyakit.map((penyakit,index) => {
                                                return(
                                                    <td>{penyakit.nama_penyakit}</td>
                                                )
                                            })}
                                            {pasien.kamar.map((kamar,index) => {
                                                return(
                                                    <td>{kamar.nama_kamar}</td>
                                                )
                                            })}
                                            {pasien.biaya.map((biaya,index) => {
                                                return(
                                                    <td>{biaya.nama_biaya}</td>
                                                )
                                            })}
                                            
                                    <td>
                                        <Link to={`pasien/edit/${pasien._id}`} className="btn btn-outline-info"><MdIcons.MdEdit /></Link>
                                        <button type="submit" className="btn btn-outline-danger" onClick={() => deletePasien(pasien._id)}><MdIcons.MdDelete /></button>
                                    </td>
                                </tr>   
                            )})}
                            </tbody>
                        </Table>
                        </div>
                  
                    {/* pagination */}
                    <div className="d-flex flex-row-reverse">
                       <ReactPaginate
                            previousLabel={'previous'}
                            nextLabel={'next'}
                            breakLabel={'...'}
                            pageCount={Math.ceil(pasien.length / postsPerPage)}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={(e)=>setCurrentPage(e.selected+1)}
                            containerClassName={'pagination'}
                            subContainerClassName={'pages pagination'}
                            activeClassName={'active'}
                            pageClassName={'page-item'}
                            previousClassName={'page-item'}
                            nextClassName={'page-item'}
                            previousLinkClassName={'page-link'}
                            nextLinkClassName={'page-link'}
                            disabledClassName={'disabled'}
                            activeLinkClassName={'active'}
                            pageLinkClassName={'page-link'}
                            breakClassName={'page-item'}
                            breakLinkClassName={'page-link'}
                       ></ReactPaginate>
                    </div>
                </div>
            </div>
        </div>
    )
}
}

export default Pasien;