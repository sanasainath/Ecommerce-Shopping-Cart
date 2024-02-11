import React from 'react';
import './DeleteModal.css'; // Import your CSS file for styling

const DeleteModal = ({ isOpen, closeModal, selectedProducts, deleteProduct }) => {
  return (
    <div className={`custom-delete-modal ${isOpen ? 'active' : ''}`}>
      <div className="modal-container">
        <button onClick={closeModal} className="close-btn">
          &times;
        </button>
        <h3>Delete Product</h3>
        <div className="modal-body">
          <p>Selected Products:</p>
          <ul>
            {selectedProducts.map((productId) => (
              <li key={productId}>{productId}</li>
            ))}
          </ul>
        </div>
        <div className="modal-footer">
          <button id="cancelBtn" onClick={closeModal}>
            Cancel
          </button>
          <button onClick={deleteProduct}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
