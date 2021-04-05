import './App.css';
import {Inicio} from './Inicio';
import {Areas} from './Areas';
import {Empleados} from './Empleados';
import {Navegacion} from './Navegacion';
import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter, Route, Switch} from 'react-router-dom';



function App() {
  return (    
    <BrowserRouter>
    <div className="container">
      <h3 className="m-3 d-flex justify-content-center">
        Proyecto Personal ComunidadIT
      </h3>

    <Navegacion/>

    <Switch>
      <Route path='/' component={Inicio} exact/>
      <Route path='/areas' component={Areas}/>
      <Route path='/empleados' component={Empleados}/>
    </Switch>

    </div>

    </BrowserRouter>
  );
}

export default App;
