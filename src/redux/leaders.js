import * as ActionTypes from './ActionTypes';
 
//aqui se establece nuestro estado


//funcion reductora
//recibe el estado actual  y ejecuta una accion=> para generar el siguiente estado
// lo que hacemos es especificar los valores de nuestro estado
export const Leaders = (state = { 
    isLoading: true,// inicialmente verdadera porqeu los platos estan vacios aqui
    errMess: null,// se etablecera cuando se ejecue la accion DISHES_FAILES
    leaders:[] //si los platos se cargan correctamente la informacion se cargara aqui con ADD_DISHES
    }, action) => {
    switch (action.type) { //CAMBIAR ENTRE TIPOS  DE ACCIONES

        case ActionTypes.ADD_LEADERS:
            // ...state => sea lo que se a el estado voy a tomael el mismo estado 
            return {...state, isLoading: false, errMess: null, leaders: action.payload};

        case ActionTypes.LEADERS_LOADING:
            return {...state, isLoading: true, errMess: null, leaders: []};

        case ActionTypes.LEADERS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, leaders:[]};

        default:
            return state;
    }
};