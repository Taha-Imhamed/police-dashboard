from database_connector import execute_query, query_database

def update_gps_location(vehicle_id, latitude, longitude, db):
    """Updates the GPS location of a vehicle or officer."""
    query = """
    UPDATE vehicles_table
    SET latitude = %s, longitude = %s, updated_at = NOW()
    WHERE id = %s
    """
    execute_query(query, (latitude, longitude, vehicle_id), db)
    return {"message": "GPS location updated."}

def get_vehicle_location(vehicle_id, db):
    """Retrieves the current GPS location of a vehicle."""
    query = "SELECT latitude, longitude FROM vehicles_table WHERE id = %s"
    result = query_database(query, (vehicle_id,), db)
    return result[0] if result else {"error": "Vehicle not found"}