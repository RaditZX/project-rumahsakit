//import react dan route
import React, { useState,useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import {Link} from 'react-router-dom';
import axios from 'axios';
import * as IoIcons from 'react-icons/io';

//import sidebar
import { SidebarData,SidebarAdmin,logout,SidebarPasien }from './sidebar';

//import css
import '../App.css';



function Navbar() {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    const [role,setRole] = useState('');
    const [nama,setNama] = useState('');
    const history = useHistory();
    const Id = localStorage.getItem('id')

    const getRoles = () => {
        axios.get(`http://localhost:3000/user/${Id}`)
        .then(res => {
            setRole(res.data.role);
            setNama(res.data.nama_awal)
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        getRoles();
    },[])

    const Logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('name');
        history.push('/');
    }
    return(
    <div>
            {/* sidebar */}
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items'>
                    <div>
                    
                    </div>
                    {SidebarData.map((item, index) => {
                        return(
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                  {item.icon}<p>ㅤ</p>
                                  {item.title}
                                </Link> 
                            </li>
                        )
                    })}

                     {role === 'pasien' ? 
                            <li className='nav-text'>
                                <Link to={`/pasien/Editdata/${nama}`}>
                                    <IoIcons.IoIosPerson/><p>ㅤ</p>
                                    Edit data
                                </Link>
                            </li>
                        
                    : null} 

                    {role === 'admin'|| role === 'perawat' ? SidebarAdmin.map((item, index) => {
                        return(
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icon}<p>ㅤ</p>
                                    {item.title}
                                </Link>
                            </li>
                        )
                    }) : null} 

                    {logout.map((item, index) => {
                        return(
                            <li key={index} className={item.cName}>
                                <Link onClick={Logout}>
                                    {item.icon}<p>ㅤ</p>
                                    {item.title}
                                </Link>
                            </li>
                        )
                    })}




                </ul>

            </nav>
        </div>

    );
}

export default Navbar;