import React, { useEffect, useState, useContext } from 'react'
import { Link, useNavigate, useLocation} from 'react-router-dom'
import AddCustomer from '../components/AddCustomer';
import { baseUrl } from '../shared';
import { LoginContext } from '../App';


const Customers = () => {
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const [customers, setCustomers] = useState([]);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  function toggleShow() {
    setShow(!show)
  }

  useEffect(() => {
    fetch((baseUrl + 'api/customers'), {
      headers: {
        'Content-Type': 'application/json',
        Authorization:'Bearer ' + localStorage.getItem('access')
      }
    })
      .then((response) => {
        if (response.status === 401) {
          setLoggedIn(false)
          navigate('/login', {
            state: {
              previousUrl : location.pathname,
            }
          })
        }
        return response.json()
      })
      .then((data) => {
        setCustomers(data.customers)
      })
  },[navigate])

  function addCustomerFn(name, industry) {
    const data = {name:name, industry:industry}
    const url = baseUrl + 'api/customers'
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access')
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Something went wrong')
      }
      return response.json();
    }).then((data) => {
      toggleShow()
      setCustomers([...customers, data.customer])
      // We will assume the add was successful
      // hide the data
      // make sure the list is updated
    })
      .catch((e) => {
    })
  }

  
  return (
    <>

      <h1>Here are the list of our customers:</h1>
      <ul>
      {customers ? customers.map((customer) => {
        return (
          <li key={customer.id}>
            <Link to={"/customers/" + customer.id}>{customer.name}</Link>
          </li>
        )

      }) : null}
        <br/>
        
      </ul>
      <AddCustomer addCustomerFn={addCustomerFn} show={show} toggleShow={toggleShow} />
    </>
  )

}

export default Customers