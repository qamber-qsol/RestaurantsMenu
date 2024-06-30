import csv 
from flask import Blueprint, render_template, request, redirect, url_for, flash, session ,jsonify
from flask_mysqldb import MySQL
from werkzeug.security import generate_password_hash, check_password_hash
routes = Blueprint('routes', __name__)

# Initialize MySQL
mysql = MySQL()

@routes.route('/')
def index():
    return render_template('base.html')

@routes.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM users WHERE username = %s", (username,))
        user = cur.fetchone()
        cur.close()
        if user and check_password_hash(user['password'], password):
            session['username'] = user['username']
            flash('Login successful!')
            return redirect(url_for('routes.index'))
        else:
            flash('Invalid credentials, please try again.')
    return render_template('login.html')


@routes.route('/add_user', methods=['GET', 'POST'])
def add_user():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        password = request.form['password']
        
        hashed_password = generate_password_hash(password)
        
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO users (name, email, password) VALUES (%s, %s, %s)", (name, email, hashed_password))
        mysql.connection.commit()
        cur.close()
        
        flash('User added successfully!', 'success')
        return redirect(url_for('routes.index'))
    
    return render_template('add_user.html')


@routes.route('/menudata',methods=['GET', 'POST'])
def get_data():
	if request.method == 'POST':
		data = []
		with open('Mydata.csv', mode='r') as file:
			reader = csv.reader(file)
			for row in reader:
				data.append(row)
		return jsonify(data)
