import csv ,os,json
import boto3
from flask import Blueprint, render_template, request, redirect, url_for, flash, session ,jsonify
from flask_mysqldb import MySQL
from werkzeug.security import generate_password_hash, check_password_hash
routes = Blueprint('routes', __name__)

# Initialize MySQL
mysql = MySQL()

@routes.route('/')
def index():
    return render_template('base.html')

@routes.route('/add_product')
def add_product():
    return render_template('add/add_product.html')

@routes.route('/dashboard')
def dashboard():
    return render_template('welcome.html')

@routes.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM users WHERE email = %s", (email,))
        user = cur.fetchone()
        print(user)
        cur.close()
        if user and check_password_hash(user[3], password):  # Access the password using index 1
            session['Uemail'] = user[2]  # Access the email using index 0
            session['Uname'] = user[1]
            session['Uid'] = user[0]

            flash('Login successful!')
            return render_template('welcome.html')
        else:
            flash('Invalid credentials. Please try again.')
            return render_template('login.html')
    return render_template('login.html')


@routes.route('/add_user', methods=['GET', 'POST'])
def add_user():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        password = request.form['password']
        
        hashed_password = generate_password_hash(password)
        
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO users (username, email, password) VALUES (%s, %s, %s)", (name, email, hashed_password))
        mysql.connection.commit()
        cur.close()
        
        flash('User added successfully!', 'success')
        return redirect(url_for('routes.index'))
    
    return render_template('add_user.html')

@routes.route('/uploadFile', methods=['POST'])
def uploadFile():
    attachment_file = request.files.get("file_doc")
    if attachment_file is not None:
        filename = attachment_file.filename
        s3_object_key = f'instagram/{filename}'
        
        s3 = boto3.client('s3', aws_access_key_id=os.environ.get('S3_ACCESS_KEY'), aws_secret_access_key=os.environ.get('S3_SECRET_KEY'))
        try:
            s3.upload_fileobj(Fileobj=attachment_file,Bucket=os.environ.get('S3_BUCKET_NAME'),Key=s3_object_key)
            image_url=f'https://dl5hm3xr9o0pk.cloudfront.net/instagram/{filename}'
            print(f"Successfully uploaded {image_url} to {os.environ.get('S3_ACCESS_KEY')}/{s3_object_key}")
            s3.close()
            return jsonify({'filename': filename, 'file_base64': image_url})
        except FileNotFoundError:
            print(f"The file {image_url} was not found.")
            return jsonify(400)


@routes.route('/add_category', methods=['POST'])
def add_category():
    name = request.json.get('name')
    
    if not name:
        return jsonify({'error': 'Name is required'}), 400
    
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO category (name) VALUES (%s)", (name,))
    mysql.connection.commit()
    cur.close()
    
    return jsonify({'message': 'Category added successfully!'}), 201

@routes.route('/get_categories', methods=['GET'])
def get_categories():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM category")
    categories = cur.fetchall()
    cur.close()
    
    categories_list = [{'id': cat[0], 'name': cat[1]} for cat in categories]
    
    return jsonify(categories_list), 200

@routes.route('/create_product', methods=['POST'])
def create_product():
    try:
        # Get data from the request
        data = request.json
        img_icon = data.get('img_icon')
        product_name = data.get('product_name')
        product_price = data.get('product_price')
        product_category_id = data.get('product_category_id')
        product_desc = data.get('product_desc')
        custom_field = data.get('custom_field')

        # Validate inputs
        if not img_icon or img_icon == 'https://dl5hm3xr9o0pk.cloudfront.net/instagram/p-details-big.jpg':
            return jsonify({'status': 400, 'message': 'Product image is required'}), 400

        if not product_name or not product_price or not product_category_id or not product_desc:
            return jsonify({'status': 400, 'message': 'Please fill in all required fields'}), 400

        try:
            product_price = float(product_price)
            if product_price <= 0:
                return jsonify({'status': 400, 'message': 'Invalid product price'}), 400
        except ValueError:
            return jsonify({'status': 400, 'message': 'Invalid product price'}), 400

        if int(product_category_id) <= 0:
            return jsonify({'status': 400, 'message': 'Invalid category'}), 400

        # Convert custom fields to JSON string if not already
        custom_field_json = json.dumps(custom_field) if isinstance(custom_field, dict) else custom_field

        # Connect to the database
        cur = mysql.connection.cursor()

        
        # Insert product into the database
        cur.execute("""
            INSERT INTO product (name, price, icon_url, description, category_id, custom_fields)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (product_name, product_price, img_icon, product_desc, product_category_id, custom_field_json))
        
        mysql.connection.commit()
        cur.close()
        

        return jsonify({'status': 200, 'message': 'Product added successfully'}), 200

    except Exception as e:
        print(e)
        return jsonify({'status': 500, 'message': 'Internal Server Error'}), 500

@routes.route('/menudata',methods=['GET', 'POST'])
def get_data():
	if request.method == 'POST':
		data = []
		with open('Mydata.csv', mode='r') as file:
			reader = csv.reader(file)
			for row in reader:
				data.append(row)
		return jsonify(data)

@routes.route('/logout')
def logout():
    session.pop('Uemail', None)
    session.pop('Uname', None)
    session.pop('Uid', None)
    flash('You have been logged out.')
    return redirect(url_for('routes.login'))
