import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    const user = await getUser();
    this.setState({
      user: { ...user },
      loading: false,
    });
  }

  render() {
    const { user: { name, email, image, description }, loading } = this.state;
    if (loading) return <Loading />;
    return (
      <div data-testid="page-profile">
        <img src={ image } alt={ name } data-testid="profile-image" />
        <h3>{ name }</h3>
        <p>{ email }</p>
        <p>{ description }</p>
        <Link to="/profile/edit">Editar perfil</Link>
      </div>
    );
  }
}

export default Profile;
