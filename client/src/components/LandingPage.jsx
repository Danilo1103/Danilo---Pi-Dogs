import React from "react";
import {Link} from "react-router-dom"
import style from "../styles/LandingPage.module.css"

export default function LandingPage(){
    return(
        <div className={style.contenedor-landing}>
            <h1>Welcome to my app</h1>
            <Link to="/home">
            <button className={style.boton-landing}> Start </button>
            </Link>
            <p>by Danilo Ibañez</p>
        </div>
    )
}