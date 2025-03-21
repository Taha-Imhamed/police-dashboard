from database_connector import execute_query, query_database

def get_citizen_record(identifier, db):
    """Retrieves citizen details by name or ID."""
    query = "SELECT * FROM citizens_table WHERE name = %s OR id = %s"
    result = query_database(query, (identifier, identifier), db)
    return result[0] if result else {"error": "Citizen not found"}

def update_criminal_record(citizen_id, record_data, db):
    """Updates criminal records for a citizen."""
    query = """
    UPDATE citizens_table
    SET criminal_record = %s, last_updated = NOW()
    WHERE id = %s
    """
    execute_query(query, (record_data, citizen_id), db)
    return {"message": "Criminal record updated."}

def register_new_citizen(citizen_data, db):
    """Registers a new citizen in the database."""
    query = """
    INSERT INTO citizens_table (name, dob, address, criminal_record)
    VALUES (%s, %s, %s, %s)
    RETURNING id;
    """
    params = (
        citizen_data.get('name'),
        citizen_data.get('dob'),
        citizen_data.get('address'),
        citizen_data.get('criminal_record', 'none')
    )
    result = execute_query(query, params, db)
    return {"message": "Citizen registered", "citizen_id": result[0]['id']}