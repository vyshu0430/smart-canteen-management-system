    const menuItems = {        
        breakfast: [
            { name: "Pancakes", price: "", img: "/public/assets/img/breakfast/pancake.jpeg" },
            { name: "Omelette", price: "$4", img: "/public/assets/img/breakfast/omlete.jpg" },
            { name: "Fruit Salad", price: "$3", img: "/public/assets/img/breakfast/fruit salad.jpg" },
            { name: "French Toast", price: "$5", img: "/public/assets/img/breakfast/bread.jpg" },
            { name: "Breakfast Burrito", price: "$6", img: "/public/assets/img/breakfast/burrito.jpg" },
            { name: "Bagel with Cream Cheese", price: "$2.50", img: "/public/assets/img/breakfast/cream cheese.jpg" },
            { name: "Granola with Yogurt", price: "$4", img: "/public/assets/img/breakfast/yogurt.jpg" },
            { name: "Smoothie Bowl", price: "$5", img: "/public/assets/img/breakfast/smoothie.jpg" },
        ],
        lunch: [
            { name: "Grilled Chicken", price: "$8", img: "/public/assets/img/lunch/grilled chicken.jpg" },
            { name: "Vegetable Stir Fry", price: "$7", img: "/public/assets/img/lunch/Vegetable Stir Fry.jpg" },
            { name: "Pasta Primavera", price: "$6", img: "/public/assets/img/lunch/pasta-primavera.jpg" },
            { name: "Taco Salad", price: "$8", img: "/public/assets/img/lunch/taco salad.jpg" },
            { name: "Club Sandwich", price: "$7", img: "/public/assets/img/lunch/Club Sandwich.jpeg" },
            { name: "Cheeseburger", price: "$9", img: "/public/assets/img/lunch/Cheeseburger.jpg" },
            { name: "Vegetable Curry", price: "$6", img: "/public/assets/img/lunch/vegetable-curry.jpg" },
            { name: "Caesar Salad", price: "$6", img: "/public/assets/img/lunch/Caesar Salad.jpg" },
        ],
        snacks: [
            { name: "Chips", price: "$2", img: "/public/assets/img/snacks/chips.webp" },
            { name: "Cookies", price: "$3", img: "/public/assets/img/snacks/Cookies.avif" },
            { name: "Popcorn", price: "$2", img: "/public/assets/img/snacks/popcorn.jpeg" },
            { name: "Nachos with Cheese", price: "$4", img: "/public/assets/img/snacks/Nachos with Cheese.jpeg" },
            { name: "Fruit Cups", price: "$3", img: "/public/assets/img/snacks/Fruit Cups.jpg" },
            { name: "Veggie Sticks", price: "$2", img: "/public/assets/img/snacks/Veggie Sticks.jpeg" },
            { name: "Cheese Sticks", price: "$3", img: "/public/assets/img/snacks/cheese sticks.jpg" },
            { name: "Trail Mix", price: "$4", img: "/public/assets/img/snacks/trail mix.jpeg" },
        ],
        drinks: [
            { name: "Soda", price: "$1", img: "/public/assets/img/drinks/soda.jpg" },
            { name: "Juice", price: "$2", img: "/public/assets/img/drinks/juice.jpg" },
            { name: "Water", price: "$1", img: "/public/assets/img/drinks/water.jpg" },
            { name: "Iced Tea", price: "$2", img: "/public/assets/img/drinks/iced tea.jpg" },
            { name: "Lemonade", price: "$2", img: "/public/assets/img/drinks/lemonade.jpg" },
            { name: "Coffee", price: "$2", img: "/public/assets/img/drinks/coffee.jpg" },
            { name: "Hot Chocolate", price: "$2.50", img: "/public/assets/img/drinks/hot chocolate.jpg" },
            { name: "Milkshake", price: "$3", img: "/public/assets/img/drinks/milk shake.jpg" },
        ]
    }
    const cart = {}; // To store items added to the cart and their quantities

function showCategory(category) {
    const menu = document.getElementById('menu');
    menu.innerHTML = ''; // Clear previous menu items

    if (category === 'all') {
        for (let cat in menuItems) {
            menuItems[cat].forEach(item => {
                addMenuItem(menu, item);
            });
        }
    } else {
        menuItems[category].forEach(item => {
            addMenuItem(menu, item);
        });
    }
}

function addMenuItem(menu, item) {
    const menuItemDiv = document.createElement('div');
    menuItemDiv.classList.add('menu-item');
    menuItemDiv.innerHTML = `
        <img src="${item.img}" alt="${item.name}" class="menu-image">
        <span>${item.name} - ${item.price}</span>
        <button onclick="addToCart('${item.name}', '${item.price}')">Add to Cart</button>
    `;
    menu.appendChild(menuItemDiv);
}

function addToCart(name, price) {
    if (cart[name]) {
        cart[name].quantity += 1;
    } else {
        cart[name] = { price: price, quantity: 1 };
    }
    showCart();
}

function showCart() {
    const cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = ''; // Clear previous cart items
    for (let item in cart) {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');
        cartItemDiv.innerHTML = `
            <span>${item} - ${cart[item].price} (Qty: ${cart[item].quantity})</span>
        `;
        cartDiv.appendChild(cartItemDiv);
    }
}

function addToCart(item) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if item already exists in the cart
    let existingItem = cartItems.find(cartItem => cartItem.name === item.name);
    if (existingItem) {
        existingItem.quantity += 1;  // Increment quantity if item exists
    } else {
        item.quantity = 1;  // Set initial quantity if item is new
        cartItems.push(item);
    }

    localStorage.setItem('cart', JSON.stringify(cartItems)); // Store updated cart
    alert(`${item.name} has been added to the cart!`);
}

// Ensure add to cart button in the menu calls this function with item details
function addMenuItem(menu, item) {
    const menuItemDiv = document.createElement('div');
    menuItemDiv.classList.add('menu-item');
    menuItemDiv.innerHTML = `
        <img src="${item.img}" alt="${item.name}" class="menu-image">
        <h3>${item.name}</h3>
        <p>${item.price}</p>
        <button class="order-btn" onclick='addToCart(${JSON.stringify(item)})'>Add to Cart</button>
    `;
    menu.appendChild(menuItemDiv);
}





























