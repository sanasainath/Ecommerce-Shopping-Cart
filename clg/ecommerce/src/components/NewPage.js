import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { savePage } from '../action/newpageaction';
import './NewPage.css'
const NewPage = ({ setCreatePageModalOpen, allCategories }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const page = useSelector((state) => state.page);
  const [pageName, setPageName] = useState('');
  const [parentCategory, setParentCategory] = useState('');
  const [description, setDescription] = useState('');
  const [banner, setBanner] = useState([]);
  const [productFiles, setProductFiles] = useState([]);
  const [products, setProducts] = useState([
    { name: '', price: '' } // Initial entry for the first product
  ]);
  const [type, setType] = useState('');

  useEffect(() => {
    console.log('its page mannnnnnnn', page);
  }, [page]);
  
  const renderCategoryOptions = (categories, level = 0) => {
    if (!categories || categories.length === 0) return null;

    return categories.map((category) => (
      <React.Fragment key={category._id}>
        <option value={category._id}>{`${'—'.repeat(level)}${category.name}`}</option>
        {category.children && renderCategoryOptions(category.children, level + 1)}
      </React.Fragment>
    ));
  };

  const saveChange = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', pageName);
    formData.append('description', description);

    banner.forEach((banner, index) => {
      formData.append('banner', banner);
    });

    productFiles.forEach((productFile, index) => {
      formData.append('product', productFile);

      // Append product name and price
      formData.append(`productName${index + 1}`, products[index].name);
      formData.append(`productPrice${index + 1}`, products[index].price);
    });

    formData.append('category', parentCategory);
    formData.append('type', type);

    dispatch(savePage(formData));

    setCreatePageModalOpen(false);
  };

  const handleProductFileChange = (e, index) => {
    const newProductFiles = [...productFiles];
    newProductFiles[index] = e.target.files[0];
    setProductFiles(newProductFiles);
  };

  const handleProductNameChange = (e, index) => {
    const newProducts = [...products];
    newProducts[index].name = e.target.value;
    setProducts(newProducts);
  };
  const handleProductDescriptionChange = (e, index) => {
    const newProducts = [...products];
    newProducts[index].description= e.target.value;
    setProducts(newProducts);
  };

  const handleProductPriceChange = (e, index) => {
    const newProducts = [...products];
    newProducts[index].price = e.target.value;
    setProducts(newProducts);
  };

  const handleAddProduct = () => {
    setProducts([...products, { name: '', price: '' }]);
    setProductFiles([...productFiles, null]);
  };

  const renderProductsInputs = () => {
    return productFiles.map((productFile, index) => (
      <div key={index}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleProductFileChange(e, index)}
        />
        <input
          type="text"
          placeholder="Product Name"
          value={products[index].name}
          onChange={(e) => handleProductNameChange(e, index)}
        />
        <input
          type="text"
          placeholder="Product Price"
          value={products[index].price}
          onChange={(e) => handleProductPriceChange(e, index)}
        />
          <input
          type="text"
          placeholder="Product Description"
          value={products[index].description}
          onChange={(e) => handleProductDescriptionChange(e, index)}
        />
      </div>
    ));
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={() => setCreatePageModalOpen(false)}>X</button>
        </div>
        <div className="title">
          <h3>Create a new page</h3>
        </div>
        <div className="body">
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              value={pageName}
              placeholder="Page Name"
              onChange={(e) => setPageName(e.target.value)}
            />
            <input
              type="text"
              value={description}
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setBanner([...banner, e.target.files[0]])}
            />
            {renderProductsInputs()}
            <button type="button" onClick={handleAddProduct}>
              Add Product
            </button>
            <select
              value={parentCategory}
              onChange={(e) => {
                const selectedCategoryId = e.target.value;
                const selectedCategory = categories.find(
                  (category) => category._id === selectedCategoryId
                );

                setParentCategory(selectedCategoryId);
                // setType(selectedCategory ? selectedCategory.type : ''); // Set the type if category is found, otherwise set it to an empty string
              }}
            >
              <option value="">Select Category</option>
              {renderCategoryOptions(allCategories)}
            </select>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Select Type</option>
              <option value="store">store</option>
              <option value="product">product</option>
              <option value="page">page</option>
            </select>
          </form>
          <div>
            <p>Selected Banner Files:</p>
            <ul className="fileList">
              {banner.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
          {/* <div>
            <p>Selected Product Files:</p>
            <ul className="fileList">
              {productFiles.map((file, index) => (
                <li key={index}>{file && file.name}</li>
              ))}
            </ul>
          </div> */}
        </div>
        <div className="footer">
          <button onClick={() => setCreatePageModalOpen(false)} id="cancelBtn">
            Cancel
          </button>
          <button onClick={saveChange}>Save Changes</button>
        </div>
      </div>
    </div>
  );
};

const Category = () => {
  const [createPageModalOpen, setCreatePageModalOpen] = useState(false);
  const categories = useSelector((state) => state.category.categories);

  return (
    <div>
      {/* Additional Category content */}
      <button
        className="openModalBtn"
        onClick={() => {
          setCreatePageModalOpen(true);
          // Additional logic for initializing the modal if needed
        }}
      >
        Create Page
      </button>

      {createPageModalOpen && <NewPage setCreatePageModalOpen={setCreatePageModalOpen} allCategories={categories} />}
    </div>
  );
};

export default Category;
