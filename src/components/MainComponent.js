import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import DishDetail from './DishdetailComponent'
import {Switch,Route,Redirect,withRouter} from 'react-router-dom'; // s
import { connect } from 'react-redux'; //importante para conectar mis omponentes principales
import { postComment, postFeedback,fetchDishes, fetchComments, fetchPromos , fetchLeaders} from '../redux/ActionCreators';//agregamos las acciones de redux
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


//mi componente principal ahora obtendra el estado de mi redux store
//si hacemos uso de router tenemos uqe importear withRouter para hacer uso de  Redux
// anteriormente este mantenia el estado de mi aplicacion
//ahora este componente principal necesita ir y obtener ese estado de Redux Store
//para conenctar el componente a la tienda redux bajamos al export

//obtiene el estado como parametro aqui
//mapea el estado de la tienda Redux ( dishes,commentes ets) en props que estaran disponible  en mi componente
const mapStateToProps = state => {
  return {
    dishes: state.dishes,    // estos props se derivan de mis reductores
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
    

  }
}


// esto recibira el envio(dispatch) como uno de los parametros aqui Lo que recibe de nuestras store (comments,dshes..)

const mapDispatchToProps = dispatch => ({
  //definimos una propidad que recibe los parametros que enviara una accion (dispatch)
  //
  postFeedback:(values) =>dispatch( postFeedback(values)),
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))}, //el formulario que tenemos se llama feedback , actions añade las acciones necesarias para reestablecer mi formulario
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders:() => dispatch(fetchLeaders())
});

class Main extends Component {

  constructor(props) {
    super(props);
  }
  //life clicle method todo lo que este aqui se ejecutara justo despues de que este componente se monte en la vista de mi aplicacio
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }
  render() {
    
    const HomePage = () => {
      
      return(
        
        <Home 
        //dishes-----
        dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
        dishesLoading={this.props.dishes.isLoading}
        dishErrMess={this.props.dishes.errMess}
        //promotions ----
        promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
        promoLoading={this.props.promotions.isLoading}
        promoErrMess={this.props.promotions.errMess}
        //leaders----
        leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
        leaderLoading={this.props.leaders.isLoading}
        leaderErrMess={this.props.leaders.errMess}
      
    />
      );
    }

    const DishWithId = ({match}) => {
      return(
        <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
          commentsErrMess={this.props.comments.errMess}
         postComment={this.props.postComment}
      />
      );
    };
    
    return (
      <div>
        <Header/>
        <TransitionGroup>
        <CSSTransition key = {this.props.location.key} classNames="page" timeout={300}>

        <Switch>
              <Route path='/home' component={HomePage} />
              <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
              <Route path="/menu/:dishId" component={DishWithId}/>
              <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} />
              <Route exact path='/aboutus' component ={() => <About leaders ={this.props.leaders} />}/>
              
              <Redirect to="/home" />
          </Switch>
            </CSSTransition>
          </TransitionGroup>
        <Footer/>
      </div>
     
    );
  
  }
}
//como nonectar mi componente al enrutador react (react-Router)

// envolvmeos este main que definimos dentro de un conect
//conect toma map SateToprops omo un parametro
//omo usamos react router necesitamos meterlo dentro de whith roter
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));