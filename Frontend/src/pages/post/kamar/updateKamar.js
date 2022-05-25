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
    const navigate = useHistory();
    const {Id} = useParams();

    const handelSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/addkamar',{
            nama_kamar,
            lantai,
            harga,
            status
        })
        .then(res => {
            console.log(res.data);
            navigate.push('/kamar');
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
    },[]);

    if(localStorage.getItem('token')=== null){
        return <Redirect to='/'/>
    }
    else{
    return(
        //form reset
        <div className="register">
            <div className="d-flex justify-content-center">
                <div className="reset" style={{marginTop: "130px"}}>

                    {/* card form reset password  */}
                    <Card style={{ width: '25rem' }}>
                        <Card.Header className="card-header">Kamar</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Form onSubmit={handelSubmit}>
                                
                                {/* Email */}
                                        <label>Nama kamar:</label>
                                        <Form.Control type="text" value={nama_kamar} onChange={(e) => setNama_kamar(e.target.value)} placeholder="nama kamar" />
                                  

                                   
                                        <label>Lantai</label>
                                        <Form.Control type="text" value={lantai} onChange={(e) => setLantai(e.target.value)} placeholder="Lantai" />
                              

                                    {/* username */}
                                
                                        <label>Harga:</label> 
                                        <Form.Control type="text" value={harga} onChange={(e) => setHarga(e.target.value)} placeholder="harga" />
                                   

                                    {/* password */}
                                  
                                        <label>Status:</label>
                                        <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                                            <option value="">Pilih Status</option>
                                            <option value="tersedia">Tersedia</option>
                                            <option value="terisi">Terisi</option>
                                        </Form.Select>
                                    

                                    <div className="d-flex flex-row-reverse">
                                        <div className="p-2">
                                            <div className="p-2"><Link to={`/kamar`} className="btn btn-primary" size="sm">Batal</Link>{' '}</div>
                                        </div>
                                        <div className="p-2">
                                            <div className="p-2">
                                                <button className="btn btn-primary" type="submit">Tambah</button>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </div>
            </div>
        </div>
    );
}
}
export default U_kamar;