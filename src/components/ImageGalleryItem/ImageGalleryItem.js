import React, { Component } from "react";
import Modal from "../Modal/Modal";
import {Li , Img} from './ImageGalleryItem.styled'

export class ImageGalleryItem extends Component {

  state = {
    showModal: false,
  }

  toggleModal = () => {
    this.setState(({showModal}) => ({ showModal: !showModal }));
  };

  render() {
    const {url, largeImage, tags } = this.props;

    return(
      <Li >
          <Img src={url} alt={tags} onClick={this.toggleModal}/> 

          {this.state.showModal && 
            <Modal onClose={this.toggleModal}> 
              <img src={largeImage} alt="фото" />
            </Modal>}
      </Li>
    )
  }
}