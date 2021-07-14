import * as ActionTypes from './ActionTypes';
import { DISHES } from '../shared/dishes';

export const addComment = (dishId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
});
//esto es un tunk
export const fetchDishes = () => (dispatch) => {
    //hace dos despchos
    dispatch(dishesLoading(true));
//el segundo hace el dispatch para agregar platos, esto empuja los datos al estado de nuestra tienda
    setTimeout(() => {
        dispatch(addDishes(DISHES));
    }, 2000);
}
//otro tunk
export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});
//l errormess es un string
export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});