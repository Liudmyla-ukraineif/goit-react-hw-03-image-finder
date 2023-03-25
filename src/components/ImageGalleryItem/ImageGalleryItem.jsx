// import * as basicLightbox from 'basiclightbox';
// @import 'src/styles/main';

import { Component } from "react";
import EditModal from "../Modal/Modal";

export default class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  }

  toggleModal = () => {
    this.setState(({showModal})=> ({showModal: !showModal }))
  }
    
  render() {
    const { gallery } = this.props;
    const { showModal } = this.state;

    return (
    <ul className="ImageGallery">
        {gallery.map(item => (

          <li className="ImageGalleryItem" key={item.id} onClick={this.toggleModal} >
            <img src={item.webformatURL} alt={item.tags} className="ImageGalleryItem-image" />
            {showModal && (
              <EditModal onCloseModal={this.toggleModal}>
                <img src={item.largeImageURL} alt={item.tags} />
              </EditModal>)}
          </li>))
        }
    </ul>  
    );
  }
}