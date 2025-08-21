// This function adds an item to the cart in localStorage
function addToCart(item) {
    // Retrieve existing cart items from localStorage or initialize as empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Add new item to cart
    cart.push(item);
    
    // Save updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Optional: update UI or notify user
    alert(`${item.name} has been added to your cart.`);
}



// Load items from localStorage and display them in the cart
function displayCartItems() {
    // Get cart items from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Get references to DOM elements
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    // Clear existing items in cart display
    cartItemsContainer.innerHTML = '';

    // Initialize total price
    let total = 0;

    // Loop through cart items and create HTML for each
    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <p>${item.name} - $${item.price}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        
        // Append item to cart display
        cartItemsContainer.appendChild(itemElement);
        
        // Update total price
        total += item.price;
    });

    // Update total price in the DOM
    totalPriceElement.textContent = total.toFixed(2);
}

// Remove an item from the cart
function removeFromCart(index) {
    // Get cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Remove item at specified index
    cart.splice(index, 1);

    // Save updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Refresh cart display
    displayCartItems();
}

// Clear the entire cart
function clearCart() {
    // Clear cart from localStorage
    localStorage.removeItem('cart');

    // Refresh cart display
    displayCartItems();
}

// Initialize cart display when page loads
document.addEventListener('DOMContentLoaded', displayCartItems);



// Load items from localStorage and display them in the cart
function displayCartItems() {
    // Get cart items from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Get references to DOM elements
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    // Clear existing items in cart display
    cartItemsContainer.innerHTML = '';

    // Initialize total price
    let total = 0;

    // Loop through cart items and create HTML for each
    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <p>${item.name} - $${item.price}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        
        // Append item to cart display
        cartItemsContainer.appendChild(itemElement);
        
        // Convert price to number and add to total
        const price = parseFloat(item.price);
        if (!isNaN(price)) {
            total += price;
        } else {
            console.error(`Invalid price for item ${item.name}: ${item.price}`);
        }
    });

    // Log the total price for debugging
    console.log("Total calculated:", total);

    // Update total price in the DOM
    totalPriceElement.textContent = total.toFixed(2);
}

// Remove an item from the cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}

// Clear the entire cart
function clearCart() {
    localStorage.removeItem('cart');
    displayCartItems();
}

// Initialize cart display when page loads
document.addEventListener('DOMContentLoaded', displayCartItems);




