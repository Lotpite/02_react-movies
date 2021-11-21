// import logo from './logo.svg';
import './App.css';
import Navigation from './components/header/navigation.js';
import FilmList from './components/film-list/film-list';
import Film from './components/film-item/film-item'

function App() {
  console.log(process.env)
  return (
    <div className="App">
      <Navigation/>
      <br />
      <FilmList/>
      {/* <Film/> */}
    </div>
  );
}

export default App;
