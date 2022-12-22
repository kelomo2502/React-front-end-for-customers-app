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
    fetch(('http://localhost:8000/api/customers/' + id), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access'),
      }
    })
      .then((response) => {
        if (response.status === 404) {
          // navigate to 404 page
          // navigate('/404')
          // return 404 component
          setNotFound(true);
        } else if (response.status === 401) {
          navigate('/login');
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

  function updateCustomer(e) {
    e.preventDefault();
    const url = baseUrl + 'api/customers/' + id;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access')
      },
      body: JSON.stringify(tempCustomer),
    })
      .then((response) => {
        if (response.status === 401) {
          navigate('/login');
        }
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
        <div className='p-3'>
          <p id="name">{tempCustomer.id}</p>
          <div className="md:flex md:items-center mb-6">
            <form id='customer' onSubmit={updateCustomer}>
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label htmlFor="name">Name</label>
                </div>
                <div className="md:w-2/3">
                  <input id='name'
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    type="text"
                    value={tempCustomer.name}
                    onChange={(e) => {
                      setChanged(true);
                      setTempCustomer({ ...tempCustomer, name: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label htmlFor='industry'>Industry</label>
                </div>
                <div className="md:w-2/3">
                  <input id='industry'
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    type="text"
                    value={tempCustomer.industry}
                    onChange={(e) => {
                      setChanged(true);
                      setTempCustomer({ ...tempCustomer, industry: e.target.value });
                    }}
                  />
                </div>
              </div>
            </form>
          </div>
          {changed ? (
            <>
              <button
                onClick={(e) => {
                  setTempCustomer({ ...customer });
                  setChanged(false);
                }}
                className="shadow bg-yellow-600 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button form='customer' className="mx-2 shadow bg-green-600 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" >
                Save
              </button>
            </>
          ) : null}
          <button
            onClick={() => {
              const url = baseUrl + 'api/customers/' + id;
              fetch(url, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer ' + localStorage.getItem('access')
                },
              })
                .then((response) => {
                  if (response.status === 401) {
                    navigate('/login');
                  }
                  if (!response.ok) {
                    throw new Error('Something went wrong');
                  }
                  navigate('/customers');
                })
                .catch((e) => {
                  setError(e.message)
                });
            }}
            className="shadow bg-red-600 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
            Delete
          </button>
        </div>
      ) : null}
      {error ? <p>{error}</p> : null}
      <div className='p-3'>
        <Link className="no-underline shadow bg-gray-600 hover:bg-gray-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          to="/customers"
        >
          Back
        </Link>
      </div>

    </>
  );
};

export default Customer;
