from flask import Flask, render_template, session, redirect,request,url_for,jsonify,flash
from functools import wraps
import pymongo
from stripe_logic import create_checkout_session, stripe_public_key
from stripe_logic import handle_checkout



app = Flask(__name__)
app.secret_key = 'your secret key'



# Database
client = pymongo.MongoClient('localhost', 27017)
db = client.food_website
collection = db.food_items

# Decorators
def login_required(f):
  @wraps(f)
  def wrap(*args, **kwargs):
    if 'logged_in' in session:
      return f(*args, **kwargs)
    else:
      flash("You are not logged in!", 'error')
    return redirect('/signin')
  
  return wrap


# Routes
from user import routes

@app.route('/')
@app.route('/home')
def index():
  return render_template('index.html')

@app.route('/blog')
def blog():
  return render_template('blog.html')

@app.route('/menu')
def menu():
    # Retrieve food items from the database
    food_items = collection.find()
    return render_template('menu.html', food_items=food_items)
  
@app.route('/add_food_item', methods=['GET', 'POST'])
@login_required
def add_food_item():
    if request.method == 'POST':
        name = request.form.get('name')
        price = request.form.get('price')
        description = request.form.get('description')
        image_url = request.form.get('image_url')
        stripe_url = request.form.get('stripe_url')
        
        # Insert the new food item into the collection
        food_item = {
            'name': name,
            'price': price,
            'description': description,
            'image_url': image_url,
            'stripe_url': stripe_url
        }
        collection.insert_one(food_item)
        
        flash('Food item added successfully!', 'success')
        
        # Redirect back to the menu page
        return redirect('/menu')
    else:
        return render_template('dashboard.html')
      
@app.route('/checkout', methods=['POST'])
@login_required
def checkout():
    data = request.json  # Get the JSON data sent from JavaScript
    cart_items = data.get('cartItems')
    
    print("Received cart items from JavaScript:", cart_items)
    
    # Pass cart_items to stripe_logic.py to handle checkout
    handle_checkout(cart_items)
    
    # Create a checkout session using the populated lineItems list
    session = create_checkout_session()
    
    # For now, let's just return a success message
    return jsonify({"message": "Checkout successful"}), 200


@app.route('/stripe_pay')
def stripe_pay():
    session = create_checkout_session()
    return {
        'checkout_session_id': session['id'], 
        'checkout_public_key': stripe_public_key
    }
    
@app.route('/thanks')
def thanks():
    return render_template('thanks.html')   
      
@app.route('/cart')
@login_required
def cart():
    return render_template('cart.html')


@app.route('/signin')
def signin():
  return render_template('login.html')

@app.route('/register')
def register():
  return render_template('register.html')

@app.route('/dashboard/')
@login_required
def dashboard():
  return render_template('dashboard.html')

if __name__ == '__main__':
  app.run(debug=True)