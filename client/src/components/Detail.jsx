import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getDogById, deleteDog} from "../actions";
import "../styles/Detail.css"

export default function Detail(props){
    const dispatch = useDispatch()
    const history = useHistory()
    
    useEffect(() => {
        dispatch(getDogById(props.match.params.id))
    }, [props.match.params.id, dispatch])

    const myDogs = useSelector((state) => state.detail)

    const handleClick = (e) => {
        let text = "Do you want to eliminate this Dog?"
        if (window.confirm(text) == true) {
            dispatch(deleteDog(props.match.params.id));
            alert('Dog eliminated')
            history.push('/home')
          } else {
            return null
          }
    }

    return (
        <div className="contenedor-detail">
            {
                myDogs.length > 0 ?
                <div>
                    
                    <h1>{myDogs[0].name}</h1>
                    <img src={myDogs[0].img} alt="" />
                    <p>Weight: {myDogs[0].weight_min + '-' + myDogs[0].weight_max} Kg</p>
                    <p>Height: {myDogs[0].height_min + '-' + myDogs[0].height_max} cm</p>
                    <p>Life Span: {myDogs[0].life_span}</p>
                    <p>Temperament: {myDogs[0].temperament}</p>
                    <Link to="/home"><button className="boton-detail">Home</button></Link>
                    {myDogs[0].createdInDb && <p>--------- o ---------</p>}
                    {myDogs[0].createdInDb && <button className="boton-detail" onClick={handleClick}>Delete</button>}
                </div> : <p>Loading...</p>
            }
        </div>
    )
}