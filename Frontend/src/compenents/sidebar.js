//import react dan route
import React,{useState,useEffect} from 'react';
import { useHistory} from 'react-router-dom';
import axios from 'axios';

//import react-icons
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as FaIcons from 'react-icons/fa';
import * as CgIcons from 'react-icons/cg';



export const SidebarData = [
    //home
    {
        title: 'Home',
        path:  `/home`, 
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },

     //profile
     {
        title: 'Profile',
        path:  `/u_profile`, 
        icon: <CgIcons.CgProfile />,
        cName: 'nav-text'
    },

    //pasien
    {
        title: 'Pasien',
        path:  `/pasien`, 
        icon: <IoIcons.IoIosPerson/>,
        cName: 'nav-text'
    },

 

   
]



export const SidebarAdmin = [
     //penyakit
     {
        title: 'Penyakit',
        path: '/penyakit',
        icon: <FaIcons.FaDisease/>,
        cName: 'nav-text'
    },

    //kamar
    {
        title: 'Kamar',
        path:  `/kamar`, 
        icon: <IoIcons.IoIosBed />,
        cName: 'nav-text'
    },

    //biaya
    {
        title: 'biaya',
        path:  `/biaya`, 
        icon: <FaIcons.FaMoneyBill />,
        cName: 'nav-text'
    },
]

export const logout = [

    //logout
    {
        title: 'Logout',
        path:  `/`,
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
]