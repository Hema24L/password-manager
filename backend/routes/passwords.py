from flask import Blueprint, request, jsonify
from db import passwords_collection

passwords_bp = Blueprint("passwords", __name__)

# Save site credentials
@passwords_bp.route("/passwords/save", methods=["POST"])
def save_password():
    data = request.json
    owner = data.get("owner")
    site = data.get("site")
    username = data.get("username")
    password = data.get("password")

    if not all([owner, site, username, password]):
        return jsonify({"error": "Missing required fields"}), 400

    passwords_collection.insert_one({
        "owner": owner,
        "site": site,
        "username": username,
        "password": password
    })

    return jsonify({"message": "Password saved successfully"}), 201


# Retrieve passwords for an owner
@passwords_bp.route("/passwords/<owner>", methods=["GET"])
def get_passwords(owner):
    records = list(passwords_collection.find({"owner": owner}, {"_id": 0}))
    return jsonify(records)


# Update a saved password
@passwords_bp.route("/passwords/update", methods=["PUT"])
def update_password():
    data = request.json
    owner = data.get("owner")
    site = data.get("site")
    new_password = data.get("password")

    result = passwords_collection.update_one(
        {"owner": owner, "site": site},
        {"$set": {"password": new_password}}
    )

    if result.modified_count == 0:
        return jsonify({"error": "No record updated"}), 404

    return jsonify({"message": "Password updated successfully"})


# Delete a password
@passwords_bp.route("/passwords/delete", methods=["DELETE"])
def delete_password():
    data = request.json
    owner = data.get("owner")
    site = data.get("site")

    result = passwords_collection.delete_one({"owner": owner, "site": site})

    if result.deleted_count == 0:
        return jsonify({"error": "No record found"}), 404

    return jsonify({"message": "Password deleted successfully"})

# Get all passwords for the logged-in owner
@passwords_bp.route("/passwords/owner/<owner>", methods=["GET"])
def get_owner_passwords(owner):
    records = list(passwords_collection.find({"owner": owner}, {"_id": 0}))
    return jsonify(records)
