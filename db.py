import psycopg2

def get_connection():
    conn = psycopg2.connect(
        host="localhost",
        database="healthcare_db",
        user="postgres",
        password="admin",
        port="5432"
    )
    return conn
