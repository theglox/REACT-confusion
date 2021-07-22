import React, {Component} from 'react';
import './App.css'; 
import Main from './components/MainComponent';
import {BrowserRouter} from 'react-router-dom';
import { Provider} from'react-redux'; //me permite que redux store este disponible para todos los comonentes de mi aplicacion
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore(); //lamamos a la store
class App extends Component {

  render() {
    return (
      //toma  un  que es el atributo de la tienda y la suministro
      //ahora tengo que hacer el uso de Conect store en mi >Mainpara conectar mi aplicacion react a redux store
       <Provider store={store}> 
        <BrowserRouter>
          <div className="App">
            <Main />
          </div>
        </BrowserRouter>
      </Provider>

    );
  }
}

export default App;
