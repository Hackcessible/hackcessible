import os

from flask import Flask, render_template, request, redirect, url_for
from flask.ext.sqlalchemy import SQLAlchemy

sqlite_file = "sqlite:////tmp/flask_app.db"
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL',
                                                       sqlite_file)
db = SQLAlchemy(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100))

    def __init__(self, name, email):
        self.name = name
        self.email = email


@app.route('/')
def index():
    return render_template('index.html', users=User.query.all())


@app.route('/user', methods=['POST'])
def user():
    if request.method == 'POST':
        u = User(request.form['name'], request.form['email'])
        db.session.add(u)
        db.session.commit()
    return redirect(url_for('index'))


@app.route('/maptest')
def maptest():
    return render_template('maptest.html')


@app.route('/curbmap')
def curbmap():
    return render_template('curbmap.html')


if __name__ == '__main__':
    db.create_all()
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
