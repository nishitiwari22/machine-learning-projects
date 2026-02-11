from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from .models import Employee  # 👈 import from models.py

# Pydantic model
# class Employee(BaseModel):
#     id: int
#     name: str
#     department: str

# Fake DB
employees_db: List[Employee] = []

app = FastAPI()


# 1. Read all Employees
@app.get("/employees", response_model=List[Employee])
def get_employees():
    return employees_db


# 2. Read specific Employee
@app.get("/employees/{employee_id}", response_model=Employee)
def get_employee(employee_id: int):
    for employee in employees_db:
        if employee.id == employee_id:
            return employee
    raise HTTPException(status_code=404, detail="Employee not found")


# 3. Add an employee
@app.post("/employees", response_model=Employee)
def add_employee(new_employee: Employee):
    # Check duplicate ID
    for employee in employees_db:
        if employee.id == new_employee.id:
            raise HTTPException(status_code=400, detail="Employee with this ID already exists")

    employees_db.append(new_employee)
    return new_employee


# 4. Update an employee
@app.put("/employees/{employee_id}", response_model=Employee)
def update_employee(employee_id: int, updated_employee: Employee):
    for index, employee in enumerate(employees_db):
        if employee.id == employee_id:
            employees_db[index] = updated_employee
            return updated_employee
    raise HTTPException(status_code=404, detail="Employee not found")


# 5. Delete an employee
@app.delete("/employees/{employee_id}")
def delete_employee(employee_id: int):
    for index, employee in enumerate(employees_db):
        if employee.id == employee_id:
            del employees_db[index]
            return {"detail": "Employee deleted"}
    raise HTTPException(status_code=404, detail="Employee not found")
