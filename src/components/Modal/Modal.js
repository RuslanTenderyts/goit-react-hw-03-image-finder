import React,{Component} from "react";
import { createPortal } from "react-dom";
import { Overlay, ModalWindow} from "./Modal.styled";


const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    console.log('Модалка Відкрита')
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    console.log('Модалка закрита')
  }

  handleKeyDown = (e) => {
    if(e.code === 'Escape' ){
      this.props.onClose();
    }
  }

  handleBackdropClick = (e) => {

    if(e.currentTarget === e.target) {
        this.props.onClose();
    }
  }

  render () {
    return createPortal(
      
      <Overlay onClick={this.handleBackdropClick}>
        <ModalWindow >
          {this.props.children}
        </ModalWindow>
      </Overlay>,

      modalRoot
    ); 
  }
}



       


