from flask import Flask, render_template, request, redirect, url_for
import sqlite3
import hashlib

app = Flask(__name__)

# create database
def create_db():
    conn = sqlite3.connect("users.db")
    cur = conn.cursor()
    cur.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            password TEXT
        )
    """)
    conn.commit()
    conn.close()

create_db()

# hash password
def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

@app.route("/")
def login():
    return render_template("login.html")

@app.route("/register")
def register():
    return render_template("register.html")

@app.route("/register_user", methods=["POST"])
def register_user():
    username = request.form["username"]
    password = hash_password(request.form["password"])

    conn = sqlite3.connect("users.db")
    cur = conn.cursor()
    cur.execute("INSERT INTO users (username, password) VALUES (?,?)",
                (username, password))
    conn.commit()
    conn.close()

    return redirect(url_for("login"))

@app.route("/login_user", methods=["POST"])
def login_user():
    username = request.form["username"]
    password = hash_password(request.form["password"])

    conn = sqlite3.connect("users.db")
    cur = conn.cursor()
    cur.execute("SELECT * FROM users WHERE username=? AND password=?",
                (username, password))
    user = cur.fetchone()
    conn.close()

    if user:
        return render_template("dashboard.html", username=username)
    else:
        return "Login Failed ❌"

if __name__ == "__main__":
    app.run(debug=True)