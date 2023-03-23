import { Component } from "react";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";



const API_KEY ='33450738-a5a6f333e8e5416cd1742bc4b'

export default class ImageGallery extends Component{ 
  state = {
    colectionImages: null,
    page: 1,
    error: null,
    status: 'idle',
  }

  componentDidUpdate = (prevProps,) => {
    
    if (prevProps.nameImages !== this.props.nameImages) {

      this.setState({ status: 'pending' })
      
      setTimeout(() => {
        fetch(`https://pixabay.com/api/?q=${this.props.nameImages}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
        .then(response => {
          if (response.ok) {
            return response.json()
          } return Promise.reject(
            new Error(`Не вдалося знайти даних по вашому запиту ${this.props.nameImages}`))
        })
        .then(colectionImages => this.setState({ colectionImages: colectionImages.hits, status: 'resolved' }),)
        .catch(error => this.setState({ error, status: 'rejected' }))
      }, 1000);
      
    }
  }

  render() {
    
    const { colectionImages, error, status } = this.state;
      
    if (status === 'idle') {
      return <p>Введіть запит для пошуку</p>
    }

    if (status === 'pending') {
      return <p>Йде завантаження...</p>
    }

    if (status === 'resolved') {
      return (<ImageGalleryItem gallery={colectionImages}/>
        // <ul className="gallery">
        //   {colectionImages && 
        //     colectionImages.map(item => <li key={item.id} ><img src={item.webformatURL} alt=""/>
        //     </li>
        //     )
        //   }
        // </ul>
        )
    }

    if (status === 'rejected') {
      return <h2>{error.message}</h2>
    }
  }
}


          // {this.state.colectionImages.map( collection => <ImageGalleryItem key={id} item={collection} />)}