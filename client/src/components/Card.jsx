import React from "react";
import "../styles/Card.css";

export default function CardDog({id, name, weight_min, weight_max, temperament, img}){

    return (
            <div className="cardDog">
                <h3>{name}</h3>
                <a href={`http://localhost:3000/dogs/${id}`}>
                <img src={img} alt="img not found" width="200px" height="250px"/>
                </a>
                <h5>Weight: {weight_min} - {weight_max}</h5>
                <h5>Temperament: {temperament}</h5>
            </div>
    );
};