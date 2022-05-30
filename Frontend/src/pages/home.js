import React,{useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory,useParams } from 'react-router-dom';
import Navbar from "../compenents/navbar";
import axios from 'axios';

function Home(){
    const [name,setName] = useState('');
    const history = useHistory();  

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


    const getName = () => {
        const Id = localStorage.getItem('id');
        console.log(Id);
        axios.get(`http://localhost:3000/user/${Id}`)
        .then(res => {
            console.log(res.data);
            setName(res.data.nama_awal);
        })
        .catch(err => {
            console.log(err);
        }
        )

    
    }

    useEffect(() => {
        getName();
        autorization();
    },[]);
    return(
        <div className="home">
            <Navbar />  
        
            <div className="container">
                <div className="header">
                    <h1>Welcome {name}</h1>
                </div>
            </div>
        </div>
        
    );
}

export default Home;