import logo from './logo.svg';
import './App.css';
import Navigation from './components/header/navigation.js';
import FilmList from './components/film-list/film-list';

function App() {
  return (
    <div className="App">
      <Navigation/>
      <br />
      <FilmList/>
    </div>
  );
}

export default App;
