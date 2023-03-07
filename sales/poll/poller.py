import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()


# Import models from sales_rest, here.
# from sales_rest.models import Something
from sales_rest.models import AutomobileVO

def show_automobiles():
    response = requests.get("http://inventory-api:8000/api/automobiles/")
    content = json.loads(response.content)
    print(content)
    for automobile in content["autos"]:
        AutomobileVO.objects.update_or_create(vin=automobile["vin"],
        )


def poll():
    while True:
        print('Sales custom poller polling for data')
        try:
            show_automobiles()
            pass
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(5)


if __name__ == "__main__":
    poll()
