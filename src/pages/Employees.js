import Employee from "../components/Employee";
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AddEmployee from "../components/AddEmployee";
import EditEmployee from "../components/EditEmployee";
import Header from "../components/Header";

const showEmployee = true;

function Employees() {
  const [role, setRole] = useState('Dev');
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Gbenga Oyewunmi",
      role: "FullStack Developer",
      image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg"
    },
    {
      id: 2,
      name: "Lato Landov",
      role: "Front-End Developer",
      image: "https://images.pexels.com/photos/5611966/pexels-photo-5611966.jpeg"
    },
    {
      id: 3,
      name: "Naddy Valicic",
      role: "Backend Developer",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
    },
    {
      id: 4,
      name: "Smith Buckinberg",
      role: "Cyber Security",
      image: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg"
    },
    {
      id: 5,
      name: "Tonas Flo",
      role: "Angular/Vue",
      image: "https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg"
    },
    {
      id: 6,
      name: "Dante Lovren",
      role: "Admin Manager",
      image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
    },

  ])

  const updateEmployeeFn = (id, newName, newRole) => {
    const updatedEmployee = employees.map(employee => {
      if (employee.id === id) {
        // return new employee
        return { ...employee, name: newName, role: newRole }
      }
      // return employee
      return employee;
    });
    setEmployees(updatedEmployee)
  }

  const addEmployeeFn = (name, role, image) => {
    const newEmployee = {
      id: uuidv4(),
      name: name,
      role: role,
      image: image,
    }
    setEmployees([...employees, newEmployee])

  }


  return (
    <div className=" ">
      {
        showEmployee ?
          <>
            <div className="flex flex-wrap justify-center">
              {employees.map(employee => {
                const editEmployee = (
                  <EditEmployee
                    id={employee.id}
                    name={employee.name}
                    role={employee.role}
                    updateEmployeeFn={updateEmployeeFn}
                  />)
                return <
                  Employee
                  key={employee.id}
                  id={employee.id}
                  name={employee.name}
                  role={employee.role}
                  image={employee.image}
                  editEmployee={editEmployee}
                />
              })}
            </div>
            <div className="flex flex-wrap justify-center">
              <AddEmployee addEmployeeFn={addEmployeeFn} />
            </div>
          </>
          : "You don't have access to the list"
      }

    </div>
  );
}

export default Employees;
