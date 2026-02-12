import redis 

r = redis.Redis(host='localhost', port=6379, db=0)

try:
    r.ping()
    print("Connected to Redis server successfully!")
except redis.ConnectionError:
    print("Failed to connect to Redis server.")


r.set('framework', 'FastAPI')

value = r.get('framework')
print(f"The value of 'framework' in Redis is: {value.decode('utf-8')}")