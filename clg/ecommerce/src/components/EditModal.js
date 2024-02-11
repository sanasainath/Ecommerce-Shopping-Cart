import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateProduct } from '../action/admin/productalltypes';
import { getAllProducts } from '../action/admin/productalltypes';
const EditModal = ({ isOpen, closeModal, selectedProductDetails, categories }) => {
   const dispatch=useDispatch()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    isFeatured: false,
    category: '', 
    rating: 0, 
    productPictures: [],// Add category field to the formData
    // Add other product fields here
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (selectedProductDetails && selectedProductDetails.length > 0) {
      const {
        name,
        description,
        price,
        quantity,
        isFeatured,
        category,
        rating, // Add category field
        productPictures,// Add other product fields here
      } = selectedProductDetails[0];
      setFormData({
        name,
        description,
        price,
        quantity,
        isFeatured,
        category: category._id, // Assuming category is an object with an _id field
        // Add other product fields here
        rating,
        productPictures: productPictures || [], 
      });
    }
  }, [selectedProductDetails]);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: e.target.name === 'rating' ? parseFloat(value) : value,
    });
  };
 

  // Function to add the selected image to productPictures
  const handleAddImage = () => {
    if (image) {
      console.log("Selected Image:", image);
      setFormData({
        ...formData,
        productPictures: [...formData.productPictures, image],
      });
      setImage(null); // Clear the selected image after adding it
    }
  };
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  

 
  const handleSubmit = async (e) => {
    e.preventDefault();
console.log("submit and checking ",formData)
    // Dispatch the updateProduct action with the form data and productId
    await dispatch(updateProduct(formData, selectedProductDetails[0]._id));

    dispatch(getAllProducts()); 

    closeModal();
  };

  if (!isOpen || !selectedProductDetails || !categories) return null;

  return (
    <div className="productDetailsModal">
      
      <h3>Edit Product</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="text"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="image">Add Image:</label>
          <input type="file" id="image" name="image" onChange={handleImageChange} />
          <button type="button" onClick={handleAddImage}>
            Add Image
          </button>
        </div>

        {/* Display selected images */}
        <div>
        {formData.productPictures.map((pic, index) => (
  <div key={index}>
    {pic instanceof Blob && (
      <img src={URL.createObjectURL(pic)} alt={`Product ${index + 1}`} />
    )}
  </div>
))}


        </div>
        <div>
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            min="0"
            max="5"
            step="0.1"
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            {renderCategoryOptions(categories)}
          </select>
        </div>
        <div>
          <label htmlFor="isFeatured">Is Feature:</label>
          <input
            type="checkbox"
            id="isFeatured"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={handleChange}
          />
        </div>
        {/* Add other product fields as needed */}
        <button type="submit">Save Changes</button>
        <button type="button" onClick={closeModal}>Close</button>
      </form>
    </div>
  );
};
const renderCategoryOptions = (categories, level = 0) => {
    if (!categories || categories.length === 0) return null;

    return categories.map((category) => (
      <React.Fragment key={category._id}>
        <option value={category._id}>{`${'—'.repeat(level)}${category.name}`}</option>
        {category.children && renderCategoryOptions(category.children, level + 1)}
      </React.Fragment>
    ));
  }; 
export default EditModal;
