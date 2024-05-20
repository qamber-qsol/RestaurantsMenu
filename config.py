from flask import Flask
from flask_mysqldb import MySQL

barbapp = Flask(__name__)
barbapp.config['SECRET_KEY'] = 'Alkeymy'

mysql = MySQL(barbapp)

barbapp.config['MYSQL_HOST'] = '192.168.10.4'
barbapp.config['MYSQL_USER'] = 'admin'  
barbapp.config['MYSQL_PASSWORD'] = 'Admin!123'
barbapp.config['MYSQL_DB'] = 'smm_test'
barbapp.config['MYSQL_PORT'] = 3307
