from database_connector import execute_query, query_database

def assign_gear(officer_id, gear_type, db):
    """Assigns gear to an officer."""
    query = """
    INSERT INTO inventory_table (officer_id, gear_type, status, issued_at)
    VALUES (%s, %s, 'assigned', NOW())
    RETURNING id;
    """
    result = execute_query(query, (officer_id, gear_type), db)
    return {"message": "Gear assigned", "gear_id": result[0]['id']}

def return_gear(gear_id, db):
    """Marks gear as returned."""
    query = """
    UPDATE inventory_table
    SET status = 'returned', returned_at = NOW()
    WHERE id = %s
    """
    execute_query(query, (gear_id,), db)
    return {"message": "Gear returned successfully."}

def check_inventory_status(db):
    """Checks the current inventory status."""
    query = "SELECT * FROM inventory_table WHERE status = 'assigned'"
    return query_database(query, (), db)