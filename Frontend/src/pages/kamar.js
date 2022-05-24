import React,{useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory,useParams, Link } from 'react-router-dom';
import Navbar from "../compenents/navbar";
import axios from "axios";
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

function Kamar(){
    const [kamar,setKamar] = useState([]);
    const [search,setSearch] = useState('');
    const [currentPage,setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);

    useEffect(()=>{
        getKamar();
    },[])

    const getKamar = () => {
        axios.get('http://localhost:3000/kamar')
        .then(res => {
            setKamar(res.data);
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }

    return(
        <div>
            <Navbar />
            <div className="container">

                {/* header pasien */}
                <div className="header">
                    <h1>Kamar</h1>
                    
                </div>
                <br />

                {/* fitur pasien */}
           
                    <div className="d-flex flex-row">

                        {/* fitur tambah data */}
                        <div className="p-3">
                            <Link to={`/t_kamar`} className="btn btn-primary" size="sm">Tambah Data</Link>{' '}
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
                                    <th>Nama Kamar</th>
                                    <th>Lantai</th>
                                    <th>Harga</th>
                                    <th>Status</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {kamar.slice(currentPage * postsPerPage - postsPerPage, currentPage * postsPerPage).map((kamar,index) => {
                                    return(
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>{kamar.nama_kamar}</td>
                                            <td>{kamar.lantai}</td>
                                            <td>{kamar.harga}</td>
                                            <td>{kamar.status}</td>
                                            <td>
                                                <Link to={`/e_kamar/${kamar.id}`} className="btn btn-primary" size="sm">Edit</Link>{' '}
                                                <Link to={`/d_kamar/${kamar.id}`} className="btn btn-danger" size="sm">Delete</Link>{' '}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </div>

                    {/* pagination */}
                    <div className="d-flex flex-row-reverse">
                    <ReactPaginate
                            previousLabel={'previous'}
                            nextLabel={'next'}
                            breakLabel={'...'}
                            pageCount={Math.ceil(kamar.length / postsPerPage)}
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
    )
}

export default Kamar;