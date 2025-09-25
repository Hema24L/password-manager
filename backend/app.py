from flask import Flask
from flask_cors import CORS
from routes.auth import auth_bp
from routes.passwords import passwords_bp
from routes.generate_save import generate_save_bp
from routes.retrieve import retrieve_bp
from routes.update import update_bp
from routes.delete import delete_bp

app = Flask(__name__, static_folder="../frontend/build", static_url_path="/")
CORS(app)

# Register Blueprints
app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(passwords_bp, url_prefix="/api")
app.register_blueprint(generate_save_bp)
app.register_blueprint(retrieve_bp)
app.register_blueprint(update_bp)
app.register_blueprint(delete_bp)

# Serve React frontend
@app.route('/')
def index():
    return app.send_static_file('index.html')

if __name__ == "__main__":
    app.run(debug=True)
