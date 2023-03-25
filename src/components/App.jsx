import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";

export class App extends Component {
  state = {
    searchNameImages:'',
  }
  
  handleSubmit = colectionNameImages => {
    this.setState({searchNameImages: colectionNameImages})
  }

  render() {
    return (
      <div className="App">
        <Searchbar title={'Search'} onSubmit={this.handleSubmit} />

        <ImageGallery nameImages={this.state.searchNameImages} />

        <ToastContainer autoClose={3000} />
        
      </div>
    )
  }
}
