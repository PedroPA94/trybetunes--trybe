import React from 'react';

const MIN_ARTIST_NAME_LENGTH = 2;

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
    };
  }

  handleInput = ({ target }) => {
    const { value } = target;
    this.setState({
      artistName: value,
    });
  }

  render() {
    const { artistName } = this.state;
    const validArtist = artistName.length >= MIN_ARTIST_NAME_LENGTH;
    return (
      <div data-testid="page-search">
        <input
          type="text"
          placeholder="Nome do artista"
          value={ artistName }
          onChange={ this.handleInput }
          data-testid="search-artist-input"
        />
        <button
          type="button"
          onClick={ () => console.log('Olá!') }
          disabled={ !validArtist }
          data-testid="search-artist-button"
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
