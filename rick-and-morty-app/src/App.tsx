import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';
import { CharactersQuery, CharactersQueryVariables } from './generated/graphql';
import CharacterDetail from './components/CharacterDetail'; // Import the CharacterDetail component
import 'bootstrap/dist/css/bootstrap.min.css';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache()
});

const CHARACTERS_QUERY = gql`
  query Characters($page: Int!) {
    characters(page: $page) {
      results {
        id
        name
        image
      }
    }
  }
`;

const CharacterList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null); // State to store the selected character ID

  const { loading, error, data } = useQuery<CharactersQuery, CharactersQueryVariables>(CHARACTERS_QUERY, {
    variables: { page }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Function to handle the click event on a character card
  const handleCharacterClick = (id: string) => {
    setSelectedCharacterId(id);
  };

  return (
    <div>
      <h2>Character List</h2>
      {data?.characters.results.map(character => (
        <div key={character.id} onClick={() => handleCharacterClick(character.id)} style={{ cursor: 'pointer' }}> {/* Add cursor: pointer */}
          <img src={character.image} alt={character.name} />
          <p>{character.name}</p>
        </div>
      ))}
      <button onClick={() => setPage(page + 1)}>Next Page</button>
      {selectedCharacterId && (
        <CharacterDetail // Render the CharacterDetail component conditionally
          id={selectedCharacterId}
          onClose={() => setSelectedCharacterId(null)} // Close the detail modal when onClose is triggered
        />
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <div className="app">
        <CharacterList />
      </div>
    </ApolloProvider>
  );
};

export default App;
