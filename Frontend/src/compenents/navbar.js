//import react dan route
import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import {Link} from 'react-router-dom';

//import sidebar
import { SidebarData }from './sidebar';

//import css
import '../App.css';

//import logo
import Logo from "../image/icon.png";


import {Container} from 'react-bootstrap';
import {Nav} from 'react-bootstrap';

function Navbar() {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    const Navigate = useHistory()
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
                </ul>
            </nav>
        </>
    );
}

export default Navbar;