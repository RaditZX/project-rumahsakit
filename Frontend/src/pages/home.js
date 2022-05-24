import React,{useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory,useParams } from 'react-router-dom';
import Navbar from "../compenents/navbar";

function home(){
    return(
        <div className="home">
            <Navbar />  
        
            <div className="container">
                <div className="header">
                    <h1>Home</h1>
                </div>
            </div>
        </div>
        
    );
}

export default home;