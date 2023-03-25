import React, { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default class EditModal extends Component{
  componentDidMount = () => {
    window.addEventListener('keydown', this.handleKeyDoun)
  }

  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.handleKeyDoun)
  }
  
  handleKeyDoun = event => {
    if (event.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  handleClickOverlay = (event) => {
    if (event.currentTarget === event.target) {
      this.props.onCloseModal();
    }
  }


  render() {
    return createPortal(
    <div className="Overlay" onClick={this.handleClickOverlay}>
      <div className="Modal">
        {this.props.children}
      </div>
    </div>, modalRoot
  );
  }
}
