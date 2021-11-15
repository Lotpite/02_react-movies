import logo from './logo.svg';
import './App.css';

const Header = () => {
  return <h2>Filmzzz</h2>
}

const Field = () => {
  return <input type="text" placeholder="search film..." />
}

const Btn = () => {
  const text = 'Log in';
  const logged = false;

  return <button>{logged ? 'Enter' : text}</button>
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
