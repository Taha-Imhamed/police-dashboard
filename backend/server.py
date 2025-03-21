from flask import Flask, request, jsonify
from auth import authenticate_user
from case_handler import create_case, get_case, update_case
from dispatch_handler import assign_task, track_task
from database_connector import connect_to_database

app = Flask(__name__)

# Initialize database connection
db = connect_to_database()

@app.route('/')
def home():
    return "Welcome to the Police Station Dashboard API!"

# Authentication Endpoint
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    token = authenticate_user(username, password)
    if token:
        return jsonify({"message": "Login successful", "token": token}), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401

# Case Management Endpoints
@app.route('/cases', methods=['POST'])
def add_case():
    data = request.json
    case_id = create_case(data, db)
    return jsonify({"message": "Case created", "case_id": case_id}), 201

@app.route('/cases/<case_id>', methods=['GET'])
def fetch_case(case_id):
    case = get_case(case_id, db)
    if case:
        return jsonify(case), 200
    else:
        return jsonify({"error": "Case not found"}), 404

@app.route('/cases/<case_id>', methods=['PUT'])
def modify_case(case_id):
    data = request.json
    success = update_case(case_id, data, db)
    if success:
        return jsonify({"message": "Case updated"}), 200
    else:
        return jsonify({"error": "Failed to update case"}), 400

# Dispatch Management Endpoints
@app.route('/dispatch', methods=['POST'])
def assign_dispatch_task():
    data = request.json
    task_id = assign_task(data, db)
    return jsonify({"message": "Task assigned", "task_id": task_id}), 201

@app.route('/dispatch/<task_id>', methods=['GET'])
def track_dispatch_task(task_id):
    status = track_task(task_id, db)
    return jsonify({"status": status}), 200

if __name__ == '__main__':
    app.run(debug=True)