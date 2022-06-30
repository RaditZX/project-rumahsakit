import React,{useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory,useParams, Link,Redirect } from 'react-router-dom';
import Navbar from "../compenents/navbar";
import axios from "axios";
import ReactPaginate from 'react-paginate';
import CurrencyFormat from 'react-currency-format';

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
    const [role,setRole] = useState('');
    const [sort,setSort] = useState('');
    const [currentPage,setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);
    const history = useHistory();
    const Id = localStorage.getItem('id')

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
        getKamar();
        autorization();
        getRoles();
    },[])

    const getKamar = () => {
        axios.get('http://localhost:3000/kamar',{
            headers: {
                "x-access-token": localStorage.getItem('token')
            }})
        .then(res => {
            setKamar(res.data);
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const deleteKamar = (id) => {
      if(window.confirm('Are you sure?')){
        axios.delete(`http://localhost:3000/kamar/${id}`,{
            headers: {
                "x-access-token": localStorage.getItem('token')
            }})
        .then(res => {
            console.log(res.data);
            getKamar();
        })
        .catch(err => {
            console.log(err);
        })
      }
    }

    if (role === 'pasien'){
        return <Redirect to='/' />
    }
    else {
        return(
            <div>
                <Navbar />
                <div className="container-fluid">
                    {/* header kamar */}
                        <div className="d-flex justify-content-between">
                            <div className="p-2 col-example text-left">
                                <div className="header">
                                    <h1>Kamar</h1>
                                </div>
                            </div>

                            {/* fitur tambah data */}
                            {role === 'admin' || role === 'perawat' ?
                            <div className="p-2 col-example text-left">
                                <Link to={`/t_kamar`} className="btn btn-primary" size="sm">Tambah Data</Link>{' '}
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
                                        <Form.Select value={sort} onChange={(e) => setSort(e.target.value)} size="sm">
                                            <option>select</option>
                                            <option value="nama_kamar">Nama</option>
                                            <option value="harga">Harga</option>

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
                        
                        {/* tabel data kamar */}
                        <div className="d-flex justify-content-center">
                            <div class="table-responsive">
                            <Table class="table align-middle mb-0 bg-white">
                                <thead class="bg-light">
                                        <tr className="header-tabel">
                                            <th>No</th>
                                            <th>Nama Kamar</th>
                                            <th>Lantai</th>
                                            <th>Harga</th>
                                            <th>Status</th>
                                            <th>Deskripsi</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {kamar
                                        .filter(kamar => {
                                            return kamar.nama_kamar.toLowerCase().includes(search.toLowerCase())
                                        })
                                        .sort((a,b) => {
                                            if(sort === 'nama_kamar'){
                                                return a.nama_kamar > b.nama_kamar ? 1 : -1
                                            }
                                            else if(sort === 'lantai'){
                                                return a.lantai > b.lantai ? 1 : -1
                                            }
                                            else if(sort === 'harga'){
                                                return a.harga > b.harga ? 1 : -1
                                            }
                                        })
                                        .slice(currentPage * postsPerPage - postsPerPage, currentPage * postsPerPage)
                                        .map((kamar,index) => {
                                            return(
                                                <tr key={index}>
                                                    <td>{index+1}</td>
                                                    <td>{kamar.nama_kamar}</td>
                                                    <td>{kamar.lantai}</td>
                                                    <td><CurrencyFormat value={kamar.harga} displayType={'text'} thousandSeparator={true} prefix={'Rp.'}/></td>
                                                    <td>{kamar.status}</td>
                                                    <td>{kamar.deskripsi}</td>
                                                    {role === 'admin' &&
                                                    <td>
                                                    <Link to={`kamar/edit/${kamar._id}`} className="btn btn-outline-primary"><MdIcons.MdEdit /></Link>
                                                        <button type="submit" className="btn btn-outline-danger" onClick={() => deleteKamar(kamar._id)}><MdIcons.MdDelete /></button>
                                                    </td>
                                                    }
            
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>
                            </div>
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

}

export default Kamar;