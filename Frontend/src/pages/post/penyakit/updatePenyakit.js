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

function U_penyakit() {
    const [nama_penyakit, setNama_penyakit] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const [solusi, setSolusi] = useState('');
    const history = useHistory();
    const {Id} = useParams();

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

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3000/editpenyakit/${Id}`, {
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
    const getPenyakit = () => {
        axios.get(`http://localhost:3000/penyakit/${Id}`)
        .then(res => {
            setNama_penyakit(res.data.nama_penyakit);
            setDeskripsi(res.data.deskripsi);
            setSolusi(res.data.solusi);

        })
        .catch(err => {
            console.log(err);
        })
    }
    useEffect(() => {
        getPenyakit();
        autorization();
    },[]);

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
                                        <Form.Control type="text" value={nama_penyakit} onChange={(e) => setNama_penyakit(e.target.value)}  />
                                    </div>

                                    {/* username */}
                                    <div className="p-2 col-example text-left">
                                        <div className="d-flex flex-row">
                                            <label>Deskripsi:</label>
                                        </div>
                                        <Form.Control type="text" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)}  />
                                    </div>

                                    {/* password */}
                                    <div className="p-2 col-example text-left">
                                        <div className="d-flex flex-row"><label>Solusi:</label></div>
                                        <Form.Control type="text"  value={solusi} onChange={(e) => setSolusi(e.target.value)}  />
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
export default U_penyakit;