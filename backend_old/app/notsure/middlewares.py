# The requests made to your ReST API are JWT-authenticated, 
# -- which means you need to make sure that every single request carries a valid json web token. 
# pyjwt will take care of the validation for us.

from functools import wraps
from flask import request, g, abort
# the 'g' flask module: global context shared across the request life cycle
from jwt import decode, exceptions
import json
# middleware is checking whether or not the request is valid, 
# if so, the middleware will extract the authenticated user details and persist them in the global context.

def login_required(f):
   @wraps(f)
   def wrap(*args, **kwargs):
       authorization = request.headers.get("authorization", None)
       if not authorization:
           return json.dumps({'error': 'no authorization token provied'}), 403, {'Content-type': 'application/json'}
      
       try:
           token = authorization.split(' ')[1]
           resp = decode(token, None, verify=False, algorithms=['HS256'])
           g.user = resp['sub']
       except exceptions.DecodeError as identifier:
           return json.dumps({'error': 'invalid authorization token'}), 403, {'Content-type': 'application/json'}
      
       return f(*args, **kwargs)
 
   return wrap