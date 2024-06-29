from flask import Blueprint, render_template, request, redirect, url_for, flash
from flask_mysqldb import MySQL

routes = Blueprint('routes', __name__)

# Initialize MySQL
mysql = MySQL()

@routes.route('/')
def index():
    return render_template('index.html')

@routes.route('/add_item', methods=['POST'])
def add_item():
    if request.method == 'POST':
        name = request.form['name']
        description = request.form['description']
        price = request.form['price']
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO menu_items (name, description, price) VALUES (%s, %s, %s)", (name, description, price))
        mysql.connection.commit()
        cur.close()
        flash('Item added successfully!')
        return redirect(url_for('routes.index'))

@routes.route('/menu')
def menu():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM menu_items")
    items = cur.fetchall()
    cur.close()
    return render_template('menu.html', items=items)

@routes.route('/menudata',methods=['GET', 'POST'])
def get_data():
	if request.method == 'POST':
		data = []
		with open('Mydata.csv', mode='r') as file:
			reader = csv.reader(file)
			for row in reader:
				data.append(row)
		return jsonify(data)
