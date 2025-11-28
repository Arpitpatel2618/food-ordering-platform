// Simulating payment processing (for demonstration)
const processPayment = (paymentMethod, totalAmount) => {
  return new Promise((resolve, reject) => {
    if (paymentMethod === 'COD') {
      // Simulate successful Cash On Delivery payment
      resolve({
        success: true,
        message: 'Payment processed via Cash on Delivery.',
        amount: totalAmount,
      });
    } else if (paymentMethod === 'Card') {
      // Simulate card payment failure (for example)
      reject({
        success: false,
        message: 'Card payment failed. Try again.',
      });
    } else {
      reject({
        success: false,
        message: 'Unsupported payment method.',
      });
    }
  });
};

module.exports = { processPayment };
