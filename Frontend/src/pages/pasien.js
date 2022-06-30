import {useState,useEffect} from 'react';
import {BrowserRouter , Routes, Route, Link,useHistory,Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../compenents/navbar";
import "../App.css";
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import jsPDF from 'jspdf';

//import react boostrap
import {Card} from 'react-bootstrap';
import {Form} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Table} from 'react-bootstrap';
import 'jspdf-autotable';

//import react-icons
import * as BsIcons from 'react-icons/bs';
import * as MdIcons from 'react-icons/md';

function Pasien(){
    const [pasien,setPasien] = useState([]);
    const [search,setSearch] = useState('');
    const [pasienId,setPasienId] = useState('');
    const [name,setName] = useState('');
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
            setName(res.data.nama_awal)
            console.log(res.data.nama_awal)
            
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
        axios.get('http://localhost:3000/pasien')     
        .then(res => {
            console.log(res.data);
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

    const pdfDownload = (nama,jenis_kelamin,biaya,penyakit,kamar,biaya_perawatan,biayaTotal) => {
        var doc = new jsPDF();
        doc.text(80, 20, 'Biaya Total Pasien');
        doc.text(20, 40, 'Nama :' +nama);
        doc.text(20, 50, 'Jenis Kelamin :'+jenis_kelamin);
        doc.text(20, 60, 'penyakit :'+penyakit);
        doc.text(20, 70, 'Kamar :'+kamar);
        doc.text(20, 80, 'Biaya Perawatan  :'+biaya_perawatan);
        doc.text(20, 90, 'Biaya Pengobatan :'+biaya);
        doc.text(20, 100, 'Biaya Total :'+biayaTotal);
        doc.save('Pasien.pdf');

    }

    return(
        <>
            <Navbar />
            <div className="container-fluid">
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

                        {role === 'pasien' ? 
                        <div className="p-2 col-example text-left">
                            <Link to={`pasien/edit/${pasienId}`} className="btn btn-primary" size="sm">Tambah Data</Link>{' '}
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
                                        <option>select</option>
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
                        <Table class="table align-middle mb-0 bg-white">
                            <thead class="bg-light">
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
                                    <th>Total_biaya</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pasien.filter(pasien => {
                                    return pasien.nama.toLowerCase().includes(search.toLowerCase())
                                    
                                }).slice(currentPage * postsPerPage - postsPerPage, currentPage * postsPerPage).map((pasien,index) => {
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
                                            <td>{pasien.biaya_perawatan+pasien.biaya_kamar+pasien.biaya_obat}</td>
                                            { role === 'pasien' ?
                                            <td>
                                                <Button variant="outline-primary" size="sm" onClick={()=> pdfDownload(pasien.nama,pasien.jenis_kelamin,pasien.biaya_perawatan+pasien.biaya_kamar+pasien.biaya_obat)}>Cetak</Button>{' '}
                                            </td>
                                            : null}
                                            { role === 'perawat' ?
                                            <td>
                                                <button type="submit" className="btn btn-outline-danger" onClick={()=>pdfDownload(pasien.nama,pasien.jenis_kelamin,pasien.biaya_perawatan+pasien.biaya_obat+pasien.biaya_kamar)}><MdIcons.MdDownload /></button>
                                            </td>
                                            : null}
                                            {role === 'admin' &&
                                            <td>
                                                <div className="d-flex justify-content-center">
                                                    <div className="p-2 col-example text-left"><Link to={`pasien/edit/${pasien._id}`} className="btn btn-outline-primary"><MdIcons.MdEdit /></Link></div>
                                                    <div className="p-2 col-example text-left"><button type="submit" className="btn btn-outline-danger" onClick={() => deletePasien(pasien._id)}><MdIcons.MdDelete /></button></div>
                                                
                                            {pasien.penyakit.map((penyakit,index)  => {
                                                return(
                                                    pasien.kamar.map((kamar,index) => {
                                                         return(
                                                            pasien.biaya.map((biaya,index) => {
                                                                return(
                                                                    <div className="p-2 col-example text-left"><button type="submit" className="btn btn-outline-danger" onClick={()=>pdfDownload(pasien.nama,pasien.jenis_kelamin,pasien.biaya_perawatan+pasien.biaya_obat+pasien.biaya_kamar,penyakit.nama_penyakit,kamar.nama_kamar,biaya.harga,biaya.harga+pasien.biaya_perawatan+pasien.biaya_obat+pasien.biaya_kamar)}><MdIcons.MdDownload /></button></div>
                                                                    
                                                                )
                                                                })
                                                            )
                                                        })
                                                     )
                                            })}
                                           </div>
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
                            pageCount={Math.ceil( pasien.length / postsPerPage)}
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
        </>

    )


}

export default Pasien;