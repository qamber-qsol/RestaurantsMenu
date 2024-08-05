import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    MYSQL_HOST = os.environ.get('MYSQL_HOST')
    MYSQL_USER = os.environ.get('MYSQL_USER')
    MYSQL_PASSWORD = os.environ.get('MYSQL_PASSWORD')
    MYSQL_DB = os.environ.get('MYSQL_DB')
    MYSQL_PORT = int(os.environ.get('MYSQL_PORT', 3306))  # Ensure the port is an integer

    # Print for debugging purposes (you can remove this later)
    print(f'SECRET_KEY: {SECRET_KEY}')
    print(f'MYSQL_HOST: {MYSQL_HOST}')
    print(f'MYSQL_USER: {MYSQL_USER}')
    print(f'MYSQL_PASSWORD: {MYSQL_PASSWORD}')
    print(f'MYSQL_DB: {MYSQL_DB}')
    print(f'MYSQL_PORT: {MYSQL_PORT}')
