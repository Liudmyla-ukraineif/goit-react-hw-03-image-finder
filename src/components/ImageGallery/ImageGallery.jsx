
import { Component } from "react";
import PropTypes from 'prop-types';
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import Loader from "components/Loader/Loader";
import Button from "components/Button/Button";


const BASE_URL = 'https://pixabay.com/api/'
const API_KEY ='33450738-a5a6f333e8e5416cd1742bc4b'

export default class ImageGallery extends Component {
  state = {
    colectionImages: null,
    page: 1,
    total: null,
    error: null,
    status: 'idle',
    isEndImages: null,
  }

  handleBtnSubmitMore = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1
    })
    )
  }

  componentDidUpdate = (prevProps, prevState) => {
    const isPromptUpdated = prevProps.nameImages !== this.props.nameImages;

    if (isPromptUpdated || prevState.page < this.state.page) {
      this.setState({ status: 'pending' });
      
      // setTimeout(() => {
        fetch(`${BASE_URL}?q=${this.props.nameImages}&page=${isPromptUpdated ? 1 : this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
          .then(response => { if (response.ok) { return response.json() } return Promise.reject(new Error(`Не вдалося знайти даних по вашому запиту ${this.props.nameImages}`)) })
          .then(colectionImages => {
            if (colectionImages.total !== 0 && this.state.page === 1) {
              this.setState({ colectionImages: colectionImages.hits, total: colectionImages.totalHits, isEndImages: false, status: 'resolved' })
            } else if (colectionImages.total !== 0 && this.state.page > 1 && prevProps.nameImages === this.props.nameImages) {
              this.setState({
              colectionImages: [
                ...prevState.colectionImages,
                ...colectionImages.hits,
              ],
              page: isPromptUpdated ? 1 : this.state.page,
              total: colectionImages.totalHits,
              error: null,
              isEndImages: isPromptUpdated ? false : colectionImages.hits.length < 12,
              status: 'resolved',
              });
            } else if (colectionImages.total !== 0 && this.state.page > 1) {
              isPromptUpdated && window.scroll(0, 0);
              this.setState({
              ...prevState,
              page: isPromptUpdated ? 1: this.state.page,
              colectionImages: isPromptUpdated
                ? colectionImages.hits
                  : [...prevState.colectionImages, ...colectionImages.hits],
              isEndImages: isPromptUpdated ? false : this.state.isEndImages,
              status: 'resolved',
            });
            } else return Promise.reject(new Error(`Не вдалося знайти даних по вашому запиту ${this.props.nameImages}`))
        }).catch(error => { this.setState({ error: error, status: 'rejected' }) })
      // }, 500)
    }
  };

  render() {
    
    const { colectionImages, error, status } = this.state;
      
    if (status === 'idle') {
      return <p>Введіть запит для пошуку</p>
    }



    if (status === 'resolved') {
      return (
        <div>
          <ImageGalleryItem gallery={colectionImages} />
          { !this.state.isEndImages && <Button onBtnSubmit={this.handleBtnSubmitMore}/>}
          
        </div>
      )
    }

    if (status === 'pending' && this.state.page === 1) {
      return <Loader />
    } else if (status === 'pending' && this.state.page > 1) {
      return (
        <div>
          <ImageGalleryItem gallery={colectionImages} />
          <Loader />
        </div>
      )
    }

      if (status === 'rejected') {
        return <h2>{error.message}</h2>
      }
    }
}
  

ImageGallery.propType = {
  gallery: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      webformatURL: PropTypes.node,
      largeImageURL: PropTypes.node,
      tags: PropTypes.string,
    }),
  ),
}