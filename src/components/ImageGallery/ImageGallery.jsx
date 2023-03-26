
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
    isEndImages: false,
  }

  handleBtnSubmitMore = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1
    })
    )
  }

  componentDidUpdate = (prevProps, prevState) => {
    
    if (prevProps.nameImages !== this.props.nameImages || prevState.page < this.state.page) {
      this.setState({ status: 'pending' });
      
      setTimeout(() => {
        fetch(`${BASE_URL}?q=${this.props.nameImages}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
          .then(response => { if (response.ok) { return response.json() } return Promise.reject(new Error(`Не вдалося знайти даних по вашому запиту ${this.props.nameImages}`)) })
          .then(colectionImages => {
            if (colectionImages.total !== 0 && this.state.page === 1) { console.log(colectionImages)
              this.setState({ colectionImages: colectionImages.hits, total: colectionImages.hits.length, status: 'resolved' })
            } else if (colectionImages.total !== 0 && this.state.page > 1 && prevProps.nameImages === this.props.nameImages) {
              this.setState({ colectionImages: null, page: 1, error: null, isEndImages: false, status: 'resolved', })
              this.setState({ colectionImages: colectionImages.hits, status: 'resolved' })
            } else if (colectionImages.total !== 0 && this.state.page > 1) {
              this.setState({ colectionImages: [...prevState.colectionImages, ...colectionImages.hits], status: 'resolved' })
            } else return Promise.reject(new Error(`Не вдалося знайти даних по вашому запиту ${this.props.nameImages}`))
        }).catch(error => { this.setState({ error: error, status: 'rejected' }) })
      }, 500)
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
          { (this.total>12) && <Button onBtnSubmit={this.handleBtnSubmitMore}/>}
          
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