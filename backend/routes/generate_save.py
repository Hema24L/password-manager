from flask import Blueprint, request, jsonify
import random, string
import hashlib
import requests
from db import passwords_collection

generate_save_bp = Blueprint('generate_save', __name__)

# --- Generate password ---
@generate_save_bp.route('/api/generate-password', methods=['POST'])
def generate_password():
    data = request.json
    length = data.get("length", 12)
    use_upper = data.get("use_upper", True)
    use_numbers = data.get("use_numbers", True)
    use_symbols = data.get("use_symbols", True)

    characters = string.ascii_lowercase
    if use_upper:
        characters += string.ascii_uppercase
    if use_numbers:
        characters += string.digits
    if use_symbols:
        characters += string.punctuation

    password = ''.join(random.choice(characters) for _ in range(length))
    return jsonify({"password": password})

# Check password leak API
# -----------------------
@generate_save_bp.route("/api/check-leak", methods=["POST"])
def check_leak():
    data = request.json
    password = data.get("password")
    if not password:
        return jsonify({"error": "Password is required"}), 400

    # k-anonymity using HIBP API
    sha1 = hashlib.sha1(password.encode("utf-8")).hexdigest().upper()
    prefix, suffix = sha1[:5], sha1[5:]
    url = f"https://api.pwnedpasswords.com/range/{prefix}"

    try:
        res = requests.get(url)
        if res.status_code != 200:
            return jsonify({"error": "Error connecting to leak checker API"}), 500

        found = any(suf.split(":")[0] == suffix for suf in res.text.splitlines())
        return jsonify({"leaked": found})
    except Exception:
        return jsonify({"error": "Server error"}), 500

# --- Save password ---
@generate_save_bp.route('/api/save-password', methods=['POST'])
def save_password():
    data = request.json
    site = data.get("site")
    username = data.get("username")
    password = data.get("password")
    owner = data.get("owner")  # owner passed from frontend

    if not (site and username and password and owner):
        return jsonify({"error": "Missing fields"}), 400

    passwords_collection.insert_one({
        "site": site,
        "username": username,
        "password": password,
        "owner": owner
    })
    return jsonify({"message": "Password saved successfully!"})

