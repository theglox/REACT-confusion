import * as ActionTypes from './ActionTypes';

export const Comments = (state = { 
  errMess: null,
   comments:[]
  }, action) => {

 //para hacer uso de estas accciones nos vamoa al Maincomponent donde se van a realizar
  switch (action.type) {
      
    case ActionTypes.ADD_COMMENTS:
      return {...state, errMess: null, comments: action.payload};

    case ActionTypes.COMMENTS_FAILED:
      return {...state, errMess: action.payload};
//**LAST UPDTE- cuando publiquemos un comentrio primero enviaremos el comentario al servidor y si el comentario se agrega con exito en el servidor lo agregaremos a la reduStore */
    case ActionTypes.ADD_COMMENT: // aqui recivimos la accion de agregar comentario del form addcomment
        var comment = action.payload; //este paylod es la "carga que recibimos de ls ActioCretor"
       //ahora el comment va a ser creado auntomaticamente por el servidor
        // comment.id = state.comments.length; //agregamos el id al comentario ya uqe ya tenemos comentarios, como estos epiezan desde cero podemos asignarle el tamaño del arreglo de comentario
       // comment.date = new Date().toISOString(); //asignamos la fecha al comentario que realizamos 
       //no podemos modificar el estado que nos enviado  por lo tanto 
       //por lo tanto podemos hacer: state.concat() lo cual nos crea un nuevo objeto
       //return state.concat(coment);
        return { ...state, comments: state.comments.concat(comment)};

    default:
      return state;
  }
};