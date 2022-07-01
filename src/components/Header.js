import React from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import '../styles/Header.css';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    const { name } = await getUser();
    this.setState({
      name,
      loading: false,
    });
  }

  render() {
    const { name, loading } = this.state;
    if (loading) return <Loading />;
    return (
      <header data-testid="header-component">
        <h3 data-testid="header-user-name">{name}</h3>
        <nav>
          <NavLink
            to="/search"
            activeClassName="selected"
            data-testid="link-to-search"
          >
            Pesquisa
          </NavLink>
          <NavLink
            to="/favorites"
            activeClassName="selected"
            data-testid="link-to-favorites"
          >
            Favoritas
          </NavLink>
          <NavLink
            to="/profile"
            activeClassName="selected"
            data-testid="link-to-profile"
          >
            Meu perfil
          </NavLink>
        </nav>
      </header>
    );
  }
}

export default Header;
