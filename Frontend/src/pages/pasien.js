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
    const [role,setRole] = useState('');
    const [currentPage,setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);
    const Id = localStorage.getItem('id')
    const history = useHistory();

    const autorization = () => {
        axios.get(`http://localhost:3000/authenticated`,{
            headers: {
                "x-access-token": localStorage.getItem('token')
            }})
        .then(res => {
            console.log(res.data.auth);
            if(res.data.auth === false){
                history.push('/');
            }
        })
        .catch(err => {
            console.log(err.response.message);
        })
    }

    const getRoles = () => {
        axios.get(`http://localhost:3000/user/${Id}`)
        .then(res => {
            setRole(res.data.role);
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(()=>{
        autorization();
        getPasien();
        getRoles();
    },[])

    const getPasien = () => {
        axios.get('http://localhost:3000/pasien',{
            headers: {
                "x-access-token": localStorage.getItem('token')
            }})
        .then(res => {
            setPasien(res.data);
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
    return(
        <div>
            <Navbar />
            <div className="container">
                <div className="wrapper">
                    {/* header pasien */}
                    <div className="d-flex justify-content-between">
                        <div className="p-2 col-example text-left">
                            <div className="header">
                                <h1>Pasien</h1>
                            </div>
                        </div>

                        {/* fitur tambah data */}
                        {role === 'admin' || role === 'perawat' ? 
                        <div className="p-2 col-example text-left">
                            <Link to={`/t_pasien`} className="btn btn-primary" size="sm">Tambah Data</Link>{' '}
                        </div>
                        : null}

                    </div>
                    <br />
                    
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
                                    <Form.Control size="sm" value={search} onChange={(e)=> setSearch(e.target.value)} type="text" placeholder="Cari" />
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
                                    <th>Jenis Penyakit</th>
                                    <th>Jenis Kamar</th>
                                    <th>Jenis Biaya</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pasien.slice(currentPage * postsPerPage - postsPerPage, currentPage * postsPerPage)
                                .filter(pasien => {
                                    return pasien.nama.toLowerCase().includes(search.toLowerCase())
                                })
                                .map((pasien,index) => {
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
                                            {role === 'admin' &&
                                            <td>
                                                <Link to={`pasien/edit/${pasien._id}`} className="btn btn-outline-primary"><MdIcons.MdEdit /></Link>
                                                <button type="submit" className="btn btn-outline-danger" onClick={() => deletePasien(pasien._id)}><MdIcons.MdDelete /></button>
                                            </td>
                                    }
                                        </tr>
                                    )})
                                }
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

export default Pasien;