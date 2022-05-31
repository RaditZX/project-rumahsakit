//import react dan route
import React from 'react';
import { useHistory} from 'react-router-dom';

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

    //pasien
    {
        title: 'Pasien',
        path:  `/pasien`, 
        icon: <IoIcons.IoIosPerson/>,
        cName: 'nav-text'
    },

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

    //data user
    {
        title: 'Data',
        path: '/data',
        icon: <FaIcons.FaBook />,
        cName: 'nav-text'
    },
    
    //pasien
    {
        title: 'Profile',
        path:  `/profile`, 
        icon: <CgIcons.CgProfile />,
        cName: 'nav-text'
    }

    
]