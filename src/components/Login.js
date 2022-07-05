import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

const MIN_NAME_LENGTH = 3;

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loading: false,
    };
  }

  toggleLoading = () => {
    this.setState((prevState) => ({
      loading: !prevState.loading,
    }));
  }

  handleInput = ({ target }) => this.setState({ name: target.value })

  validateUser = async ({ name }) => {
    const { history } = this.props;
    const user = {
      name,
      email: '',
      image: '',
      description: '',
    };
    this.toggleLoading();
    await createUser(user);
    history.push('/search');
  }

  render() {
    const { name, loading } = this.state;
    const validName = name.length >= MIN_NAME_LENGTH;
    if (loading) return <Loading />;
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="name">
            <input
              type="text"
              name="name"
              onChange={ this.handleInput }
              value={ name }
              data-testid="login-name-input"
            />
          </label>
          <button
            type="button"
            disabled={ !validName }
            onClick={ () => this.validateUser({ name }) }
            data-testid="login-submit-button"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
