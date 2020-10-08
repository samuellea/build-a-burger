import React, { Component } from 'react';
import './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
  render() {
    const { children, show, modalClosed } = this.props;
    return (
      <>
        <Backdrop show={show} clicked={modalClosed} />
        <div className="Modal" style={{
          transform: show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: show ? '1' : '0'
        }}>
          {children}
        </div>
      </>
    )
  };
};

export default Modal;