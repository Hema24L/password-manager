from flask import Blueprint, request, jsonify
from db import passwords_collection

update_bp = Blueprint('update', __name__)

@update_bp.route('/api/update-password', methods=['PUT'])
def update_password():
    data = request.json
    username = data.get("username")
    new_password = data.get("password")

    if not username or not new_password:
        return jsonify({"error": "Username and new password required"}), 400

    result = passwords_collection.update_one(
        {"username": username},
        {"$set": {"password": new_password}}
    )

    if result.matched_count == 0:
        return jsonify({"error": "No such username found"}), 404

    return jsonify({"message": "Password updated successfully!"})
