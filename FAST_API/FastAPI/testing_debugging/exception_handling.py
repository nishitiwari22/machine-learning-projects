from fastapi import FastAPI, requests
from fastapi.responses import JSONResponse

app = FastAPI()

@app.exception_handler(Exception)
async def generic_exception_handler(request: requests.Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"message": f"An error occurred: {str(exc)}"},
    )   


@app.get("/divide")
def handle_excpetions():
    return 1 / 0  # This will raise a ZeroDivisionError