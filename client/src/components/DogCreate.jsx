import React, {useState, useEffect} from "react"
import { Link, useHistory } from "react-router-dom"
import { postDog, getTemperaments } from "../actions"
import { useDispatch, useSelector } from "react-redux"
import "../styles/DogCreate.css"

function validate(input){
    let errors = {};
    const regexName = /^([a-zA-Z ]+)$/i;
    
    if (!input.name) {
        errors.name = "The field name can't be empty ";
      } else if (!input.weight_min || !input.weight_max) {
      errors.weight_min = "The field 'Weight' must be completely filled in";
      } else if (!input.height_min || !input.height_max) {
        errors.height_min = "The field 'Height' must be completely filled in";
      } else if (!input.temperament || input.temperament.length < 2) {
        errors.temperament = "Please, select at least two";
      }
    
      if (input.name && !regexName.test(input.name)) {
        errors.name = "The name can't include special characters or numbers";
      }
      if (parseInt(input.weight_min) > parseInt(input.weight_max)) {
        errors.weight_min = "❌ The minimum weight must be less than the maximum weight";
      }
      if (parseInt(input.height_min) > parseInt(input.height_max)) {
        errors.height_min = "❌ The minimum height must be less than the maximum height";
      }
      return errors;
}

export default function DogCreate(){
    const dispatch = useDispatch()
    const history = useHistory()
    const temperaments = useSelector((state) => state.temperaments)
    const [errors, setErrors] = useState({});


    const [input, setInput] = useState({
        name: "",
        img: "",
        weight_min: "",
        weight_max: "",
        height_min: "",
        height_max: "",
        life_span: "",
        temperament: []
    })

    useEffect(() => {
        dispatch(getTemperaments())
    }, [])

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
    }

    function handleSelect(e){
        const temperamento = input.temperament.includes(e.target.value) ? 
        alert("equal temperaments cannot be added"):  
        setInput({
            ...input,
            temperament: [...input.temperament,e.target.value],
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(postDog(input))
        alert("Dog created!!")
        setInput({
            name: "",
            img: "",
            weight_min: "",
            weight_max: "",
            height_min: "",
            height_max: "",
            life_span: "",
            temperament: []
        })
        history.push("/home")
    }

    function handleDelete(el){
        setInput({
            ...input,
            temperament: input.temperament.filter(temp => temp !== el)
        })
    }

    return (
        <div>
            <Link to= "/home"><button className="boton-detail">Home</button></Link>
            <h1>Crea tu perro</h1>
            <form className="formulario" onSubmit={(e) => handleSubmit(e)}>
            <div className="contenedor">
                    <label>Name:</label>
                <div className="input-contenedor">
                    <input type="text" value={input.name} name="name" onChange={(e) => handleChange(e)}  required/>
                    {errors.name && (<p>{errors.name}</p>)}
                </div>
                    <label>Image:</label>
                <div className="input-contenedor">
                    <input type="text" value={input.img} name="img" onChange={(e) => handleChange(e)} placeholder="Enter an image URL..."/>
                </div>
                    <label>Weigth Min:</label>
                <div className="input-contenedor">
                    <input type="number" value={input.weight_min} name="weight_min" onChange={(e) => handleChange(e)}  required/>
                    {errors.weight_min && (<p>{errors.weight_min}</p>)}
                </div>
                    <label>Weigth Max:</label>
                <div className="input-contenedor">
                    <input type="number" value={input.weight_max} name="weight_max" onChange={(e) => handleChange(e)}/>
                    {errors.weight_max && (<p>{errors.weight_max}</p>)}
                </div>
                    <label>Heigth Min:</label>
                <div className="input-contenedor">
                    <input type="number" value={input.height_min} name="height_min" onChange={(e) => handleChange(e)}  required/>
                    {errors.height_min && (<p>{errors.height_min}</p>)}
                </div>
                    <label>Heigth Max:</label>
                <div className="input-contenedor">
                    <input type="number" value={input.height_max} name="height_max" onChange={(e) => handleChange(e)}/>
                    {errors.height_max && (<p>{errors.height_max}</p>)}
                </div>
                    <label>Life Span</label>
                <div className="input-contenedor">
                    <input type="text" value={input.life_span} name="life_span" onChange={(e) => handleChange(e)}/>
                </div>
            </div>

                <p>Temperaments</p>
                <select className="input-contenedor" onChange={(e) => handleSelect(e)}>
                    {temperaments.map((temp) => (
                        <option value={temp.name} key={temp.id}>{temp.name}</option>
                    ))}
                </select>
                {input.temperament.map(el => 
                    <div className="delete">
                        <p>{el} <label onClick={() => handleDelete(el)}>❌</label></p>
                        
                    </div>
                )}
                {
                input.name && input.weight_min && input.height_min && parseInt(input.weight_min) < parseInt(input.weight_max) && parseInt(input.height_min) < parseInt(input.height_max) &&
                <button type="submit" className="button">Create dog</button>
                }
            
            </form>
        </div>
    )
}
