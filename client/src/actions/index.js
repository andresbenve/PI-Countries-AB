import name from '../components/name'
const axios = require('axios')

export const GET_COUNTRIES = 'GET_COUNTRIES'
export const GET_COUNTRIES_NAME = 'GET_COUNTRIES_NAME'
export const DATA_BASE = 'DATA_BASE'
export const RESET_COUNTRIES = 'RESET_COUNTRIES'
export const GET_ID = 'GET_ID'
export const GET_ACTIVITIES = 'GET_ACTIVITIES'
export const GET_ACTIVITIES_DETAIL = 'GET_ACTIVITIES_DETAIL'





export function dataBase(){
    let names = name()
    return ({
        type: DATA_BASE,
        payload: names,
    })

 }

export const getCountriesName = (name, page, order) => {
    return async function (dispatch){
       try{
    var countries = await axios.get('http://localhost:3001/countries?name=' + name)// Ojo con el Home
       return dispatch({ type: GET_COUNTRIES_NAME, payload: countries.data});
 } catch(error){
     console.log(error);
     
 }};
}


export const getCountries = ( page, order, filtro) => {
    return async function (dispatch){
       
    var countries = await axios.get('http://localhost:3001/countries?page=' + page + '&order=' + order + '&filter=' + filtro)// Ojo con el Home
      
    return dispatch({ type: GET_COUNTRIES, payload: countries.data});
 };
}

export function resetSomeCountries() {
      return ({type: RESET_COUNTRIES});
  }  

export function getCountryDetail (id) {
    return async function (dispatch) {
            try{
                var json = await axios('http://localhost:3001/countries/' + id)    
                return dispatch({type:GET_ID, payload: json.data})
        }
         catch(error) {
            console.log(error);
            
        }
    }
}


export function postActivities (payload) {
    return async function (dispatch) {
            try{
                var json = await axios.post('http://localhost:3001/activities', payload)    
                console.log(json.data);
                
                return dispatch({type:GET_ACTIVITIES, payload: json.data})
        }
         catch(error) {
            console.log(error);
            
        }
    }
}


// export function activitiesDetail (payload) {
//     return async function (dispatch) {
//             try{
//                 var json = await axios.post('http://localhost:3001/countries/:idPais')    
//                 return dispatch({type:GET_ACTIVITIES_DETAIL, payload: json.data})
//         }
//          catch(error) {
//             console.log(error);
            
//         }
//     }
// }



