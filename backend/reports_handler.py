from database_connector import execute_query, query_database

def upload_report(case_id, report_data, db):
    """Uploads a report for a case."""
    query = """
    INSERT INTO reports_table (case_id, report_data, uploaded_at)
    VALUES (%s, %s, NOW())
    RETURNING id;
    """
    result = execute_query(query, (case_id, report_data), db)
    return {"message": "Report uploaded", "report_id": result[0]['id']}

def fetch_report(report_id, db):
    """Fetches a specific report."""
    query = "SELECT * FROM reports_table WHERE id = %s"
    result = query_database(query, (report_id,), db)
    return result[0] if result else {"error": "Report not found"}