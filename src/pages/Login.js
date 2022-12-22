import React, { useEffect, useState } from 'react';
import { baseUrl } from '../shared';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = () => {

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const location = useLocation();
  const navigate = useNavigate()

  function login(e) {
    e.preventDefault()
    const url = baseUrl + 'api/token/';
    fetch(url,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password,
      })
    }).then((response) => {
      return response.json();
    }).then((data) => {
      localStorage.setItem('access', data.access);
      localStorage.setItem('refresh', data.refresh);
      navigate(location?.state?.previousUrl? location.state.previousUrl : '/customers');
      
    })
    //   .catch((e) => {
    //   console.log(e)
    // })
  }
  return (
    <form id='customer' onSubmit={login}>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label htmlFor="username">Username</label>
        </div>
        <div className="md:w-2/3">
          <input id='username'
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label htmlFor='password'>Password</label>
        </div>
        <div className="md:w-2/3">
          <input id='password'
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
        </div>
      </div>
      <button className="shadow bg-green-600 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">Login</button>
    </form>
  )
}

export default Login