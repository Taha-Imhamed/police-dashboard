from database_connector import execute_query, query_database

def get_live_feed(camera_id, db):
    """Fetches the live feed URL for a specific camera."""
    query = "SELECT feed_url FROM cctv_logs WHERE camera_id = %s"
    result = query_database(query, (camera_id,), db)
    return result[0]['feed_url'] if result else None

def control_camera(camera_id, action, db):
    """Controls the camera (e.g., zoom, angle)."""
    query = "UPDATE cctv_logs SET action = %s WHERE camera_id = %s"
    execute_query(query, (action, camera_id), db)
    return {"message": f"Camera {camera_id} {action} completed."}

def log_video(incident_id, video_url, db):
    """Logs important video footage for investigations."""
    query = """
    INSERT INTO cctv_logs (incident_id, video_url, timestamp)
    VALUES (%s, %s, NOW())
    """
    execute_query(query, (incident_id, video_url), db)
    return {"message": "Video logged successfully."}