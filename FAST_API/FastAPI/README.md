<h2>FastAPI Learning Overview</h2>

<p>
This project is part of my learning journey in building modern, high-performance APIs using <strong>FastAPI</strong>. 
Below is a summary of the key concepts covered during the course.
</p>

<hr>

<h3>1. Introduction to APIs</h3>
<ul>
  <li><strong>What is an API?</strong><br>
    An API (Application Programming Interface) allows different software applications to communicate with each other.
  </li>

  <li><strong>Types of APIs:</strong>
    <ul>
      <li>REST APIs</li>
      <li>SOAP APIs</li>
      <li>GraphQL APIs</li>
      <li>WebSocket APIs</li>
    </ul>
  </li>

  <li><strong>API Protocols:</strong>
    <ul>
      <li>HTTP/HTTPS</li>
      <li>TCP/IP</li>
      <li>WebSockets</li>
    </ul>
  </li>

  <li><strong>Working of an API:</strong><br>
    Client sends a request → Server processes it → Server sends a response.
  </li>

  <li><strong>API Components:</strong>
    <ul>
      <li>Endpoint</li>
      <li>Request</li>
      <li>Response</li>
      <li>Headers</li>
      <li>Status Codes</li>
    </ul>
  </li>

  <li><strong>API Lifecycle:</strong>
    <ul>
      <li>Design</li>
      <li>Development</li>
      <li>Testing</li>
      <li>Deployment</li>
      <li>Monitoring</li>
      <li>Versioning</li>
    </ul>
  </li>

  <li><strong>Authentication & Authorization:</strong>
    <ul>
      <li>API Keys</li>
      <li>OAuth2</li>
      <li>JWT (JSON Web Tokens)</li>
    </ul>
  </li>
</ul>

<hr>

<h3>2. Introduction to FastAPI</h3>

<p>
<strong>FastAPI</strong> is a modern, high-performance web framework for building APIs with Python. 
It is built on top of <strong>Starlette</strong> (for web handling) and <strong>Pydantic</strong> (for data validation).
</p>

<h4>Key Features</h4>
<ul>
  <li>High performance (comparable to Node.js and Go)</li>
  <li>Automatic interactive API documentation (Swagger UI and ReDoc)</li>
  <li>Type-based data validation using Python type hints</li>
  <li>Asynchronous support using <code>async</code> and <code>await</code></li>
  <li>Easy integration with databases</li>
</ul>

<h4>FastAPI Architecture</h4>
<ul>
  <li><strong>Client:</strong> Sends HTTP request</li>
  <li><strong>FastAPI App:</strong> Handles routing and validation</li>
  <li><strong>Business Logic:</strong> Processes the request</li>
  <li><strong>Database:</strong> Stores and retrieves data</li>
  <li><strong>Response:</strong> Returned to client</li>
</ul>

<hr>

<h3>3. Building APIs using FastAPI</h3>

<ul>
  <li><strong>Creating APIs:</strong>
    <ul>
      <li>Define routes using decorators like <code>@app.get()</code>, <code>@app.post()</code></li>
      <li>Handle request parameters</li>
    </ul>
  </li>

  <li><strong>CRUD Operations:</strong>
    <ul>
      <li>Create – Add new data</li>
      <li>Read – Retrieve data</li>
      <li>Update – Modify existing data</li>
      <li>Delete – Remove data</li>
    </ul>
  </li>

  <li><strong>Validations and Error Handling:</strong>
    <ul>
      <li>Use Pydantic models for data validation</li>
      <li>Automatic error responses for invalid inputs</li>
    </ul>
  </li>

  <li><strong>Asynchronous Programming:</strong>
    <ul>
      <li>Use <code>async def</code> for non-blocking operations</li>
      <li>Improves performance for I/O-bound tasks</li>
    </ul>
  </li>
</ul>

<hr>

<h3>4. Database Integration</h3>

<ul>
  <li><strong>Database Basics:</strong>
    <ul>
      <li>Tables, rows, and columns</li>
      <li>Primary keys and relationships</li>
    </ul>
  </li>

  <li><strong>SQLAlchemy Basics:</strong>
    <ul>
      <li>ORM (Object Relational Mapping) for database operations</li>
      <li>Define database models as Python classes</li>
    </ul>
  </li>

  <li><strong>Project Structure:</strong>
    <ul>
      <li><code>database.py</code> – Database connection setup</li>
      <li><code>models.py</code> – SQLAlchemy models (tables)</li>
      <li><code>schemas.py</code> – Pydantic models (validation)</li>
      <li><code>crud.py</code> – Database operations</li>
      <li><code>main.py</code> – FastAPI application entry point</li>
    </ul>
  </li>
