import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, deleteIdCategory, getAllCategories, updateCategory } from '../action/categoryaction';
import './Category.css';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import { IoIosCheckboxOutline, IoIosArrowForward, IoIosCheckbox, IoIosArrowDown } from 'react-icons/io';
import { categoryConstant } from '../action/constants';
function Category({ categories }) {

  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [secondModalOpen, setSecondModalOpen] = useState(false);
  const [thirdModalOpen, setThirdModalOpen] = useState(false);
  const [fetchedData, setFetchedData] = useState(false); 
  
  const handleEditButtonClick = () => {
    if (!categories) {
      console.error("Categories not available yet.");
      return;
    }
    // if (checked.length === 0) {
    //   alert("Please select categories to delete.");
    //   return;
    // }
    // const isConfirmed = window.confirm("Are you sure you want to delete the selected categories?");
    // if (!isConfirmed) {
    //   return;
    // }
  handleUpdateCategories();


  };
  const deleteCategories = () => {
    const checkedIdArray = checkedArray.map((item, index) => ({ _id: item._id }));
    const expandedIdArray = expandedArray.map((item, index) => ({ _id: item._id }));
    const idsArray = [...checkedIdArray, ...expandedIdArray];
    if(checkedIdArray.length>0)
    {   dispatch(deleteIdCategory(checkedIdArray)).then((result) => {
      if (result && result.data) {
     dispatch(getAllCategories());
      } else {
        console.log("Error deleting categories:", result);
      }
    });

    }
  
 
    
  };
  
  
  const handleUpdateCategories=()=>{
    
    console.log('Checked:', checked);
    console.log('Expanded:', expanded);
    const categoriesData=renderCategories(categories);
    console.log('seeing all man',categoriesData);
    const checkedArray = [];
    const expandedArray = [];
    checked.length > 0 &&
    checked.forEach((categoryId) => {
      const category = findCategoryById(categories, categoryId);
      if (category) {
        checkedArray.push(category);

        // Add children to the checkedArray if they exist
        if (category.children && category.children.length > 0) {
          category.children.forEach((child) => {
            const childCategory = findCategoryById(categories, child.value);
            if (childCategory) {
              checkedArray.push(childCategory);
            }
          });
        }
      }
    });
    expanded.forEach((categoryId) => {
      const category = findCategoryById(categories, categoryId);
      if (category) {
        expandedArray.push(category);
  
        // Add children to the expandedArray if they exist
        if (category.children && category.children.length > 0) {
          category.children.forEach((child) => {
            const childCategory = findCategoryById(categories, child.value);
            if (childCategory) {
              expandedArray.push(childCategory);
            }
          });
        }
      }
    });
  
    
    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);
console.log('checking chkechdd ',checkedArray)
console.log('one lastt imeee',expandedArray);
  }
  const categoryInput = (key, value, index, type) => {
    if (type === 'checked') {
      const updatedCheckedArray = checkedArray.map((item, _index) =>
        index === _index ? { ...item, [key]: value } : item
      );
      setCheckedArray(updatedCheckedArray);
    } else if (type === 'expanded') {
      const updatedExpandedArray = expandedArray.map((item, _index) =>
        index === _index ? { ...item, [key]: value } : item
      );
      setExpandedArray(updatedExpandedArray);
    }
  };
  
  
  const findCategoryById = (categories, id) => {
    for (const category of categories) {
      if (category._id === id) {
        return category;
      }
  
      const childCategory = findCategoryById(category.children, id);
      if (childCategory) {
        return childCategory;
      }
    }
  
    return null;
  };
  
  const dispatch = useDispatch();

  const renderCategories = (categories, parentCategory = null) => {
    if (!categories || categories.length === 0) return null;

    return categories.map((category) => ({
      label: category.name,
      value: category._id,
      children: category.children && category.children.length > 0 && renderCategories(category.children),
    }));
  };
  


  const Modal = ({ setOpenModal, allCategories }) => {
  

    const saveChange = () => {
      
   deleteCategories();
   
      setOpenModal(false);
    };

    return (
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="titleCloseBtn">
            <button onClick={() => setOpenModal(false)}>X</button>
          </div>
          
          <div className="body1">
            <h5>checked</h5>
            {
              
              checkedArray.map((item,index)=>
              <span key={index}>{item.name}</span>)
            }
            <h5>expanded</h5>
            {
              expandedArray.map((item,index)=>
              <span key={index}>{item.name}</span>)
            }
          </div>
          <div className="footer">
            <button onClick={() => setOpenModal(false)} id="cancelBtn">
              Cancel
            </button>
            <button onClick={saveChange}>Save Changes</button>
          </div>
        </div>
      </div>
    );
  };

  const SecondModal = ({ setOpenSecondModal, allCategories }) => {
   
    const [type, setType] = useState('');
   const saveChange = () => {
      const form = new FormData();
      expandedArray.map((item, index) => {
        form.append('name[]', item.name);
        form.append('_id[]', item._id || '');
        form.append('parentId[]', item.parentId || '');
        form.append('type[]', item.type || '');
        return null;
      });
      
      // Process checkedArray
      checkedArray.map((item1, index) => {
        form.append('name[]', item1.name);
        form.append('_id[]', item1._id || '');
        form.append('parentId[]', item1.parentId || '');
        console.log("item nammee",item1.type);
        form.append('type[]', item1.type || '');
        return null;
      });
      dispatch(updateCategory(form)).then(() => {
        
        dispatch(getAllCategories()); 
      });
      
      
      
      
      setOpenSecondModal(false);
      // Send the form data in your request...
    };
    
     
    
  
  
    return (
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="titleCloseBtn">
            <button onClick={() => setOpenSecondModal(false)}>X</button>
          </div>
          <div className="title">
            <h3>Edit categories</h3>
          </div>
          <div className="body">
            <form action="/category/edit" method="post" encType="multipart/form-data">
            {expandedArray &&
  expandedArray.map((category, index) => (
    <div key={category._id}>
      <h2>{category.name}</h2>
      <input
  key={`input-${index}`}
  type="text"
  value={category.name}
  placeholder={category.name}
  onChange={(e) => categoryInput('name', e.target.value, index, 'expanded')}
/>

     <select value={category.parentId} onChange={(e) => categoryInput('parentId', e.target.value, index, 'expanded')}>
  <option value="">Select Category</option>
  {renderCategoryOptions(allCategories)}
</select>

<select value={category.type} onChange={(e) => categoryInput('type', e.target.value, index, 'expanded')}>
  <option value=''>Select type</option>
  <option value='store'>store</option>
  <option value='product'>product</option>
  <option value='page'>page</option>
</select>
      {/* <input
        type="file"
        name="categoryImg"
        onChange={(e) => setCategoryImage(e.target.files[0])}
      /> */}
    </div>
  ))}

  <h5>checked array</h5>
  
  {checkedArray &&
checkedArray.map((category, index) => (
    <div key={category._id}>
      <h2>{category.name}</h2>
      <input
        type="text"
        value={category.name}
        placeholder={category.name}
        onChange={(e) => categoryInput('name', e.target.value, index, 'checked')}
      />
     <select value={category.parentId} onChange={(e) => categoryInput('parentId', e.target.value, index, 'checked')}>
  <option value="">Select Category</option>
  {renderCategoryOptions(allCategories)}
</select>

<select value={category.type} onChange={(e) => categoryInput('type', e.target.value, index, 'checked')}>
        <option value=''>Select type</option>
        <option value='store'>store</option>
        <option value='product'>product</option>
        <option value='page'>page</option>
      </select>
      {/* <input
        type="file"
        name="categoryImg"
        onChange={(e) => setCategoryImage(e.target.files[0])}
      /> */}
    </div>
  ))}
            </form>
          </div>
          <div className="footer">
            <button onClick={() => setOpenSecondModal(false)} id="cancelBtn">
              Cancel
            </button>
            <button onClick={saveChange}>Save Changes</button>
          </div>
        </div>
      </div>
    );
  };
  

  const ThirdModal = ({ setThirdModalOpen, allCategories }) => {
    const [categoryName, setCategoryName] = useState('');
    const [parentCategory, setParentCategory] = useState('');
    const [categoryImg, setCategoryImage] = useState('');
    const [type, setType] = useState(''); 
    const saveChange = () => {
      const form = new FormData();
      form.append('name', categoryName);
      form.append('parentId', parentCategory);
      form.append('categoryImg', categoryImg);
      form.append('type',type);
  
      dispatch(addCategory(form));
      setThirdModalOpen(false);
    };
  
    return (
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="titleCloseBtn">
            <button onClick={() => setThirdModalOpen(false)}>X</button>
          </div>
          <div className="title">
            <h3>Add new category</h3>
          </div>
          <div className="body">
            <form action="/category/create" method="post" encType="multipart/form-data">
              <input
                type="text"
                value={categoryName}
                placeholder="categoryName"
                onChange={(e) => setCategoryName(e.target.value)}
              />
              <select value={parentCategory} onChange={(e) => setParentCategory(e.target.value)}>
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
              <input type="file" name="categoryImg" onChange={(e) => setCategoryImage(e.target.files[0])} />
            </form>
          </div>
          <div className="footer">
            <button onClick={() => setThirdModalOpen(false)} id="cancelBtn">
              Cancel
            </button>
            <button onClick={saveChange}>Save Changes</button>
          </div>
        </div>
      </div>
    );
  };
  

  const toggleCategory = (categoryId) => {
    setExpanded((prevExpanded) => {
      const isExpanded = prevExpanded.includes(categoryId);
      return isExpanded ? prevExpanded.filter((id) => id !== categoryId) : [...prevExpanded, categoryId];
    });
    console.log("okk")
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

  return (
    <div>
   
   <div className="getcategories">
        {categories ? (
          categories.length > 0 ? (
            <CheckboxTree
              nodes={renderCategories(categories)}
              checked={checked}
              expanded={expanded}
              onCheck={(checked) => setChecked(checked)}
              onExpand={(expanded) => setExpanded(expanded)}
              icons={{
                check: <IoIosCheckbox />,
                uncheck: <IoIosCheckboxOutline />,
                halfCheck: <IoIosCheckboxOutline />,
                expandClose: <IoIosArrowForward />,
                expandOpen: <IoIosArrowDown />,
              }}
            />
          ) : (
            <p>No categories available.</p>
          )
        ) : (
          <p>Loading categories...</p>
        )}
      </div>

      <h1>Hey, click on the button to open the modals.</h1>

      <button
        className="openModalBtn"
        onClick={() => {
          setModalOpen(true);
          handleUpdateCategories();
         
        }}
      >
        delete
      </button>

      <button
        className="openModalBtn"
        onClick={() => {
          setSecondModalOpen(true);
          handleEditButtonClick();
        }}
      >
        Edit
      </button>

      <button
        className="openModalBtn"
        onClick={() => {
          setThirdModalOpen(true);
        }}
      >
        add
      </button>

      {modalOpen && <Modal setOpenModal={setModalOpen} allCategories={categories} />}
      {secondModalOpen && <SecondModal setOpenSecondModal={setSecondModalOpen} allCategories={categories} />}
      {thirdModalOpen && <ThirdModal setThirdModalOpen={setThirdModalOpen} allCategories={categories} />}
    </div>
  );
}

const CategoryWrapper = () => {
  const categories = useSelector((state) => state.category.categories);

  return <Category categories={categories} />;
};

export default CategoryWrapper;