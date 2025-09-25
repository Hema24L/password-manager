from flask import Blueprint, request, jsonify
from db import passwords_collection

retrieve_bp = Blueprint('retrieve', __name__)

@retrieve_bp.route('/api/get-password', methods=['GET'])
@retrieve_bp.route('/api/get-password/<username>', methods=['GET'])
def get_password(username=None):
    if not username:
        username = request.args.get("username")

    if not username:
        return jsonify({"error": "Username is required"}), 400

    record = passwords_collection.find_one({"username": username})
    if not record:
        return jsonify({"error": "No password found for this username"}), 404

    return jsonify({
        "username": record["username"],
        "password": record["password"]
    })
