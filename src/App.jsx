import { useState, useEffect } from 'react';
import axios from 'axios';

const customAxios = axios.create({
  baseUrl: 'https://rickandmortyapi.com',
});

customAxios.interceptors.request.use(
  request => {
    request.headers.Accept = 'application/json';
    console.log('request send');

    // Is obligatory return the request
    return request;
  },
  error => {
    return Promise.reject(error);
  }
);

customAxios.interceptors.response.use(
  response => {
    console.log('got the response');
    return response;
  },
  error => {
    console.log(error);

    if (error.response.status === 404) {
      console.log('NOT FOUND');
    }

    return Promise.reject(error);
  }
);

export default function App() {
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    async function fetchCharacter(charNumber) {
      const URL = `https://rickandmortyapi.com/api/character/${charNumber}`;
      try {
        const { data } = await customAxios(URL);
        setCharacter(data);
      } catch (error) {
        console.log(error.response);
      }
    }

    fetchCharacter(1);
  }, []);

  return (
    <div>
      <h1>Axios interceptor</h1>
      <div style={{ padding: '2rem', maxWidth: '800px' }}>
        {character ? (
          <h2>{`${character.name} - ${character.id}`}</h2>
        ) : (
          'Loading...'
        )}
      </div>
    </div>
  );
}
