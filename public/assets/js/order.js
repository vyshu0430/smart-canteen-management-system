const menuItems = {
    breakfast: [
        { name: "Pancakes", price: "$5" },
        { name: "Omelette", price: "$4" },
        { name: "Fruit Salad", price: "$3" },
        { name: "French Toast", price: "$5" },
        { name: "Breakfast Burrito", price: "$6" },
        { name: "Bagel with Cream Cheese", price: "$2.50" },
        { name: "Granola with Yogurt", price: "$4" },
        { name: "Smoothie Bowl", price: "$5" },
    ],
    lunch: [
        { name: "Grilled Chicken", price: "$8" },
        { name: "Vegetable Stir Fry", price: "$7" },
        { name: "Pasta Primavera", price: "$6" },
        { name: "Taco Salad", price: "$8" },
        { name: "Club Sandwich", price: "$7" },
        { name: "Cheeseburger", price: "$9" },
        { name: "Vegetable Curry", price: "$6" },
        { name: "Caesar Salad", price: "$6" },
    ],
    snacks: [
        { name: "Chips", price: "$2" },
        { name: "Cookies", price: "$3" },
        { name: "Popcorn", price: "$2" },
        { name: "Nachos with Cheese", price: "$4" },
        { name: "Fruit Cups", price: "$3" },
        { name: "Veggie Sticks", price: "$2" },
        { name: "Cheese Sticks", price: "$3" },
        { name: "Trail Mix", price: "$4" },
    ],
    drinks: [
        { name: "Soda", price: "$1" },
        { name: "Juice", price: "$2" },
        { name: "Water", price: "$1" },
        { name: "Iced Tea", price: "$2" },
        { name: "Lemonade", price: "$2" },
        { name: "Coffee", price: "$2" },
        { name: "Hot Chocolate", price: "$2.50" },
        { name: "Milkshake", price: "$3" },
    ]
};

document.getElementById('item').addEventListener('change', function() {
    const category = this.value;
    const menuItemsDropdown = document.getElementById('menuItems');
    menuItemsDropdown.innerHTML = '<option value="" disabled selected>Select an item</option>'; // Reset options

    if (category in menuItems) {
        menuItems[category].forEach(item => {
            const option = document.createElement('option');
            option.value = item.name; // The value you want to use for the selected item
            option.textContent = `${item.name} - ${item.price}`; // Display name and price
            menuItemsDropdown.appendChild(option);
        });
    }
});



// Handle order form submission
document.getElementById('order-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get selected item and quantity
    const selectedItem = document.getElementById('menuItems').value;
    const quantity = document.getElementById('quantity').value;
    const customerName = document.getElementById('name').value;

    // Display a confirmation message
    alert(`Your order for ${quantity} x ${selectedItem} has been placed successfully! Thank you, ${customerName}.`);

    // Optionally reset the form
    this.reset(); // Resets the form fields
});