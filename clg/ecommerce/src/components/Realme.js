// // Sidebar.js

// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getAllCategories } from '../action/categoryaction';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import './Sidebar.css';
// // Sidebar.js

// function Subcategory({ name, slug, id, type, children }) {
//   const [isClicked, setClicked] = useState(false);
//   const [isHovered, setHovered] = useState(false);

//   const handleMouseEnter = () => {
//     setHovered(true);
//   };

//   const handleMouseLeave = () => {
//     setHovered(false);
//   };

//   const handleClick = (event) => {
//     if (children.length === 0) {
//       // No subcategories, navigate to the destination
//       return;
//     }
//     event.preventDefault();
//     setClicked(!isClicked);
//   };

//   return (
//     <div
//       className={`subcategory ${isClicked ? 'clicked' : ''}`}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
//       <div className='subcategory-item'>
//         <a
//           href={children.length === 0 ? `/${slug}` : `/${slug}?cid=${id}${type ? `&type=${type}` : ''}`}
//           className='subcategory-link'
//           onClick={handleClick}
//         >
//           {name}
//         </a>
//         {children.length > 0 && (
//           <ArrowForwardIosIcon style={{ fontSize: '10px', color: '#28282B', marginLeft: 'auto' }} />
//         )}
//       </div>
//       {(isClicked || isHovered) && children.length > 0 && (
//         <div className='subcategories'>
//           {children.map(subcategory => (
//             <Subcategory key={subcategory._id} {...subcategory} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
// function MainCategory({ category }) {
//   const { name, slug, _id, type, children } = category;
//   const [isClicked, setClicked] = useState(false);

//   const handleClick = () => {
//     setClicked(!isClicked);
//   };

//   return (
//     <div className={`main-category ${isClicked ? 'clicked' : ''}`}>
//       <div className='category-item' onClick={handleClick}>
//         <img
//           src='./images/icons8-square-24.png'
//           alt='not found'
//           width='4px'
//           height='4px'
//           style={{ marginRight: '5px' }}
//         />
//         <span className='main-category-link'>{name}</span>
//         {children.length > 0 && (
//           <ArrowForwardIosIcon style={{ fontSize: '10px', color: '#28282B', marginLeft: 'auto' }} />
//         )}
//       </div>
//       {isClicked && (
//         <div className='subcategories'>
//           {children.map(subcategory => (
//             <Subcategory key={subcategory._id} {...subcategory} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


// function Sidebar() {
//   const dispatch = useDispatch();
//   const categories = useSelector((state) => state.category.categories);

//   useEffect(() => {
//     dispatch(getAllCategories());
//   }, [dispatch]);

//   return (
//     <div className='sidebar-top'>
//       <div className='side1'>
//         <h2 style={{ fontSize: '20px', color: 'gray' }}>☰</h2>
//         <h2 style={{ fontWeight: '400', fontSize: '20px', color: 'gray', paddingLeft: '10px' }}> All Products</h2>
//       </div>

//       <div className='deal'>
//         <div className='category-info'>
//           {categories.length > 0 &&
//             categories.map(category => (
//               <MainCategory key={category._id} category={category} />
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// }


// export default Sidebar;

