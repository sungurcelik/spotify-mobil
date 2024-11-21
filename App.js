import React from 'react';
import Routes from './src/navigation/Routes';
import {ArtistsProvider} from './src/context/ArtistsContext';
import {AlbumsProvider} from './src/context/AlbumsContext';
import {ProfileProvider} from './src/context/ProfileContext';

const App = () => {
  return (
    <ProfileProvider>
      <ArtistsProvider>
        <AlbumsProvider>
          <Routes />
        </AlbumsProvider>
      </ArtistsProvider>
    </ProfileProvider>
  );
};

export default App;
