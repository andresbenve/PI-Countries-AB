import {
    DATA_BASE,
    GET_COUNTRIES, GET_COUNTRIES_NAME, RESET_COUNTRIES, GET_ID, GET_ACTIVITIES, GET_ACTIVITIES_DETAIL
} from '../actions'

const initialState = {
    countriesDB: [],
    allCountries: [],
    someCountries: [],
    allActivity: [],
    countriesDetail:[],
    activityFilter: []
}

function reducer (state = initialState, { type, payload })  {
    switch (type) {

    case DATA_BASE:
        return { ...state,
        countriesDB: payload,
        }
    case GET_COUNTRIES:
        return { ...state,
        allCountries: payload,
        }
    case GET_COUNTRIES_NAME:
        return { ...state,
        allCountries: payload
        }
    case RESET_COUNTRIES:
        return { ...state,
        allCountries: []
        }
    case GET_ID:
        return { ...state,
        countriesDetail: payload
        }
    case GET_ACTIVITIES:
        return { ...state,
        allActivity: state.allActivity.push(payload)
        }
    case GET_ACTIVITIES_DETAIL:
        console.log(payload, 'reducer');
        return { ...state,
        allActivity: state.countriesDetail.push(payload)
        }
    default:
        return state
    }
}


export default reducer;