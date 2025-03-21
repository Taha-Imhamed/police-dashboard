import psycopg2  # Replace with your database driver (e.g., mysql.connector)

def connect_to_database():
    """Connects to the PostgreSQL database."""
    try:
        connection = psycopg2.connect(
            dbname="police_dashboard",
            user="admin",
            password="password",
            host="localhost",
            port="5432"
        )
        return connection
    except Exception as e:
        print(f"Database connection error: {e}")
        return None

def execute_query(query, params, db):
    """Executes a query that modifies the database."""
    cursor = db.cursor()
    cursor.execute(query, params)
    db.commit()
    result = cursor.fetchall() if cursor.rowcount > 0 else []
    cursor.close()
    return result

def query_database(query, params, db):
    """Executes a SELECT query and returns results."""
    cursor = db.cursor()
    cursor.execute(query, params)
    result = cursor.fetchall()
    cursor.close()
    return result