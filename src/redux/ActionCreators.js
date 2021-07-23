// importamos todo lo que se ha exportado desde el archivo action types
import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

//esta es una funcion que crea un  Actionobject
//toma los cuatro parametros del formulario addcoment

//esto se envia a la store {coments} y deberia estar cambiando la parte de comentario

export const addComment = ( comment) => ({
    //todos los Action Objects tienen que tener un tipo
    //aquie es donde definimos el tipo de accion
    type: ActionTypes.ADD_COMMENT,
    //contiene un paylod:contiene lo que sea que se necesita para ser transpordo
  //contiene los datos que se neceitan llevar en la accionObject al a funcion reductora
    payload: comment
});
// esto es un tunk
//Addcomment va aser utilizado por postcomment para enviar el comentario a la store
export const postComment = (dishId, rating, author, comment) => (dispatch) => {

  const newComment = {
      dishId: dishId,
      rating: rating,
      author: author,
      comment: comment
  };
  newComment.date = new Date().toISOString();

  return fetch(baseUrl + 'comments', {
      method: "POST",
      body: JSON.stringify(newComment), //adjuntar el comentario que acabamos e crear en el boy del mensaje
      headers: {
        "Content-Type": "application/json" //especificamos el impo de dato que va a recibir
      },
      credentials: "same-origin"
  })
  .then(response => { //recibimos la respuesta del server
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          throw error;
    })
  .then(response => response.json())//el response que viene del server contendra el comentario actualizado que se ha publicado el sitio del server
  .then(response => dispatch(addComment(response)))
  .catch(error =>  { console.log('post comments', error.message); alert('Your comment could not be posted\nError: '+error.message); });
};

//............................  ACCION DE LOS DISHES...............................................................
//esto es un tunk
// se utiliza para ir a buscar los platos donde se suponga que esten
export const fetchDishes = () => (dispatch) => {

  // llama la  funcion para cargar
    dispatch(dishesLoading(true));
 //lamada al servidor
    return fetch(baseUrl + 'dishes')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)))
    .catch(error => dispatch(dishesFailed(error.message)));
}


//me devulve una accion del tipo dishes loaing
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
//.........FIN DE ACCIONES QUE AFECTAN A LOS PLATOS..................................................................................

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
    //handler de errores
    .then(response => {  //este "response" puede ser una respuesta que esta enviando los datos, o una respuesta del server

        if (response.ok) {//si recibe la respuesta bien desde el serer
          return response;
        } else {
            // con (response.status) obtenemos el tipo de error 300,40
            // response.statusText luego lo unimos a un mensaje de error si es que el servidor devolvio un mensaje de error
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error; //cuadno arojas el error podemos implementar el cath
        }
      },
      error => { //eror handler
            var errmess = new Error(error.message); //cuando se encuentra un errro al comunicarse con el servidor error.message contendra informacion acerca de lo que esta relacionado con este error
            throw errmess;
      })
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
};


export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchPromos = () => (dispatch) => {

    dispatch(promosLoading(true));

    return fetch(baseUrl + 'promotions')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)))
    .catch(error => dispatch(promosFailed(error.message)));
}


export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});

// --------------PARA LOS LIDERES------------
export const fetchLeaders= () => (dispatch) => {

  dispatch(leadersLoading(true));

  return fetch(baseUrl + 'leaders')
  //handler de errores
  .then(response => {  //este "response" puede ser una respuesta que esta enviando los datos, o una respuesta del server

      if (response.ok) {//si recibe la respuesta bien desde el serer
        return response;
      } else {
          // con (response.status) obtenemos el tipo de error 300,40
          // response.statusText luego lo unimos a un mensaje de error si es que el servidor devolvio un mensaje de error
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error; //cuadno arojas el error podemos implementar el cath
      }
    },
    error => { //eror handler
          var errmess = new Error(error.message); //cuando se encuentra un errro al comunicarse con el servidor error.message contendra informacion acerca de lo que esta relacionado con este error
          throw errmess;
    })
  .then(response => response.json())
  .then(leaders => dispatch(addleaders(leaders)))
  .catch(error => dispatch(leadersFailed(error.message)));
};
export const addleaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});
export const leadersLoading = () => ({
  type: ActionTypes.LEADERS_LOADING,

});
export const leadersFailed = (errmess) => ({
  type: ActionTypes.LEADERS_FAILED,
  payload: errmess
});


//--------------------FEEdBACK---s
export const postFeedback = (values) => (dispatch) => {

  const newFeedback = {
    firstname: values.firstname,
    lastname: values.lastname,
    telnum: values.telnum,
    email: values.email,
    agree: values.agree,
    contactType: values.contactType,
    message: values.message
};
  newFeedback.date = new Date().toISOString();

  return fetch(baseUrl + 'feedback', {
      method: "POST",
      body: JSON.stringify(newFeedback), //adjuntar el comentario que acabamos e crear en el boy del mensaje
      headers: {
        "Content-Type": "application/json" //especificamos el impo de dato que va a recibir
      },
      credentials: "same-origin"
  })
  .then(response => { //recibimos la respuesta del server
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          throw error;
    })
  .then(response => response.json())//el response que viene del server contendra el comentario actualizado que se ha publicado el sitio del server
  .then(response => alert(JSON.stringify(response)))
  .catch(error =>  { console.log('post Feedback', error.message); alert('Your Feedback could not be posted\nError: '+error.message); });
};

