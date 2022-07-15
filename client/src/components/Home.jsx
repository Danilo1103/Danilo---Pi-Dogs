import React from "react";
import { useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllDogs, filterTemperaments, getTemperaments, filterCreated, orderByName, orderByWeight} from "../actions";
import Card from "./Card.jsx";
import Paginado from "./Paginado";
import NavBar from "./NavBar";
import Footer from "./Footer";
import "../styles/Home.css"
import { Link } from "react-router-dom";

export default function Home(){

const dispatch = useDispatch();
const allDogs = useSelector((state)=> state.dogs);
const temperamentos= useSelector((state)=>state.temperaments)
const [orden, setOrden] = useState("")
const [currentPage, setCurrentPage] = useState(1);
const [charactersPerPage, setCharactersPerPage] = useState(8);
const indexOfLastCharacter = currentPage * charactersPerPage; // 8
const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage; // 0
const currentCharacters = allDogs.slice(indexOfFirstCharacter, indexOfLastCharacter)


const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
}


const [dogState, setDogsState] = useState("");

useEffect(()=>{
    dispatch(getAllDogs());
    dispatch(getTemperaments());
},[dispatch])

function handleClick(e){
    e.preventDefault();
    dispatch(getAllDogs());
    setCurrentPage(1);
};


function handleTemperament(e){
    setCurrentPage(1);
    dispatch(filterTemperaments(e.target.value))
}

function handleFilterCreated(e){
    dispatch(filterCreated(e.target.value))
    setCurrentPage(1);
}

function handleSort(e){
    e.preventDefault();
    dispatch(orderByName(e.target.value))
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
}

function handleSort2(e){
    e.preventDefault();
    dispatch(orderByWeight(e.target.value))
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
}

return (
        <div>
            <div>
                <NavBar setCurrentPage={setCurrentPage}/> 
                <Link to= "/dogs"><button className="cta">
                <span>Create dog</span>
                <svg viewBox="0 0 13 10" height="10px" width="15px">
                    <path d="M1,5 L11,5"></path>
                    <polyline points="8 1 12 5 8 9"></polyline>
                </svg>
                </button></Link>
                <div className="filter">
                    <select onChange={handleSort}>
                        <option hidden>Order By Name</option>
                        <option value="asc">A-Z</option>
                        <option value="desc">Z-A</option>
                    </select>
                    <select onChange={handleTemperament}>
                        <option hidden>Filter temperaments</option>
                        <option value="All">All Temperaments</option>
                        {temperamentos.map((temp) => ( 
                                <option value={temp.name} key={temp.id}>{temp.name}</option>
                        ))}
                    </select>
                    <select onChange={handleFilterCreated}>
                        <option hidden>Filter breeds</option>
                        <option value="All">All</option>
                        <option value="created">Created</option>
                        <option value="api">Existing</option>
                    </select>
                    <select onChange={(e) => handleSort2(e)}>
                        <option hidden>Filter weight</option>
                        <option value="min">Minimum weight</option>
                        <option value="max">Maximum weight</option>
                    </select>
                </div>
            </div>
            
            
                 <div className="paginado">        
                <Paginado 
                data ={charactersPerPage}
                current = {currentPage} 
                pageFunction = {paginado}
                /></div>
                <div className="cardsDog">
                {
                currentCharacters?.map(e => {
                        return (
                        
                        <Card key={e.id} id={e.id} name={e.name} weight_min={e.weight_min} weight_max={e.weight_max}  img={e.img} temperament={e.temperament} />
                        );
                    })
                }
                </div>
                <Footer/>
        </div>
    );

};