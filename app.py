
from flask import Flask
from flask import Blueprint , render_template, redirect, url_for, request, session, jsonify
import csv
app = Flask(__name__)


@app.route('/')
def hello_world():
	return render_template('base.html')

@app.route('/menudata',methods=['GET', 'POST'])
def get_data():
	if request.method == 'POST':
		data = []
		with open('Mydata.csv', mode='r') as file:
			reader = csv.reader(file)
			for row in reader:
				data.append(row)
		return jsonify(data)

# main driver function
if __name__ == '__main__':


	app.run(debug=False, host="0.0.0.0")


