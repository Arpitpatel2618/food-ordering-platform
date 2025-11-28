const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');

const placeOrder = async (req, res) => {
  const { customerId, restaurantId, items, paymentMethod } = req.body;
  
  const orderItems = [];
  let totalAmount = 0;
  
  for (let item of items) {
    const menuItem = await MenuItem.findById(item.menuItemId);
    if (!menuItem) {
      return res.status(400).json({ success: false, message: 'Invalid Menu Item ID' });
    }

    orderItems.push({ menuItem: menuItem._id, quantity: item.quantity, price: menuItem.price });
    totalAmount += menuItem.price * item.quantity;
  }

  const newOrder = new Order({
    customer: customerId,
    restaurant: restaurantId,
    items: orderItems,
    totalAmount,
    paymentMethod
  });

  await newOrder.save();

  return res.json({
    success: true,
    message: 'Order placed successfully',
    data: newOrder
  });
};

module.exports = { placeOrder };
