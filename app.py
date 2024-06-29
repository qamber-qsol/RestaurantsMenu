from flask import Flask
from config import Config
from routes import routes


	
def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Initialize MySQL
    from flask_mysqldb import MySQL
    mysql = MySQL(app)

    # Register blueprints
    app.register_blueprint(routes)

    return app

# @app.route('/')
# def hello_world():
# 	return render_template('base.html')

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
