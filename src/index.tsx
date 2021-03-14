import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Raport from './components/Raport';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.css';


ReactDOM.render(
  <BrowserRouter >
    <Switch>
      <Route path="/raport/:country/:period" component={Raport} />
      <Route exact path="/" component={Home} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
