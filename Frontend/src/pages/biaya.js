import React,{useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory,useParams, Link,Redirect} from 'react-router-dom';
import Navbar from "../compenents/navbar";
import axios from 'axios';
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

//import alert
import {confirmAlert} from 'react-confirm-alert';

function Biaya(){
    const [biaya,setBiaya] = useState([]);
    const [search,setSearch] = useState('');
    const [role,setRole] = useState('');
    const [sort,setSort] = useState('');
    const [auth,setAuth] = useState([]);
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
        getBiaya();
        autorization();
        getRoles();
    },[])

    const getBiaya = () => {
        axios.get('http://localhost:3000/biaya',{
            headers: {
                "x-access-token": localStorage.getItem('token')
            }})
        .then(res => {
            setBiaya(res.data);
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const deleteBiaya = (id) => {
        confirmAlert({
            title: 'Delete',
            message: 'Are you sure you want to delete this item?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        axios.delete(`http://localhost:3000/biaya/${id}`,{
                            headers: {
                                "x-access-token": localStorage.getItem('token')
                            }
                        })
                        .then(res => {
                            console.log(res.data);
                            getBiaya();
                        })
                        .catch(err => {
                            console.log(err);
                        })
                    }
                },
                {
                    label: 'No'
                }
            ]});
    }
    if (role === 'pasien') {
        return <Redirect to='/pasien' />
    }
    else {
        if (localStorage.getItem('token') === null){
            history.push('/');
        }
        return(
            <div>
                <Navbar />
                <div className="container-fluid">

                    {/* header pasien */}
                        <div className="d-flex justify-content-between">
                            <div className="p-2 col-example text-left">
                                <div className="header">
                                    <h1>Biaya</h1>
                                </div>
                            </div>

                            {/* fitur tambah data */}
                            {role === 'admin' || role === 'perawat' ?
                            <div className="p-2 col-example text-left">
                                <Link to={`/t_biaya`} className="btn btn-primary" size="sm">Tambah Data</Link>{' '}
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
                                            <option value="nama_biaya">Nama</option>
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
                        
                        {/* tabel data biaya */}
                        <div className="d-flex justify-content-center">
                            <div class="table-responsive">
                            <Table class="table align-middle mb-0 bg-white">
                                <thead class="bg-light">
                                        <tr className="header-tabel">
                                            <th>No</th>
                                            <th>Nama Biaya</th>
                                            <th>Harga</th>
                                            <th>Deskripsi</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {biaya
                                        .filter(biaya => {
                                            return biaya.nama_biaya.toLowerCase().includes(search.toLowerCase())
                                        })
                                        .sort((a,b) => {
                                            if(sort === 'nama_biaya'){
                                                return a.nama_biaya > b.nama_biaya ? 1 : -1
                                            }
                                            else if(sort === 'harga'){
                                                return a.harga > b.harga ? 1 : -1
                                            }
                                        })
                                        .slice(currentPage * postsPerPage - postsPerPage, currentPage * postsPerPage)
                                        .map((item,index) => {
                                            return(
                                                <tr key={index}>
                                                    <td>{index+1}</td>
                                                    <td>{item.nama_biaya}</td>
                                                    <td><CurrencyFormat value={item.harga} displayType={'text'} thousandSeparator={true} prefix={'Rp.'}/></td>
                                                    <td className='deskripsi'>{item.deskripsi}</td>
                                                    {role === 'admin' &&
                                                    <td>
                                                        <Link to={`biaya/edit/${item._id}`} className="btn btn-outline-primary"><MdIcons.MdEdit /></Link>
                                                        <button type="submit" className="btn btn-outline-danger" onClick={() => deleteBiaya(item._id)}><MdIcons.MdDelete /></button>
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
                                pageCount={Math.ceil(biaya.length / postsPerPage)}
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

export default Biaya;