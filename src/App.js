import logo from './logo.svg';
import './App.css';
import {Button} from 'react-bootstrap';
import Header from './components/header/navigation.js';


const Field = () => {
  return <input type="text" placeholder="search film..." />
}

const Btn = () => {
  const text = 'Log in';
  const logged = false;

  return <Button variant="outline-primary">Primary</Button>
}

function App() {
  return (
    <div className="App">
      <Header/>
      <Field/>
      <Btn/>
    </div>
  );
}

export default App;
