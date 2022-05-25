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

function T_penyakit() {
    const [nama_penyakit, setNama_penyakit] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const [solusi, setSolusi] = useState('');
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/addpenyakit',{
            nama_penyakit,
            deskripsi,
            solusi
        })
        // receive response
        .then(res=>{
            console.log(res.data);
            history.push('/penyakit');
        })
        // catch error
        .catch(err=>{
            console.log(err.response.data.message);
        })
    }
    if(localStorage.getItem('token') == null){
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
                        <Card.Header className="card-header">Form tambah data penyakit</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Form onSubmit={handleSubmit}>
                                
                                {/* Email */}
                                <div className="d-flex flex-column"> 
                                    <div className="p-2 col-example text-left">
                                        <div className="d-flex flex-row">
                                            <label>Nama Penyakit:</label>
                                        </div>
                                        <Form.Control type="text" value={nama_penyakit} onChange={(e) => setNama_penyakit(e.target.value)} placeholder="nama penyakit" />
                                    </div>

                                    {/* username */}
                                    <div className="p-2 col-example text-left">
                                        <div className="d-flex flex-row">
                                            <label>Deskripsi:</label>
                                        </div>
                                        <Form.Control as="textarea" rows={3} value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)}  />
                                    </div>

                                    {/* password */}
                                    <div className="p-2 col-example text-left">
                                        <div className="d-flex flex-row"><label>Solusi:</label></div>
                                        <Form.Control as="textarea" rows={3} value={solusi} onChange={(e) => setSolusi(e.target.value)}  />
                                    </div>

                                    <div className="d-flex flex-row-reverse">
                                        <div className="p-2">
                                            <div className="p-2"><Link to={`/penyakit`} className="btn btn-primary" size="sm">Batal</Link>{' '}</div>
                                        </div>
                                        <div className="p-2">
                                            <button className="btn btn-primary" size="sm" type="submit">Tambah</button>
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
export default T_penyakit;