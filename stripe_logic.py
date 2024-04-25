import stripe
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Retrieve Stripe keys from the environment file for security
stripe_public_key = os.getenv('STRIPE_PUBLIC_KEY')
stripe_secret_key = os.getenv('STRIPE_SECRET_KEY')
success_url = os.getenv('SUCCESS_URL')
cancel_url = os.getenv('CANCEL_URL')

stripe.api_key = stripe_secret_key

# Define lineItems list globally to manage cart items for checkout
lineItems = []

def handle_checkout(cart_items):
    """
    Processes each item in the cart to prepare for Stripe checkout.

    Parameters:
    cart_items (list of dict): List containing dictionaries with cart item details.

    Side Effects:
    Modifies the global lineItems list by clearing and updating it with new cart items.
    """
    global lineItems  # Access the global lineItems list

    # Clear lineItems list before adding new items
    lineItems.clear()

    # Loop through each cart item and add it to lineItems
    for item in cart_items:
        lineItems.append({
            'price': item['stripeUrl'],  # Assuming 'stripeUrl' contains the Stripe price ID
            'quantity': item['quantity']
        })

    # Optionally print the updated lineItems list
    print("Updated lineItems:", lineItems)

def create_checkout_session():
    """
    Creates a Stripe checkout session with the specified line items.

    Returns:
    stripe.Session: The checkout session object from Stripe API.

    Raises:
    ValueError: If no line items are present when attempting to create a checkout session.
    """
    global lineItems  # Access the global lineItems list

    if not lineItems:
        raise ValueError("No line items found. Please ensure cart items are added.")

    # Create a checkout session using the Stripe API
    session = stripe.checkout.Session.create(
        payment_method_types=['card'],
        line_items=lineItems,
        mode='payment',
        success_url=success_url + '/thanks?session_id={CHECKOUT_SESSION_ID}',
        cancel_url=cancel_url,
    )
    return session
