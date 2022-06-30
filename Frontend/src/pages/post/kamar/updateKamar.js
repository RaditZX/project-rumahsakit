import React,{useState,useEffect} from 'react';
import { useHistory,useParams,Redirect } from 'react-router-dom';
import {Link} from 'react-router-dom';
import axios from 'axios';


//boostrap react
import 'bootstrap/dist/css/bootstrap.min.css';

//import component react-bootstrap
import {Card} from "react-bootstrap";
import {ListGroup} from "react-bootstrap"; 
import {Form} from "react-bootstrap"

function U_kamar() {
    const [nama_kamar,setNama_kamar] = useState('');    
    const [lantai,setLantai] = useState('');
    const [harga,setHarga] = useState('');
    const [status,setStatus] = useState('');
    const [role,setRole] = useState('');
    const history = useHistory();
    const {Id} = useParams();
    const id = localStorage.getItem('id');

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
        axios.get(`http://localhost:3000/user/${id}`)
        .then(res => {
            setRole(res.data.role);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3000/editkamar/${Id}`,{
            nama_kamar,
            lantai,
            harga,
            status
        })
        .then(res => {
            console.log(res.data);
            history.push('/kamar');
        })
        .catch(err => {
            console.log(err);
        })
    }

    const getKamar = () => {
        axios.get(`http://localhost:3000/kamar/${Id}`)
        .then(res => {
            console.log(res.data);
            setNama_kamar(res.data.nama_kamar);
            setLantai(res.data.lantai);
            setHarga(res.data.harga);
            setStatus(res.data.status);
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        getKamar();
        autorization();
        getRoles();
    },[]);
    
    if(role === 'pasien'){
        return <Redirect to='/pasien'/>
    }
    else{
         // form edit data kamar
        return(
            <div className="container">
                <div className="row"  style={{"padding-top":"5rem"}}>
                    <div className="box">
                        <h1>Kamar</h1>
                             <Form onSubmit={handleSubmit}>
                                    <div className="d-flex flex-column">
                                        {/* nama */}
                                        <label>Nama Biaya: </label>
                                        <Form.Control type="text" value={nama_kamar} id="form-input" onChange={(e) => setNama_kamar(e.target.value)} placeholder="nama Kamar" /><br/>
                                        {/* no lantai */}
                                        <label>Lantai</label>
                                        <Form.Control type="text" id="form-input" value={lantai} onChange={(e) => setLantai(e.target.value)} placeholder="Lantai" /><br/>
                                        {/* Harga */}
                                        <Form.Control type="text" id="form-input" value={harga} onChange={(e) => setHarga(e.target.value)} placeholder="Harga" /><br/>
                                        {/* pilih status */}
                                        <Form.Select id="form-input" value={status} onChange={(e) => setStatus(e.target.value)}>
                                            <option value="">Pilih Status</option>
                                            <option value="tersedia">Tersedia</option>
                                            <option value="terisi">Terisi</option>
                                        </Form.Select>
                                        <div className="d-flex flex-row-reverse">
                                            <div className="p-2"><button type="submit" className="btn btn-primary" size="sm">Tambah</button></div>
                                            <div className="p-2"><Link to={`/kamar`} className="btn btn-primary" >Batal</Link>{' '}</div>
                                        </div>
                                    </div>
                             </Form>
                    </div>
                </div>
            </div>
        );
    }

}
export default U_kamar;