function addToCart(itemId, itemName, itemPrice, imageUrl, stripeUrl) {
    // Validate inputs
    if (!itemId || !itemName || !itemPrice || !imageUrl || !stripeUrl) {
      console.error('Missing required input for addToCart function');
      return;
    }
  
    // Retrieve existing cart items from local storage or initialize an empty array
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  
    // Check if the item is already in the cart
    const existingItemIndex = cartItems.findIndex((item) => item.id === itemId);
  
    if (existingItemIndex !== -1) {
      // Update existing item if found
      cartItems[existingItemIndex].quantity += 1;
      swal("Added Again!", "view your food on cart!", "success");
      // You might want to update other properties of the existing item here
    } else {
      // Add the item to the cart
      cartItems.push({
        id: itemId,
        name: itemName,
        price: itemPrice,
        quantity: 1,
        image: imageUrl,
        stripeUrl: stripeUrl
      });
      swal("Added To Cart!", "view your food on cart!", "success");
    }

    
  
    // Store the updated cart items back to local storage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  
    // Provide feedback to the user if needed
    console.log('Item added to cart:', itemName);
  }
  

// Function to render cart items
function renderCartItems() {
    // Retrieve cart items from local storage
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';

    let subtotal = 0;
    cartItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('box');

        itemElement.innerHTML = `
            <img src="${item.image}">
            <div class="content">
                <h3>${item.name}</h3>
                <h4>Price: ₹${item.price}</h4>
                <p class="unit">Quantity: <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity('${item.id}', this.value)"></p>
                <p class="btn-area"><i aria-hidden="true" class="fa fa-trash" onclick="removeFromCart('${item.id}')"></i> <span class="btn2">Remove</span></p>
            </div>
        `;
        cartContainer.appendChild(itemElement);
        subtotal += item.price * item.quantity;
    });

    // Calculate totals
    const tax = subtotal * 0;
    const shipping = 0; // Example shipping cost
    const total = subtotal + tax + shipping;

    // Update totals in HTML
    document.getElementById('subtotal').textContent = `₹${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `₹${tax.toFixed(2)}`;
    document.getElementById('shipping').textContent = `₹${shipping.toFixed(2)}`;
    document.getElementById('total').textContent = `₹${total.toFixed(2)}`;
}

// Function to update quantity of an item in the cart
function updateQuantity(itemId, newQuantity) {
    // Retrieve existing cart items from local storage or initialize an empty array
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Find the index of the item to be updated
    const itemIndex = cartItems.findIndex((item) => item.id === itemId);

    if (itemIndex !== -1) {
        // Update the quantity of the item
        cartItems[itemIndex].quantity = parseInt(newQuantity);

        // Ensure quantity is at least 1
        if (cartItems[itemIndex].quantity < 1) {
            cartItems[itemIndex].quantity = 1;
        }

        // Store the updated cart items back to local storage
        localStorage.setItem("cartItems", JSON.stringify(cartItems));

        // Re-render the cart items with updated quantity
        renderCartItems();
    }
}

// Function to remove an item from the cart
function removeFromCart(itemId) {
    // Retrieve existing cart items from local storage or initialize an empty array
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Find the index of the item to be removed
    const itemIndex = cartItems.findIndex((item) => item.id === itemId);

    if (itemIndex !== -1) {
        // Remove the item from the cart
        cartItems.splice(itemIndex, 1);

        // Store the updated cart items back to local storage
        localStorage.setItem("cartItems", JSON.stringify(cartItems));

        // Re-render the cart items after removal
        renderCartItems();
    }
}

// Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
    // Initial rendering of cart items
    renderCartItems();
});







  