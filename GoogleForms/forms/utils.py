import pymongo
from django.utils import timezone

from bson import ObjectId

client = pymongo.MongoClient('mongodb://localhost:27017/')
db = client['GoogleForms']
col = db['GoogleForms']

class Form:
    def create(self):
        obj = col.insert_one({
            'created':timezone.now()
        })
        return str(obj.inserted_id)

    def find(self, pk):
        query = {
            '_id':ObjectId(pk)
        }
        obj = col.find(query).next() # cursor

        return obj

    def update(self, pk, form_data):
        query = {'_id':ObjectId(pk)}
        updated_value = {
            '$set':{
                'form_data':form_data['formData'],
                'updated': timezone.now()
            }
        }

        col.update_one(query, updated_value)
        print('form_updated')

    def findall(self):
        return col.find().sort('updated', -1)

    def update_response(self, pk, response):
        query = {'_id':ObjectId(pk)}
        updated_value = {
            '$inc':response
        }
        col.update_one(query, updated_value)