# Author: Shubham Sharma
# Email: sharma.shubham6522@gmail.com
# Description: Handles calculations related to tax and shipping for an e-commerce platform.

def calculate_tax(subtotal):
    """
    Calculates the tax amount based on a given subtotal.

    Parameters:
    subtotal (float): The total amount before tax to calculate the tax upon.

    Returns:
    float: The tax amount calculated at a fixed rate of 5%.
    """
    tax_rate = 0.05  # Tax rate is set at 5%.
    return subtotal * tax_rate

def calculate_shipping(subtotal):
    """
    Determines the shipping cost, which is fixed and independent of the subtotal.

    Parameters:
    subtotal (float): The total amount before tax, used to determine eligibility for free shipping (not implemented here).

    Returns:
    float: The shipping cost, currently fixed at $15.
    """
    shipping_cost = 15  # Fixed shipping cost.
    return shipping_cost

def calculate_subtotal(cart):
    """
    Calculates the subtotal of all items in a shopping cart.

    Parameters:
    cart (list of dict): A list of dictionaries where each dictionary represents an item in the cart.
                         Each item should have 'price' and 'quantity' as keys.

    Returns:
    float: The total price for all items in the cart calculated as the sum of price multiplied by quantity.
    """
    subtotal = 0
    for item in cart:
        price = float(item['price'])
        quantity = int(item['quantity'])
        subtotal += price * quantity
    return subtotal