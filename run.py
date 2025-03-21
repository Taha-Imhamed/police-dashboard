import os
from dotenv import load_dotenv



# Load environment variables from .env file
load_dotenv()

def initialize_database():
    """Connect to the database and ensure tables are created."""
    db = connect_to_database()
    if not db:
        print("Failed to connect to the database. Exiting...")
        return False

    # Optionally, you can run migrations or check table existence here
    print("Database connection successful.")
    return True

def main():
    """Main function to start the application."""
    print("Starting Police Station Dashboard...")

    # Step 1: Initialize the database
    if not initialize_database():
        return

    # Step 2: Start the Flask/Django server
    try:
        print("Starting the backend server...")
        app.run(
            host=os.getenv("FLASK_HOST", "0.0.0.0"),  # Default to all interfaces
            port=int(os.getenv("FLASK_PORT", 5000)),  # Default to port 5000
            debug=os.getenv("FLASK_DEBUG", "True").lower() == "true"  # Enable debug mode
        )
    except Exception as e:
        print(f"An error occurred while starting the server: {e}")

if __name__ == "__main__":
    main()