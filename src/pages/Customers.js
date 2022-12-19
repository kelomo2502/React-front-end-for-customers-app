import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { baseUrl } from '../shared';

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    console.log("Fetching...")
    fetch(baseUrl + 'api/customers')
      .then((response) => response.json())
      .then((data) => {
        console.log(data.customers)
        setCustomers(data.customers)
      })
  }, [])
  return (
    <>

      <h1>Here are the list of our customers:</h1>
      {customers ? customers.map((customer) => {
        return (
          <article>
            <Link to={"/customers/" + customer.id}>{customer.name}</Link>
          </article>
        )

      }) : null}
    </>
  )

}

export default Customers