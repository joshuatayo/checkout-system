const Checkout = require('../checkout');

describe('Checkout System', () => {
    let checkout;

    beforeEach(() => {
        checkout = new Checkout();
    });

    describe('#constructor', () => {
      test('should initialize pricingRules as an object', () => {
        expect(checkout.pricingRules).toEqual({
            A: { price: 50, specialPrice: { quantity: 3, price: 130 } },
            B: { price: 30, specialPrice: { quantity: 2, price: 45 } },
            C: { price: 20 },
            D: { price: 15 },
        });
      });

      test('cartItems as an empty array', () => {
        expect(checkout.cartItems).toEqual([]);
      });
    });

    describe('#addItemToCart', () => {
        test('should add an item to the cart', () => {
            checkout.addItemToCart('A');
            checkout.addItemToCart('B');
            checkout.addItemToCart('A');
            checkout.addItemToCart('C');

            expect(checkout.cartItems.length).toBe(3);
            expect(checkout.cartItems[0].item).toBe('A');
            expect(checkout.cartItems[0].quantity).toBe(2);
        });
    
        test('should add an item to the cart with quantity 1 if it does not exist', () => {
          const item = 'A';
    
          checkout.addItemToCart(item);
    
          expect(checkout.cartItems).toEqual([{ item: 'A', quantity: 1 }]);
        });
    
        test('should increment the quantity of an existing item in the cart', () => {
          const item = 'A';
    
          checkout.addItemToCart(item);
          checkout.addItemToCart(item);
    
          expect(checkout.cartItems).toEqual([{ item: 'A', quantity: 2 }]);
        });
    });

    describe('#updateTotalAmount', () => {
        test('should update the total amount based on the items and quantities in the cart', () => {
            checkout.addItemToCart('A');
            checkout.addItemToCart('B');
            checkout.addItemToCart('C');
            checkout.addItemToCart('B');

            const expectedTotalAmount = '£1.15';

            expect(checkout.updateTotalAmount()).toBe(expectedTotalAmount);
        });
    });

    describe('#checkSpecialPrice', () => {
        test('should calculate the total price based on the special price and quantity', () => {
            const item = 'A';
            const quantity = 4;
            const expectedPrice = 180;
        
            const totalPrice = checkout.checkSpecialPrice(item, quantity);
        
            expect(totalPrice).toBe(expectedPrice);
        });
    
        test('should calculate the total price based on the regular price if no special price exists', () => {
            const item = 'C';
            const quantity = 2;
            const expectedPrice = 40;
        
            const totalPrice = checkout.checkSpecialPrice(item, quantity);
        
            expect(totalPrice).toBe(expectedPrice);
        });
    
        test('should return 0 if the item is not found in the pricing rules', () => {
            const item = 'Z';
            const quantity = 3;
            const expectedPrice = 0;
        
            const totalPrice = checkout.checkSpecialPrice(item, quantity);
        
            expect(totalPrice).toBe(expectedPrice);
        });
    });

    describe('#convertToPounds', () => {
        test('should convert the price from pence to pounds with two decimal places', () => {
            const price = 1500; // 1500 pence
            const expectedConversion = '£15.00';
        
            const convertedPrice = checkout.convertToPounds(price);
        
            expect(convertedPrice).toBe(expectedConversion);
        });
      
        test('should handle zero price correctly', () => {
            const price = 0;
            const expectedConversion = '£0.00';
        
            const convertedPrice = checkout.convertToPounds(price);
        
            expect(convertedPrice).toBe(expectedConversion);
        });
    });
});