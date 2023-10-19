import os
import time
from django.db import connections
from django.db.utils import OperationalError
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
application = get_wsgi_application()

def check_database_connection():
    db_conn = None
    try:
        db_conn = connections['default']
        db_conn.cursor()
    except OperationalError:
        return False
    else:
        return True
    finally:
        if db_conn:
            db_conn.close()

def migrations_pending():
    output = os.popen("python manage.py showmigrations --list").read()
    return "[ ]" in output

if __name__ == "__main__":
    while True:
        if check_database_connection():
            print("Database available!")

            if migrations_pending():
                os.system("python manage.py makemigrations")
                os.system("python manage.py migrate")

            os.system("python manage.py runserver 0.0.0.0:8000")
            break
        else:
            print("Waiting for database availability...")
            time.sleep(20)
