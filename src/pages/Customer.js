import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import NotFound from '../components/NotFound';
import { baseUrl } from '../shared';

const Customer = () => {
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [customer, setCustomer] = useState();
  const [tempCustomer, setTempCustomer] = useState();
  const [changed, setChanged] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    if (!customer) return;
    if (!customer) return;
    let equal = true;
    if (customer.name !== tempCustomer.name) equal = false;

    if (customer.industry !== tempCustomer.industry) equal = false;

    if (equal) setChanged(false);
  }, []);

  useEffect(() => {
    fetch('http://localhost:8000/api/customers/' + id)
      .then((response) => {
        if (response.status === 404) {
          // navigate to 404 page
          // navigate('/404')
          // return 404 component
          setNotFound(true);
        }
        if (!response.ok) {
          throw new Error('Something went wrong, try again latter')
        }
          
        return response.json();
      })
      .then((data) => {
        setCustomer(data.customer);
        setTempCustomer(data.customer);
        setError(undefined)
      }).catch((e) => {
        setError(e.message);
      })
  }, []);

  function updateCustomer() {
    const url = baseUrl + 'api/customers/' + id;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tempCustomer),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Something went wrong");
        return response.json();
      })
      .then((data) => {
        setCustomer(data.customer);
        setChanged(false);
        setError(undefined);
      })
      .catch((e) => {
      setError(e.message) 
      })
  }

  return (
    <>
      {notFound ? <NotFound /> : null}
      {customer ? (
        <div>
          <p className="m-2 block px-2">{tempCustomer.id}</p>
          <input
            className="m-2 block px-2"
            type="text"
            value={tempCustomer.name}
            onChange={(e) => {
              setChanged(true);
              setTempCustomer({ ...tempCustomer, name: e.target.value });
            }}
          />
          <input
            className="m-2 block px-2"
            type="text"
            value={tempCustomer.industry}
            onChange={(e) => {
              setChanged(true);
              setTempCustomer({ ...tempCustomer, industry: e.target.value });
            }}
          />
          {changed ? (
            <>
              <button
                onClick={(e) => {
                  setTempCustomer({ ...customer });
                  setChanged(false);
                }}
                className="m-2"
              >
                Cancel
              </button>
              <button onClick={updateCustomer} className="m-2">
                Save
              </button>
            </>
          ) : null}
          <button
            onClick={() => {
              const url = baseUrl + 'api/customers/' + id;
              fetch(url, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error('Something went wrong');
                  }
                  navigate('/customers');
                })
                .catch((e) => {
                  setError(e.message)
                });
            }}
            className="shadow bg-red-600 hover:bg-gray-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded my-2"
          >
            Delete
          </button>
        </div>
      ) : null}
      {error ? <p>{error}</p>:null}
      <Link
        to="/customers"
        className="shadow bg-gray-600 hover:bg-gray-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
      >
        Go back
      </Link>

    </>
  );
};

export default Customer;
