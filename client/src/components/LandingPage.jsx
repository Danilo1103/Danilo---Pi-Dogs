import React from "react";
import {Link} from "react-router-dom"
import "../styles/LandingPage.css"

export default function LandingPage(){
    return(
        <div className="contenedor-landing">
            <h1>Welcome to my app</h1>
            <Link to="/home">
            <button className="boton-landing"> Start </button>
            </Link>
            <p>by Danilo Ibañez</p>
        </div>
    )
}