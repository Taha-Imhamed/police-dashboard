from database_connector import execute_query, query_database

def assign_task(task_data, db):
    """Assigns a new task to an officer."""
    query = """
    INSERT INTO dispatch_table (officer_id, task_description, status)
    VALUES (%s, %s, %s)
    RETURNING id;
    """
    params = (
        task_data.get('officer_id'),
        task_data.get('task_description'),
        'pending'  # Default status
    )
    result = execute_query(query, params, db)
    return result[0]['id']

def track_task(task_id, db):
    """Tracks the status of a task."""
    query = "SELECT status FROM dispatch_table WHERE id = %s"
    result = query_database(query, (task_id,), db)
    return result[0]['status'] if result else "unknown"