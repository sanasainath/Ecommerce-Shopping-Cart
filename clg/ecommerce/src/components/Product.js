import React, { useState, useEffect } from 'react';


import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getAllProducts } from '../action/admin/productalltypes';
import { addProduct } from '../action/productaction';
import './Product.css';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';
// ... (previous imports and code)

function Product({ categories }) {
  const { AllProducts, loading, error } = useSelector((state) => state.getallproducts);
const dispatch=useDispatch();
const [checked, setChecked] = useState([]);
const [expanded, setExpanded] = useState([]);
const [deleteModalOpen, setDeleteModalOpen] = useState(false);
const [editModalOpen, setEditModalOpen] = useState(false);
const [selectedProductsDetails, setSelectedProductsDetails] = useState([]); 
const [productDetailsModalOpen, setProductDetailsModalOpen] = useState(false);
const [selectedProductDetails, setSelectedProductDetails] = useState(null);

  console.log("getting all products or not",AllProducts);
 

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  const toggleCheckbox = (productId) => {
    if (checked.includes(productId)) {
      setChecked(checked.filter((id) => id !== productId));
    } else {
      setChecked([...checked, productId]);
    }
  };

  const toggleExpand = (productId) => {
    if (expanded.includes(productId)) {
      setExpanded(expanded.filter((id) => id !== productId));
    } else {
      setExpanded([...expanded, productId]);
    }
  };
  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };
  const handleDeleteProducts =async () => {
    // Implement logic to delete selected products
    console.log('Deleting selected products:', checked);
    
    await dispatch(deleteProduct(checked)); // Assuming deleteProduct accepts an array of productIds
    dispatch(getAllProducts()); 

    // You may need to dispatch a Redux action or make an API call to delete the products

    // Clear selected products after deletion
    setChecked([]);

    // Close the delete modal after handling the delete operation
    closeDeleteModal();
  };
  // const handleEditProduct = () => {
  //   // Retrieve the details of the selected products and set them in the state
  //   const selectedDetails = AllProducts.filter((product) => checked.includes(product._id));
  //   setSelectedProductsDetails(selectedDetails);

  //   // Open the edit modal
  //   setEditModalOpen(true);
  // };
  const handleProductDetails = () => {
    // Ensure that AllProducts is an array before filtering
    const product=AllProducts.products
    if (!Array.isArray(product)) {
      console.error('AllProducts is not an array');
      return;
    }
  
    // Retrieve the details of the selected product and set them in the state
    const selectedDetails = product.filter((product) => checked.includes(product._id));
    setSelectedProductDetails(selectedDetails);
  
    // Open the product details modal
    setProductDetailsModalOpen(true);
  };
  
  
  const renderProductTree = (allProducts, parentCategoryId = null) => {
    const { products } = allProducts;

    return (
      <ul className='dsss'>
        {products && products.length > 0 && products.map((product) => (
          <li key={product._id}>
            <div>
              <input
                type="checkbox"
                checked={checked.includes(product._id)}
                onChange={() => toggleCheckbox(product._id)}
              />
              <span onClick={() => toggleExpand(product._id)}>
                {product.name}
              </span>
            </div>

            {expanded.includes(product._id) && (
              <div>
                <p>Description: {product.description}</p>
                <p>Price: {product.price}</p>
                <p>ratings:{product.rating}</p>
                {/* Add other product details as needed */}
              </div>
            )}

            {product.category === parentCategoryId && renderProductTree(product)}
          </li>
        ))}
      </ul>
    );
  };
  

  
  // Modal component code embedded within the Category component
  const Modal = ({ setOpenModal, allCategories }) => {
    const dispatch = useDispatch();
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productQuantity, setProductQuantity] = useState('');
    const [productPictures, setProductPictures] = useState([]);
    const [productCategoryId, setProductCategoryId] = useState('');
    const [isFeatured, setIsFeatured] = useState(false);

    // ... rest of the Modal component code ...
    const saveProduct = () => {
      console.log('categoryName:', productName);
      const form = new FormData();
      form.append('name', productName);
      form.append('isFeatured', isFeatured);
      form.append('description', productDescription);
      form.append('price', productPrice);
      form.append('quantity', productQuantity);
      form.append('category', productCategoryId);

      productPictures.forEach((file, index) => {
        form.append("productPictures", file);
      });

      console.log("seeing category image");
      console.log('Form Data:', ...form);
      console.log('Product Pictures:', productPictures);

      dispatch(addProduct(form));
    };

    return (
      
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="titleCloseBtn">
            <button
              onClick={() => {
                setOpenModal(false);
              }}
            >
              X
            </button>
          </div>
          <div className="title">
            <h3>Add new category</h3>
          </div>
          <div className="body">
            <form enctype="multipart/form-data" method="post" action="/product/create">
              <input
                type="text"
                value={productName}
                placeholder="productName"
                onChange={(e) => setProductName(e.target.value)}
              />
              <input
                type="text"
                value={productDescription}
                placeholder="productDescription"
                onChange={(e) => setProductDescription(e.target.value)}
              />
              <input
                type="text"
                value={productPrice}
                placeholder="productPrice"
                onChange={(e) => setProductPrice(e.target.value)}
              />
              <input
                type="text"
                value={productQuantity}
                placeholder="productQuantity"
                onChange={(e) => setProductQuantity(e.target.value)}
              />
              <select value={productCategoryId} onChange={(e) => setProductCategoryId(e.target.value)}>
                <option value="">Select Category</option>
                {renderCategoryOptions(allCategories)}
              </select>

              <input
            type="checkbox"
            id="isFeatured"
            name="isFeatured"
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
          />
          <label htmlFor="isFeatured">Featured</label>
              <input
                type="file"
                name="productPictures"
                onChange={(e) => {
                  console.log('Selected Files:', e.target.files);

                  const filesArray = Array.from(e.target.files);
                  setProductPictures([...productPictures, ...filesArray]);
                }}
                multiple
              />

              {productPictures && productPictures.length > 0 &&
                productPictures.map((pic, index) => (
                  <div key={index}>
                    <img src={URL.createObjectURL(pic)} alt={`Product ${index}`} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                  </div>
                ))}
            </form>
          </div>
          <div className="footer">
            <button
              onClick={() => {
                setOpenModal(false);
              }}
              id="cancelBtn"
            >
              Cancel
            </button>
            <button onClick={saveProduct}>Save Changes</button>
          </div>
        </div>
      </div>
    );
  };

  const [openCategories, setOpenCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);


  const toggleCategory = (categoryId) => {
    if (openCategories.includes(categoryId)) {
      setOpenCategories(openCategories.filter((id) => id !== categoryId));
    } else {
      setOpenCategories([...openCategories, categoryId]);
    }
  };  const renderCategories = (categories, parentCategory = null) => {
    if (!categories || categories.length === 0) return null;

    return (
      <ul>
        {categories.map((category) => (
          <li key={category._id}>
            <span onClick={() => toggleCategory(category._id)}>
              {category.name}
            </span>
            {openCategories.includes(category._id) && (<ul>   {renderCategories(category.children, category._id)}</ul>)}
          </li>
        ))}
      </ul>
    );
  };



  // Helper function to render category options recursively
  const renderCategoryOptions = (categories, level = 0) => {
    if (!categories || categories.length === 0) return null;

    return categories.map((category) => (
      <React.Fragment key={category._id}>
        <option value={category._id}>{`${'—'.repeat(level)}${category.name}`}</option>
        {category.children && renderCategoryOptions(category.children, level + 1)}
      </React.Fragment>
    ));
  }; 

  return (
    <div>
      <h3>Categories</h3>
      {renderCategories(categories)}
      <h3>Products</h3>
      {renderProductTree(AllProducts)}

      <h1>Hey, click on the button to open the modal.</h1>

      <button
        className="openModalBtn"
        onClick={() => {
          setModalOpen(true);
        }}
      >
        Create Product
      </button>

      {modalOpen && <Modal setOpenModal={setModalOpen} allCategories={categories} />}

      <button onClick={openDeleteModal}>Delete Product</button>
      <button onClick={handleProductDetails}>Edit Product</button>
      {deleteModalOpen && (
        <DeleteModal
          isOpen={deleteModalOpen}
          closeModal={closeDeleteModal}
          selectedProducts={checked}
          deleteProduct={handleDeleteProducts}
        />
      )}
    
      
      <EditModal
        isOpen={productDetailsModalOpen}
        closeModal={() => setProductDetailsModalOpen(false)}
        selectedProductDetails={selectedProductDetails}
        categories={categories}
      />

      
  
      
   
    </div>
  );
}

const CategoryWrapper = () => {
  const categories = useSelector((state) => state.category.categories);


  return <Product categories={categories} />;
};

export default CategoryWrapper;