const express = require("express");
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});
const { requireSignIn, userMiddleware, adminMiddleware } = require("../middleware/middleware");
const { getOrders, addOrders, updateOrder, updateOrderStatus } = require("../controller/order");


router.get('/get/orders',requireSignIn,getOrders);
router.post('/add/order',requireSignIn,addOrders);
router.post('/update/order',requireSignIn,updateOrder);
module.exports = router;