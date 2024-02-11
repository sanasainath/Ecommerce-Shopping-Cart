
const Order = require("../model/order");
const Cart = require('../model/cart');
const Razorpay = require('razorpay');

exports.addOrders = async (req, res) => {
    try {
        // // Validate Razorpay API keys
        // if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_SECRET) {
        //     console.error('Razorpay API keys are missing');
        //     return res.status(500).json({ success: false, error: 'Razorpay API keys are missing' });
        // }

        // Initialize Razorpay
        // let razorpay;
        // try {
        //     razorpay = new Razorpay({
        //         key_id: process.env.RAZORPAY_KEY_ID,
        //         key_secret: process.env.RAZORPAY_SECRET,
        //     });
        // } catch (error) {
        //     console.error('Error initializing Razorpay:', error);
        //     return res.status(500).json({ success: false, error: 'Internal Server Error' });
        // }

        // Continue with the rest of your code for handling orders

        const userId = req.body.user;

        // Delete the user's cart
        const deleteResult = await Cart.deleteOne({ user: userId });

        if (deleteResult.deletedCount === 0) {
            console.log('Cart not found or already deleted');
            // Handle this case based on your application's requirements
            // You can choose to proceed with the order creation or send a different response.
        }

        // Extract relevant order information from the request body
        const { addressId, totalAmount, items, paymentStatus, paymentType } = req.body;

        // Create the orderStatus array with the initial status
        const orderStatus = [
            { type: "ordered", date: new Date(), isCompleted: true },
            { type: "packed", isCompleted: false },
            { type: "shipped", isCompleted: false },
            { type: "delivered", isCompleted: false },
        ];

        // Create the new order object
        const order = new Order({
            user: userId,
            addressId,
            totalAmount,
            items,
            paymentStatus,
            paymentType,
            orderStatus,
        });

        // Save the order to the database
        const savedOrder = await order.save();

        // Log the saved order to the console
        console.log('Saved Order:', savedOrder);

        // Send a success response with the saved order
        res.status(201).json({ success: true, order: savedOrder });
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error in addOrders:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};





exports.getOrders = async (req, res) => {
    try {
        // Assuming userId is part of the request parameters or body
        const userId = req.user.userId;
        console.log("user",userId);

        const orders = await Order.find({ user: userId })
        .select("_id paymentStatus items orderStatus") 
            .populate("items.productId", "_id name productPictures");

        res.status(200).json({ success: true, orders });
    }  catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ success: false, error: error.message || 'Internal Server Error' });
    }
    
};
//admin decide whether the product i shipped delivered or packed etc....
// exports.updateOrder = async (req, res) => {
//   const { user, type } = req.body;
//   console.log("user", user);
//   console.log("typee ah", type);

//   try {
//     const updateResult = await Order.updateOne(
//       { user: user, "orderStatus.type": type },
//       {
//         $set: {
//           "orderStatus.$[element].date": new Date(),
//           "orderStatus.$[element].isCompleted": true
//         }
//       },
//       { arrayFilters: [{ "element.type": type }] }
//     );

//     console.log('Update Result:', updateResult);

//     // Check if the document was matched and modified
//     if (updateResult) {
//       return res.status(201).json({ message: 'Order updated successfully' });
//     } else {
//       return res.status(404).json({ message: 'Order not found or status not updated' });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// };
exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.updateOne(
      { _id: req.body.orderId, "orderStatus.type": req.body.type },
      {
        $set: {
          "orderStatus.$": [
            { type: req.body.type, date: new Date(), isCompleted: true },
          ],
        },
      }
    ).exec();

    if (order) {
      res.status(201).json({ order });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error });
  }
};
