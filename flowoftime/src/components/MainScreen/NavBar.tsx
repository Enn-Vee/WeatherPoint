import React from 'react'
import './NavBar.css'

function NavBar() {
    return (
    <nav className="navbar navbar-expand px-5 mt-3 navbar-dark">
            <h1 className="navbar-brand" >WeatherPoint</h1>
            <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                    <button>Register</button>
                </li>
                <li className="nav-item">
                    <button>Login</button>
                </li>
            </ul>
            
    </nav>
    )
}

export default NavBar
