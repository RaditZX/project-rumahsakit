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

function U_biaya() {
    const [nama_biaya,setNama_biaya] = useState('');
    const [harga,setHarga] = useState('');
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
        axios.post('http://localhost:3000/addbiaya',{
            nama_biaya,
            harga
        })
        .then(res => {
            console.log(res.data);
            history.push('/biaya');
        })
        .catch(err => {
            console.log(err);
        })
    }

    const getBiaya = () => {
        axios.get(`http://localhost:3000/biaya/${Id}`)
        .then(res => {
            console.log(res.data);
            setNama_biaya(res.data.nama_biaya);
            setHarga(res.data.harga);
        })
    }

    useEffect(() => {
        getBiaya();
        autorization();
    },[]);

    return(
        //form update biaya
        <div className="register">
            <div className="d-flex justify-content-center">
                <div className="reset" style={{marginTop: "130px"}}>

                    {/* card form update biaya  */}
                    <Card style={{ width: '25rem' }}>
                        <Card.Header className="card-header">Form tambah data biaya</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Form onSubmit={handleSubmit}>
                                
                                    {/* nama biaya */}
                                    <div className="d-flex flex-column">
                                        <div className="p-2 col-example text-left">
                                            <div className="d-flex flex-row">
                                                <label>Nama Biaya</label>
                                            </div>
                                            <Form.Control type="text" value={nama_biaya} onChange={(e) => setNama_biaya(e.target.value)} placeholder="nama biaya" />
                                        </div>

                                        {/* harga */}
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
export default U_biaya;