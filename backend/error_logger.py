from database_connector import execute_query

def log_error(error_message, module_name, db):
    """Logs an error into the error_logs table."""
    query = """
    INSERT INTO error_logs (module_name, error_message, timestamp)
    VALUES (%s, %s, NOW())
    """
    execute_query(query, (module_name, error_message), db)
    return {"message": "Error logged successfully."}

def get_recent_errors(limit=10, db):
    """Fetches the most recent errors."""
    query = "SELECT * FROM error_logs ORDER BY timestamp DESC LIMIT %s"
    result = query_database(query, (limit,), db)
    return result