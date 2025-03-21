from database_connector import execute_query, query_database

def get_vehicle_details(plate_number, db):
    """Retrieves vehicle details by plate number."""
    query = "SELECT * FROM vehicles_table WHERE plate_number = %s"
    result = query_database(query, (plate_number,), db)
    return result[0] if result else {"error": "Vehicle not found"}

def flag_vehicle_as_stolen(plate_number, db):
    """Flags a vehicle as stolen."""
    query = """
    UPDATE vehicles_table
    SET status = 'stolen', flagged_at = NOW()
    WHERE plate_number = %s
    """
    execute_query(query, (plate_number,), db)
    return {"message": "Vehicle flagged as stolen."}