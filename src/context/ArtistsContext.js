import {createContext, useEffect, useState} from 'react';
import axios from 'axios';

const ArtistsContext = createContext();

const ArtistsProvider = ({children}) => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getArtists = async () => {
    const options = {
      method: 'GET',
      url: 'https://spotify23.p.rapidapi.com/search/',
      params: {
        q: 'Türkiyede popüler olanlar',
        type: 'artists',
        offset: '0',
        limit: '10',
        numberOfTopResults: '5',
      },
      headers: {
        'x-rapidapi-key': 'd7a41d3b70mshfd7e2063312d05fp19dc08jsnaf8e6e545dcc',
        'x-rapidapi-host': 'spotify23.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      const data = response.data.artists.items;
      setArtists(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getArtists();
  }, []);

  return (
    <ArtistsContext.Provider value={{artists, loading, error}}>
      {children}
    </ArtistsContext.Provider>
  );
};

export {ArtistsProvider, ArtistsContext};
