import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const DefinitionSearch = () => {
  const [word, setWord] = useState('');
  const navigate = useNavigate();


  //Dependency array helps us limit what useEffect cares about
  //1.Without passing any dependency array(Page re-render every time there's a change)
  //2. With an empty array(Page only rerenders upon the completion af fetching all data )
  //3. With passing a state variable in the array(useEffect will depend on the variable passed)
  return (
    <form onSubmit={() => {
      navigate('/dictionary/' + word)
    }} className="flex space-between space-x-2 max-w-[300px]">
      <input type="text" onChange={(e) => {
        setWord(e.target.value);
      }
      }

        placeholder="Dinosaur" className='px-2 rounded py-1 shrink min-w-0' />
      <button class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-1 px-2 rounded">Search</button>

    </form>
  )
}

export default DefinitionSearch