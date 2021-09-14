import React from 'react'
import { NavLink } from 'react-router-dom'
import Map from './video/Map.mp4'
import './landingPage.css'




function landingPage() {
    return (
        <div className='container'>
            <div className={'container2'}>
            <NavLink to='/home'>
            <video autoPlay loop muted
              style={{
                position: 'relative',
                width: '70%',
            }}
            >
                <source src={Map} type='video/mp4'/>
            </video>
            </NavLink>
            </div>
            <div>
            <NavLink to='/home'>
            <button className={'button'}>LET'S TRAVEL</button>
            </NavLink>
            </div >
          </div>
    )
}

export default landingPage


// Estilo del video para que se vea bien
// <video autoPlay loop muted 
//             style={{
//                 position: 'absolute',
//                 width: '100%',
//                 left: '50%',
//                 top: '50%',
//                 height: '100%',
//                 objectFit: 'cover',
//                 transform: 'translate(-50%, -50%)'
//                 }}>
//                 <source src={Map} type='video/mp4'/>
//             </video>