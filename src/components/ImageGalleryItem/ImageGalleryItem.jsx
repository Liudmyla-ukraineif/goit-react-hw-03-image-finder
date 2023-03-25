import { Component } from "react";
import PropTypes from 'prop-types';
import EditModal from "../Modal/Modal";

export default class ImageGalleryItem extends Component {
  state = {
    selectedItem: null,
  }

  selectedImageModal = item => {
    this.setState(() => ({ selectedItem: item }));
  };
    
  render() {
    const { gallery } = this.props;
    const { selectedItem } = this.state;

    return (

        <ul className="ImageGallery">
          {gallery.map(item => (
            <li className="ImageGalleryItem" key={item.id}>
              <img src={item.webformatURL} alt={item.tags} className="ImageGalleryItem-image" onClick={()=>this.selectedImageModal(item)} />
              {!!selectedItem && (
              <EditModal onCloseModal={()=>this.selectedImageModal()}>
                <img src={selectedItem.largeImageURL} alt={selectedItem.tags} />
              </EditModal>)}
            </li>))
          }
        </ul>  

    );
  }
}

ImageGalleryItem.propType = {
  gallery: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      webformatURL: PropTypes.node,
      largeImageURL: PropTypes.node,
      tags: PropTypes.string,
    }),
  ),
}