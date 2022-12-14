import axios from "axios"

export function postDog(payload){
    return async function(dispatch){
        let result = await axios.post('/dogs',payload);
        return result;
    };
};

export function getAllDogs(){
    return async function(dispatch){
        let json = await axios.get('/dogs');
        return dispatch({
            type: "GET_ALL_DOGS",
            payload: json.data
        });
    };
};

export function getDogByName(name) {
    return async function(dispatch){
        try{ 
            let json = await axios.get(`/dogs?name=${name}`);
            return dispatch({
                type: 'GET_DOG_NAME',
                payload: json.data
            });
        }catch(error) {
            alert(error.response.data.msg)
        }
    };
};

export function getDogById(id) {
    return async function(dispatch){
        try{
            let json = await axios.get(`/dogs/${id}`);
            return dispatch({
                type: 'GET_DOG_BY_ID',
                payload: json.data
            });
        } catch(error) {
            console.log(error);
        }
    };
};

export function getTemperaments() {
    return async function(dispatch){
        let json = await axios.get('/temperaments');
        return dispatch({
            type: 'GET_TEMPERAMENTS',
            payload: json.data
        });
    };
};

export function filterTemperaments (payload){
    return{
        type: "FILTER_BY_STATUS",
        payload
    }
}

export function filterCreated(payload){
    return{
        type: "FILTER_CREATED",
        payload
    }
}

export function orderByName(payload){
    return{
        type: "ORDER_BY_NAME",
        payload
    }
}

export function orderByWeight(payload){
    return {
        type: "ORDER_WEIGHT",
        payload
    }
}

export function deleteDog(id){
    return async function(dispatch){
        try{
            let json = await axios.delete(`/dogsDelete/${id}`)
            return dispatch({
                type: "DELETE_DOG",
                payload: json
            })
        } catch(error){
            window.alert(error.response.data)
        }
    }
}