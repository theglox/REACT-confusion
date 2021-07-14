import * as ActionTypes from './ActionTypes';

export const Dishes = (state = { isLoading: true,// e verdadera porqeu los platos estan vacios aqui
    errMess: null,// se etablecera cuando se ejecue la accion DISHES_FAILES
    dishes:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_DISHES:
            return {...state, isLoading: false, errMess: null, dishes: action.payload};

        case ActionTypes.DISHES_LOADING:
            return {...state, isLoading: true, errMess: null, dishes: []}

        case ActionTypes.DISHES_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};