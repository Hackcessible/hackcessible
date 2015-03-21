# -*- coding: utf-8 -*-
import os

from flask.ext.script import Manager

from hackcessible import create_app
from hackcessible.extensions import db
from hackcessible.user import User, UserDetail, ADMIN, ACTIVE
from hackcessible.utils import MALE


if "PORT" in os.environ:
    print "Found $PORT in env"
    port = os.environ["PORT"]
else:
    print "Did not find $PORT in env, using 5000"
    port = 5000
app = create_app()
manager = Manager(app)


@manager.command
def run():
    """Run in local machine."""

    app.run(port=port)


@manager.command
def initdb():
    """Init/reset database."""

    db.drop_all()
    db.create_all()

    admin = User(
            name=u'admin',
            email=u'admin@example.com',
            password=u'123456',
            role_code=ADMIN,
            status_code=ACTIVE,
            user_detail=UserDetail(
                sex_code=MALE,
                age=10,
                url=u'http://admin.example.com',
                deposit=100.00,
                location=u'Hangzhou',
                bio=u'admin Guy is ... hmm ... just a admin guy.'))
    db.session.add(admin)
    db.session.commit()


manager.add_option('-c', '--config',
                   dest="config",
                   required=False,
                   help="config file")

if __name__ == "__main__":
    manager.run()
