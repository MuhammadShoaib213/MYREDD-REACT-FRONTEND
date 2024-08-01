import React from 'react';
import Modal from 'react-modal';

// Ensure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

const FormModal = ({ isOpen, onRequestClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)'
        },
        content: {
          top: '40%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          border: '1px solid #ccc',
          borderRadius: '10px',
          padding: '20px',
          width: '350px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }
      }}
    >
      {children}
    </Modal>
  );
};

export default FormModal;
