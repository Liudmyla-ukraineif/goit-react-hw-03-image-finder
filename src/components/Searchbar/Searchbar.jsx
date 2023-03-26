import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { ImSearch } from 'react-icons/im';


export default class Searchbar extends Component{
  state = {
    colectionNameImages: '',
  }
  

  handleChangeImages = event => {
    this.setState({ colectionNameImages: event.currentTarget.value })
  };
  
  handleSubmit = event => {
    event.preventDefault();
    if (this.state.colectionNameImages.trim() === "") {
      return toast.warn("Введіть запит пошуку")
    }

    this.props.onSubmit(this.state.colectionNameImages);
    this.setState({ colectionNameImages: '' });
  }

  render() {
    return (
      <header className="Searchbar" >
        <form className="SearchForm" onSubmit={this.handleSubmit} >
          <button type="submit" className="SearchForm-button">
            <ImSearch  />
            <span className="SearchForm-button-label">{this.props.title}</span>
          </button>

          <input
            className="SearchForm-input"
            name="colectionImages"
            type="text"
            // autocomplete="off"
            // autofocus
            placeholder="Search images and photos"
            value={this.state.colectionNameImages}
            onChange={this.handleChangeImages}
          />
        </form>
      </header>
    )
  }
}

Searchbar.propType = {
  title: PropTypes.string,
}