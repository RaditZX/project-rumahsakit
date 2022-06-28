import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {useHistory,useParams, Link} from 'react-router-dom';

function Verifikasi() {
    const verifikasi = true;
    const [status,setStatus] = useState(false);
    const {token} = useParams();
    

    const handelSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3000/verifikasi/${token}`)
        .then(res => {
            setStatus(true);
        })
        .catch(err => {
            console.log(err.response.message);
        })
    }



    const notification = () => {
        if(status === true){
            return(
                <div className="alert alert-success" role="alert">
                    <h4 className="alert-heading">Berhasil</h4>
                    <p>Silahkan login</p>
                    <hr />
                    <p className="mb-0">
                        <Link to="/" className="btn btn-primary">Login</Link>
                    </p>
                </div>
            )
        }
    }



    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 mt-5 mx-auto">
                    {notification()}
                    <button className="btn btn-info btn-block" onClick={handelSubmit}>Verifikasi</button>
                </div>
            </div>
        </div>
    )

}

export default Verifikasi;