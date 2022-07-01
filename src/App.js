import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import MainApp from './components/MainApp';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="*" component={ MainApp } />
        </Switch>
      </div>
    );
  }
}

export default App;
