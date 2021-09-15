from django import template

register = template.Library()

@register.filter
def lookup(dictionary, key):
    # print(dictionary)
    try:
        # If the argument dictionary is not a dictionary. Its possible if form_data key does not exist
        return dictionary.get(key)
    except Exception as e:
        print(e)
        return ''