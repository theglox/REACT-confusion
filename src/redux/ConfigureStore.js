import {createStore, combineReducers, applyMiddleware} from 'redux';
import { Dishes } from './dishes';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Leaders } from './leaders';
import thunk from 'redux-thunk'; // para hacer unso de de thunk
import logger from 'redux-logger';
import { createForms } from 'react-redux-form';// nos perimte gregr el estado de nuestro formulario al store
import { InitialFeedback } from './forms';

//en appp,js tenemos que importar un proveedor
// configure store configura mi redux store
export const ConfigureStore = () => { //configurar la store
    const store = createStore( //creamos la store (createStore lo  importamos de redux)
        combineReducers({ //combinar los diferentes todas nuestras redux files
             dishes: Dishes, //{create store toma un reductor en este caso dishes}
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders,
            ...createForms({ // es un recuder creado por CreateForm
                feedback:InitialFeedback})
        }),applyMiddleware(thunk, logger)// toma unenhancer o potenciador como segundo parametro
                                           //suministramos thunk y logger como potenciadore 
    );

    return store;
}