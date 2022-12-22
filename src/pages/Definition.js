import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useParams, useNavigate, Link} from 'react-router-dom'
import NotFound from '../components/NotFound';
import DefinitionSearch from '../components/DefinitionSearch';

const Definition = () => {

  const [word, setWord] = useState([]);
  let { search } = useParams();
  const navigate = useNavigate();
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + search)
      .then((response) => {
        if (response.status === 404) {
          setNotFound(true);
        }
        else if (response.status === 401) {
          navigate('/login')
        }
        if (!response.ok) {
          setError(true)

          throw new error("Something went wrong");
        }
        return response.json()
      })
      .then((data) => {
        setWord(data[0].meanings)
        // console.log(data)

      });

  }, []);

  if (notFound === true) {
    return (
      <>
        
        <NotFound />
        <Link to="/dictionary">Search Another</Link>
      </>
      
    )
  }

  if (error === true) {
    return <p>Something went wrong, try again?</p>
  }
  return (
    <>
      
      {word?
        <>
        <h2>Here is a definition for {search}: </h2>
          {word.map((meaning) => {
            return <p key={uuidv4()}>{meaning.partOfSpeech}:{meaning.definitions[0].definition}</p>
          })}
          <p>Search again:</p>
          <DefinitionSearch/>
        </> : null}
          
    </>

  )
}

export default Definition