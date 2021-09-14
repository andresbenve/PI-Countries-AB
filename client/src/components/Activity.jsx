import React, { useEffect, useState } from 'react'
import { dataBase } from '../actions'
import {useDispatch, useSelector} from 'react-redux'
import { NavLink } from 'react-router-dom'
import {postActivities} from '../actions'
import './activity.css'

function validate(input, countryId){
    let errors = {};
    if(!countryId.length || countryId === 'Select an option'){
       errors.countryId = "se requiere country"
   //si en el input hay un numero >10 y <0 enviar error
   }
   else if(!input.name){
        errors.name = "se requiere Nombre";
    }else if(!input.difficulty){
        errors.difficulty = "se requiere dificultad"
    }else if(input.difficulty>5 || input.difficulty< 1){
        errors.difficulty = "se requiere dificultad hasta 5"
    }else if(!input.duration){
        errors.duration = "se requiere duration"
    }
    return errors;
}



function Activity() {

    const dispatch = useDispatch()
    const countriesDB = useSelector(state => state.countriesDB)

    const [countryId, setCountryId] = useState([])
    const [errors, setErrors]= useState({})
    const [input, setInput] = useState({
        name: '',
        difficulty: '',
        duration: '',
        season: '',
    })
    useEffect(()=>{
        dispatch(dataBase())
    },[dispatch])

    // useEffect(() => {
    //     validate(input, countryId)
    // }, [input])

    const handleChange = (e) => {
        if(e.target.name === "countryId"){            
            setCountryId(...countryId, e.target.value)
        }else{
    setInput({
        ...input,
        [e.target.name]: e.target.value,
    })
    setErrors(validate({ //luego seteo el estado de errores, pasandole el estado setetado
        ...input,
        [e.target.name] : e.target.valuex 
    }, countryId))
    }
}
async function handleSubmit(e){
    e.preventDefault();
    const obj={
        ...input,
        countryId: countryId
    }
    
    if(Object.keys(errors).length === 0){
    dispatch(postActivities(obj))
    alert("actividad creada")
    setInput({
        name: "",
        difficulty:"",
        duration:"",
        season:"", 
    })} 
    else if(Object.keys(errors).length > 0){ 
        console.log(Object.keys(errors));
        
        alert("Debes completar todos los campos requeridos para agregar la Actividad")
     }
    //setCountryId([])   
}
    return (
        <div className={'activity'}>
            
            <form className={'input'} onSubmit={(e) => handleSubmit(e)}>
            <div className={'p1'}>
            <label >Country Name  →</label>
            <select  className={'form'}  name="countryId" id="" onChange={(e) => handleChange(e)}>
                <option value={-1}>Select an option</option>
                {countriesDB.map((item, i) =>{
                return (
                <option key={'countriesDB'+i} value={item}>{item}</option>)
                })}   
            </select>
            {errors.countryId && (
                        <p>{errors.countryId}</p>
                    )}
            <p></p>
            </div>
            <label>Description      →</label>
            <input 
             className={'form'} 
            type="text"
            value={input.name}
            name='name'
            onChange={(e) => handleChange(e)}
            />
             {errors.name && (
                        <p>{errors.name}</p>
                    )}
            <p></p>
            <div className={'p2'}>
            <label>Difficulty   →</label>
            <input 
             className={'form'} 
            type="number" 
            max='5'
            value={input.difficulty}
            name='difficulty'
            onChange={(e) => handleChange(e)}
            />
             {errors.difficulty && (
                        <p>{errors.difficulty}</p>
                    )}
            <p></p>
            <label>Duration  →</label>
            <input
            className={'form'} 
            type="text"
            value={input.duration}
            name='duration'
            onChange={(e) => handleChange(e)}
            />
             {errors.duration && (
                        <p>{errors.duration}</p>
                    )}
            <p></p>
            </div>
            <div className={'p3'}>
            <label>Season  →</label>
            <select  className={'form'}  name="season" value={input.season} onChange={(e) => handleChange(e)} >
                <option value="">Select</option>
                <option value="winter">winter</option>
                <option value="summer">summer</option>
                <option value="fall">fall</option>
                <option value="spring">spring</option>
            </select>
            {errors.season && (
                        <p>{errors.season}</p>
                    )}
            <p></p>
            </div>
            <div className={'p4'}>
            <input className={'button3'} type="submit" value='Add Activity'/>
            </div>
            </form>
            <div className={'divbutton'}>
            <NavLink to='/home'>
            <button className={'button2'}>Volver</button>
            </NavLink>
            </div>
        </div>
    )
}

export default Activity
