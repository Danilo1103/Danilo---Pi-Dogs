import './App.css';
import {BrowserRouter} from 'react-router-dom';
import { Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import DogCreate from './components/DogCreate'
import Home from './components/Home';
import Detail from './components/Detail';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path='/' component={LandingPage}/>
        <Route exact path='/home' component={Home}/>
        <Route exact path='/dogs' component={DogCreate}/>
        <Route exact path='/dogs/:id' component={Detail}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
