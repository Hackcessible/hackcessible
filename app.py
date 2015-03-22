import os

from flask import Flask, render_template, request, redirect, url_for
from flask.ext.sqlalchemy import SQLAlchemy

import requests

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


@app.route('/maptest/<location>')
def maptest(location=None):
    payload = {'key': '8e4402d8-6f8d-49fe-8e7c-d3d38098b4ef', 'lat': '47.606115', 'lon': '-122.335834', 'radius': '800'}
    if location is not None: 
        lat, lon = location.split('&')
        payload['lat'] = float(lat)
        payload['lon'] = float(lon)

    #r = requests.get("http://api.pugetsound.onebusaway.org/api/where/current-time.xml", params=payload)
    #r = requests.get("http://api.pugetsound.onebusaway.org/api/where/stops-for-location.xml", params=payload)
    r = requests.get("http://api.pugetsound.onebusaway.org/api/where/stops-for-location.json", params=payload)

    response = r.json()

    stop_list = []
    for stop in response['data']['list']:
        stop_list.append({'lat': stop['lat'],
                          'lon': stop['lon'],
                          'name': stop['name']})

    return render_template('maptest.html', responsedata=stop_list, lat=lat, lon=lon)


@app.route('/maptest-longpress/')
def maptestlong(location=None):
    payload = {'key': '8e4402d8-6f8d-49fe-8e7c-d3d38098b4ef', 'lat': '47.606115', 'lon': '-122.335834', 'radius': '800'}
    
    #r = requests.get("http://api.pugetsound.onebusaway.org/api/where/current-time.xml", params=payload)
    #r = requests.get("http://api.pugetsound.onebusaway.org/api/where/stops-for-location.xml", params=payload)
    r = requests.get("http://api.pugetsound.onebusaway.org/api/where/stops-for-location.json", params=payload)

    response = r.json()

    stop_list = []
    for stop in response['data']['list']:
        stop_list.append({'lat': stop['lat'],
                          'lon': stop['lon'],
                          'name': stop['name']})

    return render_template('maptest-longpress.html', responsedata=stop_list, lat='47.606115', lon='-122.335834')


@app.route('/curbmap')
def curbmap():
    return render_template('curbmap.html')


@app.route('/elevationmap')
def elevationmap():
    return render_template('elevationmap.html')


@app.route('/curbmap_lines')
def curbmap_lines():
    return render_template('curb_lines_stringent.html')


@app.route('/report')
def report():
    return render_template('report.html')


@app.route('/report-construction')
def construction():
    return render_template('report-construction.html')


@app.route('/report-incline')
def incline():
    return render_template('report-incline.html')


@app.route('/report-elevator')
def elevator():
    return render_template('report-elevator.html')


@app.route('/report-ramp')
def ramp():
    return render_template('report-ramp.html')


@app.route('/report-stairs')
def stairs():
    return render_template('report-stairs.html')


@app.route('/report-other')
def other():
    return render_template('report-other.html')


@app.route('/report-submitted')
def submit():
    return render_template('report-submitted.html')


if __name__ == '__main__':
    db.create_all()
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
