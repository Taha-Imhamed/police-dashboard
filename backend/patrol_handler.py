from database_connector import execute_query, query_database

def create_patrol_unit(unit_name, db):
    """Creates a new patrol unit."""
    query = """
    INSERT INTO patrol_units (unit_name, created_at)
    VALUES (%s, NOW())
    RETURNING id;
    """
    result = execute_query(query, (unit_name,), db)
    return {"message": "Patrol unit created", "unit_id": result[0]['id']}

def assign_officer_to_unit(unit_id, officer_id, db):
    """Assigns an officer to a patrol unit."""
    query = """
    INSERT INTO patrol_units (unit_id, officer_id, assigned_at)
    VALUES (%s, %s, NOW())
    """
    execute_query(query, (unit_id, officer_id), db)
    return {"message": "Officer assigned to patrol unit."}

def get_patrol_status(unit_id, db):
    """Fetches the status of a patrol unit."""
    query = "SELECT * FROM patrol_units WHERE unit_id = %s"
    return query_database(query, (unit_id,), db)