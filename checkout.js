class Checkout {
    constructor() {
        this.pricingRules = {
            A: { price: 50, specialPrice: { quantity: 3, price: 130 } },
            B: { price: 30, specialPrice: { quantity: 2, price: 45 } },
            C: { price: 20 },
            D: { price: 15 },
        };
        this.cartItems = [];
    }
  
    populateItemTable() {
        const tableBody = document.getElementById("itemTableBody");
    
        // Clear existing table body
        tableBody.innerHTML = "";
    
        // Iterate over pricingRules object
        for (const item in this.pricingRules) {
            const row = document.createElement("tr");
    
            // Create and populate table cells
            const itemCell = document.createElement("td");
            itemCell.textContent = item;
            row.appendChild(itemCell);
    
            const priceCell = document.createElement("td");
            priceCell.textContent = this.convertToPounds(this.pricingRules[item].price);
            row.appendChild(priceCell);
    
            const specialPriceCell = document.createElement("td");
            if (this.pricingRules[item].specialPrice) {
                const { quantity, price } = this.pricingRules[item].specialPrice;
                specialPriceCell.textContent = `Buy ${quantity} for ${this.convertToPounds(price)}`;
            }
            row.appendChild(specialPriceCell);
    
            // Create action cell with button
            const actionCell = document.createElement("td");
            const addButton = document.createElement("button");
            addButton.textContent = "Add to Cart";
            addButton.addEventListener("click", () => {
                this.addToCart(item);
            });
            actionCell.appendChild(addButton);
            row.appendChild(actionCell);
    
            // Append row to table body
            tableBody.appendChild(row);
        }
    }

    addToCart(item){
        this.addItemToCart(item)
        this.updateCartTable();
        this.updateTotalAmount();
        this.updateTotalAmountHtml();
    }

    updateCartTable() {
        const cartTableBody = document.getElementById("cartTableBody");
    
        // Clear existing table body
        cartTableBody.innerHTML = "";
    
        // Iterate over cartItems object
        for (const cartItem of this.cartItems) {
            const item = cartItem.item;
            const quantity = cartItem.quantity;
    
            // Create and populate table cells
            const row = document.createElement("tr");
    
            const itemCell = document.createElement("td");
            itemCell.textContent = item;
            row.appendChild(itemCell);
    
            const quantityCell = document.createElement("td");
            quantityCell.textContent = quantity;
            row.appendChild(quantityCell);
    
            const priceCell = document.createElement("td");
            priceCell.textContent = this.convertToPounds(this.checkSpecialPrice(item, quantity));
            row.appendChild(priceCell);
    
            // Append row to table body
            cartTableBody.appendChild(row);
        }
    }

    addItemToCart(item) {
        const itemIndex = this.cartItems.findIndex((cartItem) => cartItem.item === item);
    
        if (itemIndex !== -1) {
            // Item already exists in the cart, increment quantity
            this.cartItems[itemIndex].quantity++;
        } else {
            // Item doesn't exist in the cart, add it with quantity 1
            this.cartItems.push({ item: item, quantity: 1 });
        }
    }
  
    updateTotalAmount() {
        let totalAmount = 0;
    
        for (const cartItem of this.cartItems) {
            const item = cartItem.item;
            const quantity = cartItem.quantity;
    
            if (this.pricingRules[item]) {
                const { price, specialPrice } = this.pricingRules[item];
        
                if (specialPrice && quantity >= specialPrice.quantity) {
                    const specialPriceCount = Math.floor(quantity / specialPrice.quantity);
                    totalAmount += specialPriceCount * specialPrice.price;
                    const remainingItems = quantity % specialPrice.quantity;
                    totalAmount += remainingItems * price;
                } else {
                    totalAmount += price * quantity;
                }
            }
        }
    
        console.log(`Total Amount: ${this.convertToPounds(totalAmount)}`);
        return this.convertToPounds(totalAmount);
    }

    updateTotalAmountHtml() {
        const totalAmountElement = document.getElementById("totalAmount");
        totalAmountElement.textContent = this.updateTotalAmount();
    }
  
    checkSpecialPrice(item, quantity) {
        let totalPrice = 0;
    
        if (this.pricingRules[item]) {
            const { price, specialPrice } = this.pricingRules[item];
    
            if (specialPrice && quantity >= specialPrice.quantity) {
                const specialPriceCount = Math.floor(quantity / specialPrice.quantity);
                totalPrice += specialPriceCount * specialPrice.price;
                const remainingItems = quantity % specialPrice.quantity;
                totalPrice += remainingItems * price;
            } else {
                totalPrice += price * quantity;
            }
        }
        return totalPrice;
    }
  
    convertToPounds(price) {
        const pounds = price / 100; // Price is in pence, convert to pounds
        return `£${pounds.toFixed(2)}`;
    }
}
  
module.exports = Checkout;