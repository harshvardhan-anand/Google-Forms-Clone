import pymongo
from django.utils import timezone

client = pymongo.MongoClient('mongodb://localhost:27017/')
db = client['GoogleForms']
col = db['GoogleForms']

class Form:
    def create(self):
        obj = col.insert_one({
            'created':timezone.now()
        })
        return str(obj.inserted_id)