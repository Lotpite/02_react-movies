import './App.css';
import Navigation from './components/header/navigation.js';
import FilmList from './components/film-list/film-list';
import Film from './components/film-item/film-item';
import {Switch, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Navigation/>
      <br />
      <Switch>
        <Route exact path='/'>
          <FilmList/>
        </Route>
        <Route exact path='/film/:id'>
          <Film/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;