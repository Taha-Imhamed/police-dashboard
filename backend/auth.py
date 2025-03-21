import hashlib
from database_connector import query_database

SECRET_KEY = "supersecretkey"

def hash_password(password):
    """Hashes the password using SHA-256."""
    return hashlib.sha256((password + SECRET_KEY).encode()).hexdigest()

def authenticate_user(username, password):
    """Authenticates the user and returns a token and role if valid."""
    hashed_password = hash_password(password)
    query = "SELECT id, role FROM users_table WHERE username = %s AND password_hash = %s"
    result = query_database(query, (username, hashed_password))
    if result:
        user_id, role = result[0]['id'], result[0]['role']
        # Generate a simple token (use JWT or OAuth in production)
        token = f"auth_token_{user_id}"
        return {"token": token, "role": role}
    return None