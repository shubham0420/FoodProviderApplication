const button = document.querySelector('#buy_now_btn');

button.addEventListener('click', event => {
    fetch('/stripe_pay')
    .then((result) => { return result.json(); })
    .then((data) => {
        var stripe = Stripe(data.checkout_public_key);
        stripe.redirectToCheckout({
            // Make the id field from the Checkout Session creation API response
            // available to this file, so you can provide it as parameter here
            // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
            sessionId: data.checkout_session_id
        }).then(function (result) {
            // If `redirectToCheckout` fails due to a browser or network
            // error, display the localized error message to your customer
            // using `result.error.message`.
        });
    })
});

function checkout() {
    // Retrieve cart items from local storage
    let cartItems = JSON.parse(localStorage.getItem("cartItems"));
  
    // Validate if the cart is not empty
    if (!cartItems || cartItems.length === 0) {
      console.error('Cart is empty');
      return;
    }
  
    // Send cart data to Flask backend
    sendDataToFlask(cartItems);
  }

  
function sendDataToFlask(cartItems) {
    // Make an AJAX request to your Flask route
    $.ajax({
      url: "/checkout",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({cartItems: cartItems}),
      success: function(response) {
        console.log("Cart data sent successfully to Flask:", response);
        // Optionally, you can clear the cart in local storage after successful checkout
        localStorage.removeItem("cartItems");
      },
      error: function(xhr, status, error) {
        console.error("Error sending cart data to Flask:", error);
      }
    });
  }