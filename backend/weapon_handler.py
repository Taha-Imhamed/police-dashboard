from database_connector import execute_query, query_database

def verify_weapon(serial_number, db):
    """Verifies if a weapon is registered or stolen."""
    query = "SELECT * FROM weapons_table WHERE serial_number = %s"
    result = query_database(query, (serial_number,), db)
    return result[0] if result else {"error": "Weapon not found"}

def register_weapon(serial_number, owner_id, db):
    """Registers a new weapon."""
    query = """
    INSERT INTO weapons_table (serial_number, owner_id, registered_at)
    VALUES (%s, %s, NOW())
    RETURNING id;
    """
    result = execute_query(query, (serial_number, owner_id), db)
    return {"message": "Weapon registered", "weapon_id": result[0]['id']}