import React from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { getDogByName } from "../actions"
import "../styles/searchBar.css"

export default function SearchBar ({setCurrentPage}){
    const dispatch = useDispatch()
    const [name, setName] = useState("")

function handleInputChange(e){
    e.preventDefault()
    setName(e.target.value)
    console.log(name)
}

function handleSubmit(e){
    e.preventDefault()
    if(name.length !== 0){
    dispatch(getDogByName(name))
    setCurrentPage(1);
    setName({
        buscar:""
    })
    }else{
        alert("Please input a name to start the search")
    }
}

    return (
        <div>
            <div className="input-wrapper">
            <input className="input" name="buscar" value={name.buscar} onChange={(e) => handleInputChange(e)} placeholder="Search..." type="text" />
            <button type="submit" onClick={(e) => handleSubmit(e)}>Search</button>
            </div>
        </div>
    )
}


  
 


