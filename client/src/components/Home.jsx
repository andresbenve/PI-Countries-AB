import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Cards from './Cards'
import SearchBar from './SearchBar'
import { dataBase, getCountries} from '../actions/index'
import './home.css'
import './cards.css'


function Home() {
const dispatch = useDispatch()
// estado local para el paginado
const [pages, setPages] = useState(0)
// Estado de Local para ordenamiento
const [order, setOrder] = useState('ASC')
// Estado de Local para los filtros
const [filtro, setFiltro] = useState('')
// Me guardo el valor del filtro de la actividad
const [activity, setActivity] = useState([])


// Para disparar la acción y llenar el estado
useEffect(() => {
    dispatch(dataBase())
    dispatch(getCountries(pages, order, filtro))
}, [dispatch, pages, order, filtro])

// Me traigo la parte que me interesa
const allCountries = useSelector(state => state.allCountries)

    // PAGINADO
    const prev = (e) => {
        e.preventDefault();
        if(pages < 0){
            setPages(0)
        } else{
            setPages(pages - 10)
        }
    };
    
    const next = (e) => {
        e.preventDefault();
        if(allCountries.lenght < 6){
            return;
        } else{
            setPages(pages + 10)
        }
    };
    //ORDENAMIENTO
    const changeOrder = (e) => {
        e.preventDefault();
        setOrder(e.target.value)
    }
    //FILTRADO
    const changeFiltro = (e) => {
        e.preventDefault();
        setFiltro(e.target.value)
    }
    
    const changeAct = (e) => {
        e.preventDefault();
        setActivity(e.target.value)
    }
    console.log(activity);
    

    return (
        <div className="principal">
    <div className={'nav6'}>
    {/* <button onClick={(e) => {
        handleClick(e);
    }}
    >Volver a cargar los países</button>
*/}
    <span className={'button2 nav'}>
    <select className={'buttonextra'} name='activity' onChange={(e) => changeAct(e)}>
    <option value="">Activity</option>   
    { allCountries !== undefined ?
    allCountries.map((c) => {
        return ( c.activities !== undefined ?
            c.activities.map((f) => {
              return (  <option  value={f.name}>{f.name}</option>)
            }) : 'borrate'
        ) 
    }) : 'No Activities'
    

    /* <option value={-1}>Select an option</option>
                {allActivities.map((item, i) =>{
                return (
                <option key={'countriesDB'+i} value={item}>{item}</option>)
                })}     */}
    </select> 

     ←    Filtrar      →

    <select className={'buttonextra'} onChange={(e) => changeFiltro(e)}>
        <option value="">Continente</option>
        <option value="Americas">Americas</option>
        <option value="Africa">Africa</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europa</option>
        <option value="Oceania">Oceania</option>
        <option value="Antártida">Antártida</option>
    </select>
    
    <span className={'nav4'}>
    Ordenar    →
    <select className={'buttonextra'} onChange={(e) => changeOrder(e)}>
        <option value="ASC">A-Z</option>
        <option value="DESC">Z-A</option>
    </select>
    </span>
    </span>
    
    <span className={'nav2'}>
    <NavLink to='activities'>
        <button className={'button2'}>
        Add New Activity
        </button>
        </NavLink>           
        
    </span>
    
    <SearchBar/>
    </div>
    <div className={'countries-body'}>
    {
        activity.length === 0 ?
    allCountries?.map((c) =>{   
        return (
            <NavLink to={'/home/' + c.id}>
            <Cards key={c.id} name={c.name} image={c.flag} region={c.region}/>
            </NavLink>)}) :   
          
        allCountries !== undefined ?
        allCountries.map((c) => {
        return ( c.activities !== undefined ?
        c.activities.map((f) => {
        if(f.name === activity){
        return (<Cards name={c.name} image={c.flag} region={c.region}/>)
             }
            }) : 'borrate'
        ) 
    }) : 'No Activities'
    
        }
            
            
            
    </div>
    
    
    <div className={'nav5'}>
    <button className={'button2'} onClick={(e) => {prev(e)}}
        
    disable={pages <= 0} > {'<-- Prev'}

    </button>
    <button className={'button2'}  onClick={(e) => {next(e)}}
        
    disable={allCountries.length < 6} > {'Next -->'}

    </button>
    </div>
    </div>
    )
}



export default Home
