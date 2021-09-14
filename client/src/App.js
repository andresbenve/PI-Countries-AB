import './App.css';
import { Route } from 'react-router';
import landingPage from './components/landingPage';
import Detail from './components/Detail';
import Home from './components/Home';
import Activity from './components/Activity';
import { BrowserRouter } from 'react-router-dom';


function App() {


return (
<BrowserRouter>
      <div className="App">

      <Route
      exact path = '/'
      component={landingPage}/>
      
      <Route
      exact path  = '/home'
      component={Home}/>
      
      <Route
      path = '/home/:idPais'
      render={({match}) => (<Detail ruta={(match.params.idPais)}/>)}/>
      
      <Route
      path = '/activities'
      component={Activity}/>
    </div>
    </BrowserRouter>
  );
}

export default App;
