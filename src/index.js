import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import FilmService from './services/FilmService';

const filmService = new FilmService();

filmService.getGenres().then(result => console.log(result));


ReactDOM.render(
  <App/>,
  document.getElementById('root')
);

