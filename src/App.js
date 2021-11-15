import logo from './logo.svg';
import './App.css';
import {Button} from 'react-bootstrap';
import Navigation from './components/header/navigation.js';
import FilmList from './components/film-list/film-list';


// const Field = () => {
//   return <input type="text" placeholder="search film..." />
// }

// const Btn = () => {
//   const text = 'Log in';
//   const logged = false;

//   return <Button variant="outline-primary">Primary</Button>
// }

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
