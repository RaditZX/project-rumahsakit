import React,{useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory,useParams, Link,Redirect } from 'react-router-dom';
import Navbar from "../compenents/navbar";
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
import CurrencyFormat from 'react-currency-format';

function Penyakit(){
    const [penyakit,setPenyakit] = useState([]);
    const [search,setSearch] = useState('');
    const [role,setRole] = useState('');
    const [sort,setSort] = useState('');
    const [currentPage,setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);
    const history = useHistory();
    const Id = localStorage.getItem('id')

    useEffect(()=>{
        getPenyakit();
        autorization();
        getRoles();

    },[])

    const getPenyakit = () => {
        axios.get('http://localhost:3000/penyakit',{
            headers: {
                "x-access-token": localStorage.getItem('token')
            }})
        .then(res => {
            setPenyakit(res.data);
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
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

    const deletePenyakit = (id) => {
        if(window.confirm('Are you sure?')){
            axios.delete(`http://localhost:3000/penyakit/${id}`,{
                headers: {
                    "x-access-token": localStorage.getItem('token')
                }})
            .then(res => {
                console.log(res.data);
                getPenyakit();
            })
            .catch(err => {
                console.log(err);
            })
        }
    }
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
            console.log(err);
        })
    }

    if (role === 'pasien'){
        return <Redirect to='/pasien'/>
    }
    else {
        return(
            <div>
                <Navbar />
                <div className="container-fluid">
                    <div className="wrapper">
                        {/* header penyakit */}
                            <div className="d-flex justify-content-between">
                                <div className="p-2 col-example text-left">
                                    <div className="header">
                                        <h1>Penyakit</h1>
                                    </div>
                                </div>

                                {/* fitur tambah data */}
                                {role === 'admin' || role === 'perawat' ? 
                                <div className="p-2 col-example text-left">
                                    <Link to={`/t_penyakit`} className="btn btn-primary" size="sm">Tambah Data</Link>{' '}
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
                                                <option value='nama_penyakit'>nama_penyakit</option>
                                                <option value='harga_obat'>Harga_obat</option>
                                                <option value='solusi'>solusi</option>
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
                            
                            {/* tabel data penyakit */}
                            <div className="d-flex justify-content-center">
                                <div class="table-responsive">
                                <Table class="table align-middle mb-0 bg-white">
                                    <thead class="bg-light">
                                            <tr className="header-tabel">
                                                <th>No</th>
                                                <th>Nama Penyakit</th>
                                                <th>Deskripsi</th>
                                                <th>Solusi</th>
                                                <th>Harga Obat</th>
                                                <th>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {penyakit.filter(penyakit => penyakit.nama_penyakit.toLowerCase().includes(search.toLowerCase()))
                                            .sort((a,b) => {
                                                if(sort === 'nama_penyakit'){
                                                    return a.nama_penyakit > b.nama_penyakit ? 1 : -1;
                                                }
                                                else if(sort === 'deskripsi'){
                                                    return a.deskripsi > b.deskripsi ? 1 : -1;
                                                }
                                                else if(sort === 'solusi'){
                                                    return a.solusi > b.solusi ? 1 : -1;
                                                }
                                                else if(sort === 'harga_obat'){
                                                    return a.harga_obat > b.harga_obat ? 1 : -1;
                                                }
                                            }
                                            )
                                            .slice(currentPage * postsPerPage - postsPerPage, currentPage * postsPerPage)
                                            .map((list,index) => {
                                                return(
                                                    <tr key={index}>
                                                        <td>{index+1}</td>
                                                        <td>{list.nama_penyakit}</td>
                                                        <td>{list.deskripsi}</td>
                                                        <td>{list.obat}</td>
                                                        <td><CurrencyFormat value={list.harga_obat} displayType={'text'} thousandSeparator={true} prefix={'Rp.'}/></td>
                                                        {role === 'admin' &&
                                                        <td>
                                                            <Link to={`penyakit/edit/${list._id}`} className="btn btn-outline-primary"><MdIcons.MdEdit /></Link>
                                                            <button type="submit" className="btn btn-outline-danger" onClick={() => deletePenyakit(list._id)}><MdIcons.MdDelete /></button>
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
                                pageCount={penyakit.length / postsPerPage}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={(e)=>setCurrentPage(e.selected)}
                                containerClassName={'pagination'}
                                subContainerClassName={'pages pagination'}
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
                            
                            >
                            </ReactPaginate>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
}

export default Penyakit;