import React from "react";
import '../style/navbar.css'
import logo from '../images/logo.png'

const Navbar = ({ className }) => {
    return (
        <nav className={className}>
            <img className="logo" src={logo}></img>
    
            {NavItem("modèles", "/models")}
            {NavItem("ingrédients", "/components")}
            {NavItem("procédés", "/recipe")}
        </nav>
    );
}

const NavItem = (name, link) => {
    return (
        <a className="item" href={link}>
            <p>{name}</p>
        </a>
    )
}

export default Navbar;