</ul>

<hr>

<h3>Why FastAPI is Popular</h3>
<ul>
  <li>Very fast and lightweight</li>
  <li>Automatic API documentation</li>
  <li>Built-in validation and serialization</li>
  <li>Easy to learn for Python developers</li>
  <li>Widely used in modern AI and ML backends</li>
</ul>

<hr>

<h3>Basic FastAPI Example</h3>

<pre>
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI!"}
</pre>

<p>
Run the app using:
</p>

<pre>
uvicorn main:app --reload
</pre>

<p>
Then open:
</p>

<ul>
  <li><code>http://127.0.0.1:8000/docs</code> → Swagger UI</li>
  <li><code>http://127.0.0.1:8000/redoc</code> → ReDoc documentation</li>
</ul>


<hr>

<h2>5. Machine Learning Integration</h2>

<p>
FastAPI is widely used to deploy machine learning models as APIs. 
This allows applications, web apps, or other services to send data to a model and receive predictions in real time.
</p>

<hr>

<h3>5.1 Model Serialization</h3>
<p>
Model serialization is the process of saving a trained machine learning model to a file so it can be reused later 
without retraining.
</p>

<p><strong>Why serialization is important:</strong></p>
<ul>
  <li>Avoid retraining the model every time the server starts</li>
  <li>Faster deployment</li>
  <li>Easy sharing and versioning of models</li>
</ul>

<hr>

<h3>5.2 Serialization with Pickle and Joblib</h3>

<p>
Both <strong>pickle</strong> and <strong>joblib</strong> are used to save and load Python objects, including ML models.
</p>

<h4>Example: Saving a model with Joblib</h4>

<pre>
from sklearn.linear_model import LinearRegression
import joblib

model = LinearRegression()
model.fit(X_train, y_train)

joblib.dump(model, "model.joblib")
</pre>

<h4>Loading the model</h4>

<pre>
model = joblib.load("model.joblib")
prediction = model.predict([[5]])
</pre>

<hr>

<h3>5.3 Serialization with Keras</h3>

<p>
Deep learning models built using Keras or TensorFlow are saved using specialized formats.
</p>

<h4>Example:</h4>

<pre>
model.save("model.h5")
</pre>

<h4>Loading the model:</h4>

<pre>
from tensorflow.keras.models import load_model
model = load_model("model.h5")
</pre>

<hr>

<h3>5.4 Pickle vs Joblib</h3>

<table border="1" cellpadding="6">
<tr>
<th>Feature</th>
<th>Pickle</th>
<th>Joblib</th>
</tr>
<tr>
<td>Speed</td>
<td>Slower for large arrays</td>
<td>Faster for large NumPy arrays</td>
</tr>
<tr>
<td>Best for</td>
<td>General Python objects</td>
<td>Machine learning models</td>
</tr>
<tr>
<td>Compression</td>
<td>Limited</td>
<td>Built-in compression support</td>
</tr>
</table>

<hr>

<h3>5.5 Input and Output Schemas (Theory)</h3>

<p>
Schemas define the structure of the data sent to and returned from the API.
In FastAPI, schemas are created using <strong>Pydantic models</strong>.
</p>

<p><strong>Benefits:</strong></p>
<ul>
  <li>Automatic validation</li>
  <li>Clear API documentation</li>
  <li>Type safety</li>
</ul>

<hr>

<h3>5.6 Input and Output Schemas (Example)</h3>

<pre>
from pydantic import BaseModel

class InputData(BaseModel):
    age: int
    salary: float

class PredictionOutput(BaseModel):
    prediction: float
</pre>

<hr>

<h3>5.7 Serving ML Models (Theory)</h3>

<p>
Serving a model means making it accessible through an API so users or applications can send data 
and receive predictions.
</p>

<p><strong>Basic flow:</strong></p>
<ol>
  <li>Train the model</li>
  <li>Save (serialize) the model</li>
  <li>Load the model inside FastAPI</li>
  <li>Create a prediction endpoint</li>
</ol>

<hr>

<h3>5.8 Training Script (train.py)</h3>

<pre>
from sklearn.linear_model import LinearRegression
import joblib

model = LinearRegression()
model.fit(X_train, y_train)

joblib.dump(model, "model.joblib")
</pre>

<hr>

<h3>5.9 Prediction Script (predict.py)</h3>

<pre>
import joblib

model = joblib.load("model.joblib")

