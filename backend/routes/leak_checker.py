import hashlib
import requests
from flask import Blueprint, request, jsonify

leak_checker_bp = Blueprint("leak_checker", __name__)

# HIBP API prefix
HIBP_API_URL = "https://api.pwnedpasswords.com/range/"

@leak_checker_bp.route("/check-leak", methods=["POST"])
def check_leak():
    data = request.json
    password = data.get("password")

    if not password:
        return jsonify({"error": "Password is required"}), 400

    try:
        # Hash password (SHA1)
        sha1_hash = hashlib.sha1(password.encode("utf-8")).hexdigest().upper()
        prefix, suffix = sha1_hash[:5], sha1_hash[5:]

        # Call HaveIBeenPwned API
        response = requests.get(HIBP_API_URL + prefix, timeout=5)
        if response.status_code != 200:
            return jsonify({"error": "Error connecting to leak checker API"}), 500

        # Parse response
        hashes = response.text.splitlines()
        for line in hashes:
            h, count = line.split(":")
            if h == suffix:
                return jsonify({"found": True, "count": int(count)})

        return jsonify({"found": False})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
