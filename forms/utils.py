# Update in MongoDb - https://docs.mongodb.com/manual/reference/operator/update/
# MongoDb's $inc gives facility of 'get_or_create and then update' the key

import pymongo
from django.utils import timezone

# This bson library comes with pymongo - DO NOT INSTALL BSON FROM PIP (official Documentation)
from bson import ObjectId  # This is required to convert "_id" from string to ObjectId for MongoDb query

client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client['GoogleFormForMe'] # Get the database
col = db['GoogleForm'] # Get the collection

class Form:
    def create(self):
        '''
        This method will create a empty form and return its ID
        '''
        obj = col.insert_one({
            'created':timezone.now(),
        }) # insert_one have method inserted_id that returns ID of the document
        return str(obj.inserted_id) # If we don't convert it to str then it will be of type ObjectId

    def find(self, pk):
        query = {'_id':ObjectId(pk)}
        obj = col.find(query).next() # returns a cursor object, thin it like zipped object in python (a pointer to a object)
                                     # https://www.geeksforgeeks.org/what-is-a-pymongo-cursor/
        return obj

    def update(self, pk, form_data):
        query = {'_id':ObjectId(pk)}
        updated_value = {
            '$set':{
                'form_data':form_data['formData'],
                'updated':timezone.now(),
            }
        }
        col.update_one(query, updated_value)
        print('Form updated')

    def delete(self, pk):
        query = {'_id':ObjectId(pk)}
        col.delete_one(query)

    def find_all(self):
        return col.find().sort('updated', -1) # Without any query will return all instances

    def update_response(self, pk, response):
        query = {'_id':ObjectId(pk)}
        updated_value = {
            '$inc':response
        }
        col.update_one(query, updated_value)

    

