import React from 'react';
import PropTypes from 'prop-types';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

class ProfileEdit extends React.Component {
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

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState((prevState) => ({
      user: { ...prevState.user, [name]: value },
    }));
  }

  handleSubmit = async () => {
    this.setState({ loading: true });
    const { user } = this.state;
    const { history } = this.props;
    await updateUser(user);
    history.push('/profile');
  }

  render() {
    const { user: { name, email, image, description }, loading } = this.state;
    const allowSubmit = Boolean(name && email && image && description);
    if (loading) return <Loading />;
    return (
      <div data-testid="page-profile-edit">
        <form>
          <input
            type="text"
            name="name"
            value={ name }
            onChange={ this.handleInput }
            data-testid="edit-input-name"
          />
          <input
            type="email"
            name="email"
            value={ email }
            onChange={ this.handleInput }
            data-testid="edit-input-email"
          />
          <textarea
            name="description"
            value={ description }
            onChange={ this.handleInput }
            data-testid="edit-input-description"
          />
          <input
            type="text"
            name="image"
            value={ image }
            onChange={ this.handleInput }
            data-testid="edit-input-image"
          />
          <button
            type="button"
            disabled={ !allowSubmit }
            data-testid="edit-button-save"
            onClick={ this.handleSubmit }
          >
            Enviar
          </button>
        </form>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
