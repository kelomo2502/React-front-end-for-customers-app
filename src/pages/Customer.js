import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import NotFound from '../components/NotFound';
import { baseUrl } from '../shared';

const Customer = () => {
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [customer, setCustomer] = useState({});

  useEffect(() => {
    console.log("UseEffect in action")
    fetch(baseUrl + 'api/customers/' + id)
      .then((response) => {
        if (response.status === 404) {
          // navigate to 404 page
          // navigate('/404')
          // return 404 component
          setNotFound(true);

        }
        return response.json()
      })
      .then((data) => {
        console.log(data.customer)
        setCustomer(data.customer)
      })
  }, [])
  // if (notFound) {
  //   return <NotFound/>
  // }
  return (
    <>
      {notFound ? <NotFound /> : null}
      {customer ? <div>
        <p>{customer.id}</p>
        <p>{customer.name}</p>
        <p>{customer.industry}</p>
        <Link to="/customers">Go back</Link>
      </div> : null}
    </>
  )
}

export default Customer