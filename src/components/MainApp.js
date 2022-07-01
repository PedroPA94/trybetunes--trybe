import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Album from './Album';
import Favorites from './Favorites';
import Header from './Header';
import NotFound from './NotFound';
import Profile from './Profile';
import ProfileEdit from './ProfileEdit';
import Search from './Search';

class MainApp extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="/profile" component={ Profile } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </div>
    );
  }
}

export default MainApp;
