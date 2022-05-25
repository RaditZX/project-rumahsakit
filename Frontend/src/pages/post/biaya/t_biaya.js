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

function T_biaya() {
    const [nama_biaya,setNama_biaya] = useState('');
    const [harga,setHarga] = useState('');
    const navigate = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/addbiaya',{
            nama_biaya,
            harga
        })
        .then(res => {
            console.log(res.data);
            navigate.push('/biaya');
        })
        .catch(err => {
            console.log(err);
        })
    }

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
                        <Card.Header className="card-header">Form tambah data biaya</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Form onSubmit={handleSubmit}>
                                
                                    {/* Email */}
                                    <div className="d-flex flex-column"> 

                                        <div className="p-2 col-example text-left">
                                            <div className="d-flex flex-row">
                                                <label>Nama Biaya</label>
                                            </div>
                                            <Form.Control type="text" value={nama_biaya} onChange={(e) => setNama_biaya(e.target.value)} placeholder="nama biaya" />
                                        </div>

                                        {/* username */}
                                        <div className="p-2 col-example text-left">
                                            <div className="d-flex flex-row">
                                                <label>Harga:</label>
                                            </div>
                                            <Form.Control type="text"  value={harga} onChange={(e) => setHarga(e.target.value)} placeholder="harga" />
                                        </div>

                                        <div className="d-flex flex-row-reverse">
                                            <div className="p-2">
                                                <div className="p-2"><Link to={`/biaya`} className="btn btn-primary" size="sm">Batal</Link>{' '}</div>
                                            </div>
                                            <div className="p-2">
                                                <div className="p-2">
                                                    <button className="btn btn-primary" type="submit">Tambah</button>
                                                </div>
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
export default T_biaya;