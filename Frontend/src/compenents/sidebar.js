//import react dan route
import React,{useState,useEffect} from 'react';
import { useHistory} from 'react-router-dom';
import axios from 'axios';

//import react-icons
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as FaIcons from 'react-icons/fa';
import * as CgIcons from 'react-icons/cg';
import * as BsIcons from 'react-icons/bs';



export const SidebarData = [
    //home
    {
        title: 'Home',
        path:  `/home`, 
        icon: <AiIcons.AiFillHome  size={25}/>,
        cName: 'nav-text'
    },


    //pasien
    {
        title: 'Pasien',
        path:  `/pasien`, 
        icon: <FaIcons.FaUserAlt size={20}/>,
        cName: 'nav-text'
    },

    //profile
    {
        title: 'Profile',
        path:  `/U_profile`,
        icon: <BsIcons.BsFillPersonLinesFill size={25} />,
        cName: 'nav-text'
    },

 

   
]


//sidebar admin
export const SidebarAdmin = [
     //penyakit
     {
        title: 'Penyakit',
        path: '/penyakit',
        icon: <FaIcons.FaDisease size={25}/>,
        cName: 'nav-text'
    },

    //kamar
    {
        title: 'Kamar',
        path:  `/kamar`, 
        icon: <IoIcons.IoIosBed size={25} />,
        cName: 'nav-text'
    },

    //biaya
    {
        title: 'biaya',
        path:  `/biaya`, 
        icon: <FaIcons.FaMoneyBill size={25} />,
        cName: 'nav-text'
    },
]

    //pasien
    export const logout = [

    //logout
    {
        title: 'Logout',
        path:  `/`,
        icon: <IoIcons.IoIosLogOut size={29}/>,
        cName: 'nav-text'
    }
    ]