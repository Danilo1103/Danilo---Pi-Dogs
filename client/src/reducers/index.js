const initialState = {
    dogs: [],
    temperaments: [],
    allDogs: [],
    detail: []
};

export default function rootReducer(state = initialState, action){
    switch(action.type){
        case "GET_ALL_DOGS": 
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }
        case "GET_DOG_BY_ID": 
            return {
                ...state,
                detail: action.payload
            }
        case "GET_TEMPERAMENTS": 
            return {
                ...state,
                temperaments: action.payload
            }
        case "FILTER_BY_STATUS":
            const allDogs = state.allDogs;
            const temperamentos =  action.payload === "All" ? allDogs : allDogs.filter((el => el.temperament && el.temperament.split(", ").find((e)=> e === action.payload)))
            const temperamentos2 =  action.payload === "All" ? allDogs : allDogs.filter((el => el.temperament && el.temperament.split(",").find((e)=> e === action.payload)))
            return {
                ...state,
                dogs: temperamentos.concat(temperamentos2)
            }
        case "FILTER_CREATED":
            
            const createdFilter = action.payload === "created" ? state.allDogs.filter(d => d.createdInDb) : state.allDogs.filter(d => !d.createdInDb)
            return{
                ...state,
                dogs: action.payload === "All" ? state.allDogs : createdFilter
            }
        case "ORDER_BY_NAME":
            let sortedArr = action.payload === "asc" ? 
                state.dogs.sort(function (a, b) {
                    if(a.name > b.name){
                        return 1;
                    }
                    if(b.name > a.name){
                        return -1;
                    }
                    return 0;
                }) : 
                state.dogs.sort(function(a, b){
                    if(a.name > b.name){
                        return -1
                    }
                    if(b.name > a.name){
                        return 1
                    }
                    return 0;
                })
            return {
                ...state,
                dogs: sortedArr
            }
        case "ORDER_WEIGHT":
            const ord = action.payload === "min" ?
            [...state.dogs].sort(function (a, b) {
                if(a.weight_min > b.weight_min){
                    return 1
                } 
                if(b.weight_min > a.weight_min){
                    return -1
                }
                return 0
            }) : 
            [...state.dogs].sort(function (a, b) {
                if(a.weight_min > b.weight_min){
                    return -1
                } 
                if(b.weight_min > a.weight_min){
                    return 1
                }
                return 0
            }) 
            return {
                ...state,
                dogs: ord
            }
        case 'GET_DOG_NAME':
            return {
                ...state,
                dogs: action.payload
            }
        case "DELETE_DOG": 
            return{
                ...state
            }
        case "POST_DOG":
            return {
                ...state
            }
        default:
            return state;

    };
};