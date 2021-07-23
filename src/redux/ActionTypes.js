//exportamos muchas cadela de las cuales cada una es una  STring constant que especifica la accion correspondiete
//puede importar estos tipos de accion en las funciones reducidas/redux) y luego usarlo 
//para hacer que coincida con la instruccion switch que se usara en el redux
export const ADD_COMMENT = 'ADD_COMMENT'; // el comentario que se envie a un plato se añadira a la lista de comentarios de nuestra app 

//acciones asincronas al conectar con el servidor
export const DISHES_LOADING = 'DISHES_LOADING';
export const DISHES_FAILED = 'DISHES_FAILED';//no puede obtener informacion del servidor
export const ADD_DISHES = 'ADD_DISHES'; //cargar los platos a la tienda

export const ADD_COMMENTS = 'ADD_COMMENTS';
export const COMMENTS_FAILED = 'COMMENTS_FAILED';

export const PROMOS_LOADING = 'PROMOS_LOADING';
export const ADD_PROMOS = 'ADD_PROMOS';
export const PROMOS_FAILED = 'PROMOS_FAILED';

export const ADD_LEADERS = 'ADD_LEADERS';
export const LEADERS_LOADING= 'LEADERS_LOADING';
export const LEADERS_FAILED = 'LEADERS_FAILED';


