import React,{useState,useEffect} from 'react';
import { useHistory,Redirect } from 'react-router-dom';
import {Link} from 'react-router-dom';
import axios from 'axios';


//boostrap react
import 'bootstrap/dist/css/bootstrap.min.css';

//import component react-bootstrap
import {Card} from "react-bootstrap";
import {ListGroup} from "react-bootstrap"; 
import {Form} from "react-bootstrap"

function T_kamar() {
    const [nama_kamar,setNama_kamar] = useState('');    
    const [lantai,setLantai] = useState('');
    const [harga,setHarga] = useState('');
    const [status,setStatus] = useState('');
    const [auth,setAuth] = useState([]);
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

    useEffect(() => {
        autorization();
    },[]);

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
            history.push('/kamar');
        })
        .catch(err => {
            console.log(err);
        })
    }
    if(auth.length === 0){
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
export default T_kamar;