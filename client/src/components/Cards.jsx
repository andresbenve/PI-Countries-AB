import React from 'react'
import './cards.css'



function Cards(props) {

    return (
        
         <div className={'cards4'}>

         <div className={'type'}>
         {props.name}   
         </div>
         <img className="iconoClima" src={props.image} width="210" height="130" alt=""/>
         <p>
             {props.region}
         </p>
         </div>
        
        
    )
}

export default Cards

