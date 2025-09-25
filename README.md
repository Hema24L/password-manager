# password-manager
# Password Manager with Leak Checker

A full-stack **Password Manager** built with **React (frontend)** and **Flask + MongoDB (backend)**. Integrated with a **password leak checker** using the [Have I Been Pwned API](https://haveibeenpwned.com/API/v3).

Users can **sign up, log in**, generate strong passwords, save credentials for multiple sites, retrieve, update, and delete passwords. The app also alerts if a generated password has been **previously leaked**.

---

## Features

### ✅ User Authentication
- Sign up.
- Login to access password management features.
- Only logged-in users can perform CRUD operations.

### ✅ Password Management
- Generate passwords with options:
  - Length (1–64)
  - Include uppercase letters
  - Include numbers
  - Include symbols
- Save credentials (`site`, `username`, and generated password) linked to the User.
- Retrieve, update, and delete saved passwords.
- See all saved passwords for the logged-in user.

### ✅ Leak Checker
- Automatically checks if a generated password has been **exposed in data breaches**.
- Uses **k-anonymity** via the Have I Been Pwned API.
- Shows alerts for **leaked** or **safe** passwords.

---

## Tech Stack

- **Frontend:** React, React Router DOM, CSS
- **Backend:** Python Flask, Flask-CORS
- **Database:** MongoDB
- **API:** Have I Been Pwned for password leak checking

---

## Backend

1.Installing dependencies:

  `pip install flask flask-cors pymongo requests`

2. Set up MongoDB and update `db.py` with your connection URI.
3. Run the Backend
   `python app.py`

---

## Frontend

1. Navigate to frontend folder
2. install dependencies:

   `npm install`

3. start development server
 
   `npm start`

4. for production

    `npm run build`

   - copy the build folder to backend directory if serving via flask
 
--- 
## Security Notes

- Owner passwords are hashed before storage.
- Site passwords are currently stored in plaintext for simplicity. Encrypt before production deployment.
- Leak checker helps prevent compromised or reused passwords.
