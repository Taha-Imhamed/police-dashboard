from database_connector import execute_query, query_database

def create_case(case_data, db):
    """Creates a new case in the database."""
    query = """
    INSERT INTO cases_table (title, description, officer_id, status)
    VALUES (%s, %s, %s, %s)
    RETURNING id;
    """
    params = (
        case_data.get('title'),
        case_data.get('description'),
        case_data.get('officer_id'),
        'open'  # Default status
    )
    result = execute_query(query, params, db)
    return result[0]['id']

def get_case(case_id, db):
    """Retrieves a case by its ID."""
    query = "SELECT * FROM cases_table WHERE id = %s"
    return query_database(query, (case_id,), db)

def update_case(case_id, data, db):
    """Updates an existing case."""
    query = """
    UPDATE cases_table
    SET title = %s, description = %s, status = %s
    WHERE id = %s
    """
    params = (
        data.get('title'),
        data.get('description'),
        data.get('status'),
        case_id
    )
    return execute_query(query, params, db)