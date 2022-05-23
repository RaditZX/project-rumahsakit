import React,{useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory,useParams } from 'react-router-dom';
import Navbar from "../compenents/navbar";

function home(){
    return(
        <div className="home">
            <Navbar />
            
        </div>
    );
}

export default home;