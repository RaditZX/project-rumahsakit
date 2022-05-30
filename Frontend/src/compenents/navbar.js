//import react dan route
import React, { useState,useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import {Link} from 'react-router-dom';
import axios from 'axios';

//import sidebar
import { SidebarData,SidebarAdmin,logout }from './sidebar';

//import css
import '../App.css';

//import logo
import * as CgIcons from 'react-icons/cg';

function Navbar() {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    const [role,setRole] = useState('');
    const history = useHistory();
    const Id = localStorage.getItem('id')

    const getRoles = () => {
        axios.get(`http://localhost:3000/user/${Id}`)
        .then(res => {
            setRole(res.data.role);
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
        history.push('/');
    }
    return(
        <>
            <div className="navbar">
            
            </div>
            
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
                    {role === 'admin' ? SidebarAdmin.map((item, index) => {
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
        </>
    );
}

export default Navbar;