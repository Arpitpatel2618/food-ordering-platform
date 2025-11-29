const { processPayment } = require('../../src/utils/paymentService');

describe('Payment Service', () => {
  test('should process COD payment successfully', async () => {
    const result = await processPayment('COD', 9.99);
    expect(result.success).toBe(true);
    expect(result.message).toBe('Payment processed via Cash on Delivery.');
    expect(result.amount).toBe(9.99);
  });

  test('should fail for unsupported payment method', async () => {
    await expect(processPayment('Paypal', 9.99)).rejects.toEqual({
      success: false,
      message: 'Unsupported payment method.',
    });
  });

  test('should fail for card payment failure', async () => {
    await expect(processPayment('Card', 9.99)).rejects.toEqual({
      success: false,
      message: 'Card payment failed. Try again.',
    });
  });
});
