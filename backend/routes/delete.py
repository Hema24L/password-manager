from flask import Blueprint, request, jsonify
from db import passwords_collection

delete_bp = Blueprint('delete', __name__)

@delete_bp.route('/api/delete-password/<username>', methods=['DELETE'])
def delete_password(username):
    if not username:
        return jsonify({"error": "Username required"}), 400

    result = passwords_collection.delete_one({"username": username})

    if result.deleted_count == 0:
        return jsonify({"error": "No such username found"}), 404

    return jsonify({"message": "Password deleted successfully!"})
