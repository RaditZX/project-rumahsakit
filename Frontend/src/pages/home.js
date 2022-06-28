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
        axios.get(`http://localhost:3000/user/${Id}`)
        .then(res => {
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

    const showDate = () => {
        var today = new Date();
        var getMonth = today.getMonth() + 1;
        var date = today.getDate() + "/" + getMonth + "/" + today.getFullYear() + "," + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        return date;
    }

    return(
        <div className="home">
            <Navbar />  
        
            <div className="container-fluid">
                <div className="header">
                    <h1>Welcome {name}</h1>
                    <h3 id="date">{showDate()}</h3>

                </div>
            </div>
        </div>
        
    );
}

export default Home;