def predict(data):
    return model.predict(data)
</pre>

<hr>

<h3>5.10 FastAPI Entry Point (main.py)</h3>

<pre>
from fastapi import FastAPI
from pydantic import BaseModel
import joblib

app = FastAPI()
model = joblib.load("model.joblib")

class InputData(BaseModel):
    feature: float

@app.post("/predict")
def predict(data: InputData):
    result = model.predict([[data.feature]])
    return {"prediction": result[0]}
</pre>

<hr>

<h3>5.11 Handling Batch Predictions</h3>

<p>
Batch predictions allow sending multiple inputs at once instead of one at a time.
</p>

<h4>Example:</h4>

<pre>
class BatchInput(BaseModel):
    features: list[float]

@app.post("/batch-predict")
def batch_predict(data: BatchInput):
    results = model.predict([[f] for f in data.features])
    return {"predictions": results.tolist()}
</pre>

<hr>

<h2>6. Advanced FastAPI Concepts</h2>

<hr>

<h3>6.1 Middleware</h3>

<p>
Middleware is code that runs before and after each request.
It is commonly used for:
</p>

<ul>
  <li>Logging</li>
  <li>Authentication</li>
  <li>Request timing</li>
  <li>Security checks</li>
</ul>

<hr>

<h3>6.2 Built-in Middleware</h3>

<p>
FastAPI provides built-in middleware such as:
</p>

<ul>
  <li>CORS Middleware (Cross-Origin Resource Sharing)</li>
  <li>GZip compression</li>
  <li>HTTPS redirect</li>
</ul>

<h4>Example: CORS Middleware</h4>

<pre>
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
</pre>

<hr>

<h3>6.3 Custom Middleware</h3>

<h4>Example: Request timing middleware</h4>

<pre>
import time
from fastapi import Request

@app.middleware("http")
async def add_process_time(request: Request, call_next):
    start = time.time()
    response = await call_next(request)
    duration = time.time() - start
    response.headers["X-Process-Time"] = str(duration)
    return response
</pre>

<hr>

<h3>6.4 Dependency Injection</h3>

<p>
Dependency Injection allows you to reuse common logic such as:
</p>

<ul>
  <li>Database connections</li>
  <li>Authentication</li>
  <li>Configuration</li>
</ul>

<h4>Example:</h4>

<pre>
from fastapi import Depends

def common_parameters(q: str = None):
    return q

@app.get("/items/")
def read_items(q: str = Depends(common_parameters)):
    return {"query": q}
</pre>

<hr>

<h3>6.4.1 Database Connections</h3>

<p>
A database session is injected into routes using dependencies.
</p>

<pre>
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
</pre>

<hr>

<h3>6.4.2 Configuration Management</h3>

<p>
Environment variables are used to store sensitive settings such as:
</p>

<ul>
  <li>Database URLs</li>
  <li>Secret keys</li>
  <li>API tokens</li>
</ul>

<hr>

<h3>6.4.3 User Authentication</h3>

<p>
Authentication verifies the identity of a user.
Common methods include:
</p>

<ul>
  <li>Username and password</li>
  <li>API keys</li>
  <li>JWT tokens</li>
</ul>

<hr>

<h3>6.5 JWT Authentication</h3>

<p>
JWT (JSON Web Token) is a secure way to transmit user identity between client and server.
</p>

<h4>JWT Flow:</h4>
<ol>
  <li>User logs in</li>
  <li>Server creates a token</li>
  <li>Client stores the token</li>
  <li>Client sends token with each request</li>
</ol>

<hr>

<h3>6.6 Managing API Keys</h3>

<p>
API keys are used to restrict access to certain endpoints.
</p>

<hr>

<h3>6.6.1 API Keys with Headers</h3>

<pre>
from fastapi import Header, HTTPException

API_KEY = "secret123"

def verify_key(x_api_key: str = Header(...)):
    if x_api_key != API_KEY:
        raise HTTPException(status_code=403, detail="Invalid API key")
</pre>

<hr>

<h3>6.6.2 API Keys with .env File</h3>

<p>
Store sensitive data in a <code>.env</code> file:
</p>

<pre>
API_KEY=secret123
</pre>

<hr>

<h3>6.7 Best Practices</h3>

<ul>
  <li>Use environment variables for secrets</li>
  <li>Validate all input data</li>
  <li>Use proper HTTP status codes</li>
  <li>Structure the project into modules</li>
  <li>Add logging and monitoring</li>
  <li>Use async endpoints when possible</li>
</ul>
