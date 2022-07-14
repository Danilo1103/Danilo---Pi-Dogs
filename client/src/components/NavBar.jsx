import React from "react";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import "../styles/NavBar.css"

export default function NavBar({setCurrentPage}) {
    return (
    <div>
        <header>
                <div className="header">
                    <div className="logo">
                       <a href="/home"> <img src={require("../img/logoHenry.png").default} alt="" /> </a>
                    </div>
                    <div className="crear">
                    </div>
                    <div className="search">
                    <SearchBar setCurrentPage={setCurrentPage}/>    
                    </div>
                </div>
                </header>
    </div>
    )
}