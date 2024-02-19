import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useQuery, gql } from '@apollo/client';

interface CharacterDetailProps {
  id: string;
  onClose: () => void;
}

const CHARACTER_DETAIL_QUERY = gql`
  query Character($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      origin {
        name
      }
      location {
        name
      }
      image
    }
  }
`;

const CharacterDetail: React.FC<CharacterDetailProps> = ({ id, onClose }) => {
  const { loading, error, data } = useQuery(CHARACTER_DETAIL_QUERY, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const character = data.character;

  return (
    <Modal show={true} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Character Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <img src={character.image} alt={character.name} />
          <p>Name: {character.name}</p>
          <p>Status: {character.status}</p>
          <p>Species: {character.species}</p>
          <p>Type: {character.type || 'Unknown'}</p>
          <p>Gender: {character.gender}</p>
          <p>Origin: {character.origin.name}</p>
          <p>Location: {character.location.name}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CharacterDetail;
