import authReducer from "./authreducter"; // assuming authreducer file path is correct
import { combineReducers } from "redux";
import userreducer from "./userreducer";
import categoryReducer from './categoryreducer'
import orderReducer from './orderreducer'
import productReducer from './admin/productreducer'
import productslugreducer from './productslugreducer'
import pagereducer from './admin/pagereducer'
import pagegetreducer from "./pagegetreducer";
import adminreducer from "./admin/adminlogin";
import getproductdetails from './getproductdetails';
import cartreducer from './cartreducer';
import addressreducer from './addressreducer'
import getproductbycat from './getproductbycat'
import relatedproduct from './relatedproducts'
import featureproduct from './featureproduct'
import clearrelated from './clearrelatedproduct'
import searchproduct from './searchproduct';
import getAllproducts from "./getAllproducts";
import adminlogin from './admin/adminlogin';
import reviewreducer from './reviewreducer'
const rootReducer = combineReducers({
    auth: authReducer,
    user:userreducer,
    product:productReducer,
    order:orderReducer,
    category:categoryReducer,
    productslugretrieve:productslugreducer,
    Createpage:pagereducer,
    getpage:pagegetreducer,
    admin:adminreducer,
    productdetails:getproductdetails,
    cart:cartreducer,
    address:addressreducer,
    getproductbycat:getproductbycat,
    relatedProduct:relatedproduct,
    featuredProducts:featureproduct,
    clearRelatedProduct:clearrelated,
    searchProduct:searchproduct,
    getallproducts:getAllproducts,
    admins:adminlogin,
    review:reviewreducer,
  
});

export default rootReducer;
