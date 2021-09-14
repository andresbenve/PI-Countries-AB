import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import CardActivities from './CardActivities'
import {getCountryDetail} from '../actions'
import './detail.css'


function Detail({ruta}) {
const dispatch = useDispatch()

const countriesDetail = useSelector(state => state.countriesDetail)
console.log(countriesDetail);


useEffect(() => {
    dispatch(getCountryDetail(ruta)) 
}, [dispatch, ruta])


return (
    <div>
    <div className={'detail'}>
        <div>
        <span className={'classforimg'}>
        <img className="iconoClima" src={countriesDetail.flag} width="650" height="400" alt=""/>
        </span>
        </div>
        <div>
        <p></p>
        <label>Nombre: </label>
        {countriesDetail.name}
        <p></p>
        <label>Region:  </label>
        {countriesDetail.region}
        <p></p>
        <label>Capital:  </label>
        {countriesDetail.capital}
        <p></p>
        <label>Population:  </label>
        {countriesDetail.population}
        <p></p>
        <label>Subregion:  </label>
        {countriesDetail.subregion}
        <label></label>
        <p></p>
        <label>Actividades: </label>
        <p>{ countriesDetail.activities !== undefined ? 
         countriesDetail.activities.map((act) => {
            return (
                <fragment>
                    <CardActivities key={act.id} name={act.name} />
                </fragment>)
            })   : 'No hay actividades'}</p>
        <p></p>
        </div>
        <div className={'divbutton'}>
<NavLink to='/home'>
        <button className={'button8'}>Volver</button>
</NavLink>
        </div>
        </div>
        




   

        </div>
        
    )
}

export default Detail
